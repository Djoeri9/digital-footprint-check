"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

type Props = {
  score: number;
  /** Which category came out heaviest, so the report email can be specific. */
  topCategory: string;
  topBand: string;
  onDone: () => void;
};

export function EmailGate({ score, topCategory, topBand, onDone }: Props) {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          score,
          newsletter,
          topCategory,
          topBand,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      onDone();
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the mailing service. Your results are ready either way."
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl px-5 py-16 fade-up">
      <p className="text-sm uppercase tracking-[0.18em] text-ash-500">
        Your results are ready
      </p>
      <h1 className="mt-5 font-display text-3xl text-bone">
        Where should we send your report?
      </h1>

      <p className="mt-5 text-ash-200 leading-relaxed">
        We email you your score, the category it came out heaviest in, and the
        one change that buys you the most, so you have it after this tab
        closes. To do that we store three things: this address, the number, and
        which category came top. Not your individual answers.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-ash-400 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-bone placeholder:text-ash-600 focus:border-ember-500 focus:outline-none"
          />
        </div>

        <label className="flex gap-3 items-start cursor-pointer rounded-lg border border-ink-700 bg-ink-900 p-4">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-ember-500"
          />
          <span className="text-sm text-ash-200 leading-relaxed">
            Also send me occasional letters about {SITE.bookTitle}: what the
            data industry is doing, and what to do about it. Roughly monthly.
            Unsubscribe in one click, any time.
            <span className="block mt-1 text-ash-500">
              Optional. Leaving this unticked still gets you your report.
            </span>
          </span>
        </label>

        {message && (
          <p className="text-sm text-ember-400" role="status">
            {message}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-md bg-ember-500 px-6 py-3 font-medium text-ink-950 hover:bg-ember-400 disabled:opacity-60 transition-colors"
          >
            {status === "sending" ? "Sending…" : "Send my report"}
          </button>

          {status === "error" && (
            <button
              type="button"
              onClick={onDone}
              className="text-sm text-ash-400 hover:text-bone transition-colors"
            >
              Show my results anyway →
            </button>
          )}
        </div>
      </form>

      <p className="mt-8 text-sm text-ash-500 leading-relaxed">
        No tracking pixels, no third parties, no reselling. You can ask us to
        delete your address at any point and we will.{" "}
        <Link
          href="/privacy"
          className="text-ash-200 underline underline-offset-4 hover:text-bone"
        >
          How this tool handles your data
        </Link>
        .
      </p>
    </div>
  );
}
