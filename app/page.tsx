import Link from "next/link";
import { QUESTIONS } from "@/lib/questions";

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5">
      <section className="pt-20 pb-16 fade-up">
        <div className="h-[3px] w-24 bg-acid-500 mb-6" aria-hidden />
        <p className="text-sm uppercase tracking-[0.18em] text-ash-500 mb-6">
          A twelve-question check
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.15] tracking-tight text-bone max-w-2xl">
          You know roughly what you share. Most people are off by a category or
          two.
        </h1>
        <p className="mt-6 text-lg text-ash-200 max-w-xl leading-relaxed">
          Answer {QUESTIONS.length} questions about how you actually use your
          phone, your accounts and your email address. You get an estimate of
          how much of you is readable from the outside, broken down by where the
          trail is thickest.
        </p>
        <p className="mt-4 text-ash-400 max-w-xl">
          No lookups, no scans, no accounts. The questions and the arithmetic
          both run in your browser, which is the only honest way to build a tool
          like this.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/check"
            className="inline-flex items-center rounded-md bg-acid-500 px-6 py-3 font-medium text-ink-950 hover:bg-acid-400 transition-colors"
          >
            Check your digital footprint
          </Link>
          <span className="text-sm text-ash-500">
            Takes about three minutes.
          </span>
        </div>
      </section>

      <section className="py-14 border-t border-ink-700">
        <h2 className="font-display text-2xl text-bone">What it looks at</h2>
        <dl className="mt-8 grid gap-px sm:grid-cols-2 bg-ink-700 rounded-lg overflow-hidden">
          {[
            {
              t: "Social presence",
              d: "How much of your week is published under your own name, and who can read it.",
            },
            {
              t: "Location trail",
              d: "How many apps hold a record of where you have been, and for how long.",
            },
            {
              t: "Identifiers & tracking",
              d: "How easily one email address and one phone number join your accounts together.",
            },
            {
              t: "Accounts & spending",
              d: "How far a single old leak could travel through the logins you reuse.",
            },
          ].map((item) => (
            <div key={item.t} className="bg-ink-900 p-6">
              <dt className="text-bone font-medium">{item.t}</dt>
              <dd className="mt-2 text-sm text-ash-400 leading-relaxed">
                {item.d}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-14 border-t border-ink-700">
        <h2 className="font-display text-2xl text-bone">
          Why the questions are worded plainly
        </h2>
        <div className="mt-5 space-y-4 text-ash-200 max-w-prose leading-relaxed">
          <p>
            Most privacy tools are built to startle you, then sell you
            something. This one is built to be accurate. Several questions have
            an honest answer of <em>I have never looked</em>, and that answer is
            scored like any other, because not knowing is the ordinary
            condition, not a failing.
          </p>
          <p>
            The result is an estimate, not a measurement. It reflects what you
            told it. What it is good at is showing you which of the four
            categories is doing the most work — and that is usually not the one
            people guess.
          </p>
        </div>
        <Link
          href="/check"
          className="mt-8 inline-flex items-center text-acid-400 hover:text-acid-500 transition-colors"
        >
          Start the check →
        </Link>
      </section>
    </div>
  );
}
