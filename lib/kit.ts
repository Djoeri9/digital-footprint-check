/**
 * Kit (ConvertKit) V4. Server-side only: the API key must never reach the
 * browser. V4 authenticates with a header, unlike V3's query string.
 */
const BASE = "https://api.kit.com/v4";

export type KitResult =
  | { ok: true; subscribed: boolean }
  | { ok: false; reason: "config" | "upstream"; detail: string };

function headers() {
  return {
    "X-Kit-Api-Key": process.env.KIT_API_KEY ?? "",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function tagSubscriber(tagId: string, email: string) {
  const res = await fetch(`${BASE}/tags/${tagId}/subscribers`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email_address: email }),
  });
  if (!res.ok) {
    throw new Error(`tag ${tagId}: HTTP ${res.status} ${await res.text()}`);
  }
}

/**
 * Creates or updates the subscriber, records the score, and applies tags.
 *
 * `footprint-tool` marks where the address came from and triggers the report.
 * `newsletter-opt-in` is applied only when the visitor ticked the box, and is
 * the only tag any marketing sequence should ever target. Keeping those two
 * separate is what makes the consent claim on the privacy page true.
 */
export async function subscribe(opts: {
  email: string;
  score: number;
  band: string;
  newsletter: boolean;
}): Promise<KitResult> {
  const apiKey = process.env.KIT_API_KEY;
  const toolTag = process.env.KIT_TAG_ID;
  const newsletterTag = process.env.KIT_NEWSLETTER_TAG_ID;

  if (!apiKey || !toolTag || !newsletterTag) {
    return {
      ok: false,
      reason: "config",
      detail: "KIT_API_KEY, KIT_TAG_ID or KIT_NEWSLETTER_TAG_ID is missing",
    };
  }

  try {
    // Upserts by email address; an existing subscriber is updated, not duplicated.
    const res = await fetch(`${BASE}/subscribers`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        email_address: opts.email,
        fields: {
          footprint_score: String(opts.score),
          footprint_band: opts.band,
        },
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        reason: "upstream",
        detail: `subscribers: HTTP ${res.status} ${await res.text()}`,
      };
    }

    await tagSubscriber(toolTag, opts.email);
    if (opts.newsletter) await tagSubscriber(newsletterTag, opts.email);

    return { ok: true, subscribed: opts.newsletter };
  } catch (error) {
    return {
      ok: false,
      reason: "upstream",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}
