"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmailGate } from "@/components/EmailGate";
import { ScoreGauge } from "@/components/ScoreGauge";
import { ShareBlock } from "@/components/ShareBlock";
import { BANDS, isComplete, scoreAnswers, type Result } from "@/lib/scoring";
import { SITE } from "@/lib/site";
import { clearAnswers, loadAnswers } from "@/lib/storage";

/** Remembers that the gate is behind us, so a reload does not ask twice. */
const GATE_KEY = "dfc:gate";

export default function ResultsPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");
  const [gateCleared, setGateCleared] = useState(false);

  useEffect(() => {
    const answers = loadAnswers();
    if (!answers || !isComplete(answers)) {
      setState("empty");
      return;
    }
    try {
      setGateCleared(sessionStorage.getItem(GATE_KEY) === "1");
    } catch {
      // Blocked storage: the gate simply shows once per view.
    }
    setResult(scoreAnswers(answers));
    setState("ready");
  }, []);

  function clearGate() {
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      // Nothing to remember; the state below still advances.
    }
    setGateCleared(true);
  }

  if (state === "loading") {
    return <div className="mx-auto max-w-2xl px-5 py-24" aria-hidden />;
  }

  if (state === "empty" || !result) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-24">
        <h1 className="font-display text-2xl text-bone">
          There is nothing to show yet
        </h1>
        <p className="mt-3 text-ash-400">
          Answers live in this browser tab only, so a fresh tab starts empty.
        </p>
        <Link
          href="/check"
          className="mt-8 inline-flex items-center rounded-md bg-ember-500 px-5 py-3 font-medium text-ink-950 hover:bg-ember-400 transition-colors"
        >
          Take the check
        </Link>
      </div>
    );
  }

  if (SITE.emailCaptureEnabled && !gateCleared) {
    return <EmailGate score={result.score} onDone={clearGate} />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <section className="fade-up">
        <p className="text-sm uppercase tracking-[0.18em] text-ash-500 text-center">
          Your estimate
        </p>
        <div className="mt-8">
          <ScoreGauge
            score={result.score}
            band={result.band}
            label={BANDS[result.band].label}
          />
        </div>

        <h1 className="mt-8 font-display text-3xl text-bone text-center">
          {result.headline}
        </h1>
        <p className="mt-4 text-ash-200 leading-relaxed max-w-prose mx-auto text-center">
          {result.summary}
        </p>
      </section>

      <section className="mt-16 space-y-4">
        <h2 className="font-display text-xl text-bone">
          Where the trail is thickest
        </h2>

        {[...result.categories]
          .sort((a, b) => b.score - a.score)
          .map((c) => (
            <article
              key={c.id}
              className="rounded-lg border border-ink-700 bg-ink-900 p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-bone font-medium">{c.label}</h3>
                <span className="text-sm text-ash-500 whitespace-nowrap">
                  {BANDS[c.band].label} · {c.score}
                </span>
              </div>

              <div className="mt-3 h-1 w-full rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-1 rounded-full bg-ash-600"
                  style={{ width: `${c.score}%` }}
                />
              </div>

              <p className="mt-4 text-sm text-ash-400">{c.blurb}</p>
              <p className="mt-3 text-ash-200 leading-relaxed">{c.reading}</p>

              <div className="mt-5 border-t border-ink-700 pt-4">
                <p className="text-xs uppercase tracking-[0.14em] text-ash-500">
                  One first step
                </p>
                <p className="mt-2 text-bone leading-relaxed">{c.firstStep}</p>
              </div>
            </article>
          ))}
      </section>

      <section className="mt-16 border-t border-ink-700 pt-10">
        <h2 className="font-display text-xl text-bone">
          What this number is, and is not
        </h2>
        <div className="mt-4 space-y-4 text-ash-400 leading-relaxed max-w-prose">
          <p>
            It is an estimate built from twelve answers, weighted across four
            categories. It cannot see your accounts and it has not looked
            anything up. Two people with the same score can have very different
            situations.
          </p>
          <p>
            What it does reliably is rank your own four categories against each
            other. The top one is where a small change buys you the most.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-lg border border-ink-700 bg-ink-850 p-7">
        <h2 className="font-display text-xl text-bone">
          The part the score cannot show you
        </h2>
        <p className="mt-4 text-ash-200 leading-relaxed">
          A score tells you how much is being collected. It does not tell you
          why the collecting is designed the way it is, or which of your habits
          the design is counting on. That is the subject of{" "}
          <em>Starve The Machine</em>: how the everyday defaults got set, what
          they are worth to the companies that set them, and how to withdraw
          from them without withdrawing from ordinary life.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Link
            href="/about-the-book"
            className="inline-flex items-center rounded-md bg-ember-500 px-5 py-3 font-medium text-ink-950 hover:bg-ember-400 transition-colors"
          >
            About the book
          </Link>
          <button
            type="button"
            onClick={() => {
              clearAnswers();
              try {
                sessionStorage.removeItem(GATE_KEY);
              } catch {
                // Nothing to clear.
              }
              window.location.href = "/check";
            }}
            className="text-sm text-ash-400 hover:text-bone transition-colors"
          >
            Start the check again
          </button>
        </div>
      </section>

      <ShareBlock score={result.score} band={BANDS[result.band].label} />
    </div>
  );
}
