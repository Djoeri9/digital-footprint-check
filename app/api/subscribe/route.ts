import { NextResponse } from "next/server";
import { subscribe } from "@/lib/kit";
import { bandFor, categoryDetail, type BandId } from "@/lib/scoring";
import type { CategoryId } from "@/lib/questions";

export const runtime = "nodejs";

/**
 * A small in-memory limiter. It resets on redeploy and is per-instance, which
 * is fine here: it exists to stop a bored visitor hammering the form, not to
 * survive a determined attacker.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// Deliberately loose: rejecting unusual but valid addresses is worse than
// letting Kit reject a bad one.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const { email, score, newsletter, topCategory, topBand } = (body ?? {}) as {
    email?: unknown;
    score?: unknown;
    newsletter?: unknown;
    topCategory?: unknown;
    topBand?: unknown;
  };

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { error: "That does not look like an email address." },
      { status: 400 }
    );
  }

  if (typeof score !== "number" || score < 0 || score > 100) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  // The browser names the heaviest category; the copy that goes with it comes
  // from our own tables, never from the request body.
  const detail =
    typeof topCategory === "string" && typeof topBand === "string"
      ? categoryDetail(topCategory as CategoryId, topBand as BandId)
      : null;

  if (!detail) {
    return NextResponse.json(
      { error: "Invalid category." },
      { status: 400 }
    );
  }

  const result = await subscribe({
    email: email.trim().toLowerCase(),
    score: Math.round(score),
    band: bandFor(score),
    newsletter: newsletter === true,
    topCategory: detail.label,
    topReading: detail.reading,
    topStep: detail.firstStep,
  });

  if (!result.ok) {
    // The visitor never sees the upstream detail; it stays in the server log.
    console.error("[subscribe]", result.reason, result.detail);
    return NextResponse.json(
      {
        error:
          "We could not reach the mailing service just now. Your results are below either way.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, subscribed: result.subscribed });
}
