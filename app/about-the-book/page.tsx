import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.bookTitle,
  description: `${SITE.bookTitle} by ${SITE.author}: a calm account of how everyday data collection works and how to take part in less of it.`,
};

export default function BookPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-16">
      <div className="h-[3px] w-24 bg-acid-500 mb-6" aria-hidden />
      <p className="text-sm uppercase tracking-[0.18em] text-ash-500">
        The book behind this tool
      </p>
      <h1 className="mt-5 font-display text-5xl uppercase text-bone">
        Starve <span className="text-acid-500">The Machine</span>
      </h1>
      <p className="mt-3 text-ash-400">{SITE.author}</p>

      {/* The cover does more selling than three paragraphs can. */}
      <div className="mt-10 sm:float-right sm:ml-8 sm:mb-6 max-w-[240px]">
        <Image
          src="/starve-the-machine-cover.jpg"
          alt={`Cover of ${SITE.bookTitle} by ${SITE.author}`}
          width={800}
          height={1280}
          priority
          className="w-full h-auto rounded-sm border border-ink-700"
        />
      </div>

      <div className="mt-10 space-y-5 text-ash-200 leading-relaxed">
        <p>
          Most writing about privacy asks you to be frightened, then hands you a
          list of software to install. This book does something quieter. It
          explains what the collecting is actually for, who pays for it, and why
          the defaults on your phone are set the way they are.
        </p>
        <p>
          The premise is in the title. The systems that profile you run on a
          supply of small, freely given inputs: an address on a form, a
          permission granted in a hurry, a banner accepted to make it go away.
          Reduce the supply and the profile degrades. Not dramatically, not all
          at once, but steadily, and without asking you to leave modern life.
        </p>
        <p>
          It is a book for people who have read enough alarming headlines and
          would now like an accurate explanation, followed by changes small
          enough that they hold.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a
          href={SITE.amazonUrl}
          className="inline-flex items-center rounded-md bg-acid-500 px-6 py-3 font-medium text-ink-950 hover:bg-acid-400 transition-colors"
        >
          Read it on Amazon
        </a>
        <Link
          href="/check"
          className="text-sm text-ash-400 hover:text-bone transition-colors"
        >
          Or take the footprint check first →
        </Link>
      </div>

      <section className="mt-16 border-t border-ink-700 pt-10">
        <h2 className="font-display text-xl text-bone">
          Why the tool works the way it does
        </h2>
        <p className="mt-4 text-ash-400 leading-relaxed">
          The check runs entirely in your browser, sets no cookies and carries
          no third-party trackers. That is not a technical flourish. A tool that
          explains surveillance while quietly performing some would not be worth
          reading, and neither would the book behind it.{" "}
          <Link
            href="/privacy"
            className="text-ash-200 underline underline-offset-4 hover:text-bone"
          >
            The details are here
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
