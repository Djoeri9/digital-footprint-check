"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Sharing without third parties. These are plain links to each platform's
 * compose screen, so no share widget, no SDK and no button that reports back
 * who saw it. A share widget on this particular site would be a bad joke.
 */
export function ShareBlock({ score, band }: { score: number; band: string }) {
  const [copied, setCopied] = useState(false);

  const url = SITE.url;
  const text = `I scored ${score} out of 100 on this digital footprint check — ${band.toLowerCase()} exposure. Twelve questions, runs entirely in your browser.`;

  const targets = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodeURIComponent(
        "Digital Footprint Check"
      )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-14 border-t border-ink-700 pt-10">
      <h2 className="font-display text-xl text-bone">
        Worth handing to someone else
      </h2>
      <p className="mt-3 text-ash-400 leading-relaxed max-w-prose">
        Most people guess their own category wrong, and they find that more
        interesting than being warned. Your score is in the message; nothing is
        added to the link.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-ink-700 bg-ink-900 px-4 py-2 text-sm text-ash-200 hover:border-ash-600 hover:text-bone transition-colors"
        >
          {copied ? "Copied" : "Copy link"}
        </button>

        {targets.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-ink-700 bg-ink-900 px-4 py-2 text-sm text-ash-200 hover:border-ash-600 hover:text-bone transition-colors"
          >
            {t.name}
          </a>
        ))}
      </div>
    </section>
  );
}
