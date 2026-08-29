"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, QUESTIONS } from "@/lib/questions";
import type { Answers } from "@/lib/scoring";
import { loadAnswers, saveAnswers } from "@/lib/storage";

export default function CheckPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [restored, setRestored] = useState(false);

  // Restore an in-progress run if the tab was reloaded.
  useEffect(() => {
    const saved = loadAnswers();
    if (saved) {
      setAnswers(saved);
      const firstUnanswered = QUESTIONS.findIndex((q) => !saved[q.id]);
      setIndex(firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered);
    }
    setRestored(true);
  }, []);

  const question = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const progress = ((index + (answers[question.id] ? 1 : 0)) /
    QUESTIONS.length) *
    100;

  function choose(optionId: string) {
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    saveAnswers(next);

    // A short beat so the selection is visible before the screen changes.
    window.setTimeout(() => {
      if (isLast) {
        router.push("/results");
      } else {
        setIndex((i) => i + 1);
      }
    }, 180);
  }

  if (!restored) {
    return <div className="mx-auto max-w-2xl px-5 py-24" aria-hidden />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-16">
      <div className="flex items-center justify-between text-sm text-ash-500">
        <span>
          {index + 1} of {QUESTIONS.length}
        </span>
        <span className="text-ash-600">
          {CATEGORIES[question.category].label}
        </span>
      </div>

      <div
        className="mt-3 h-px w-full bg-ink-700"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress through the check"
      >
        <div
          className="h-px bg-acid-500 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={question.id} className="mt-12 fade-up">
        <h1 className="font-display text-2xl sm:text-3xl leading-snug text-bone">
          {question.text}
        </h1>
        {question.help && (
          <p className="mt-3 text-ash-400 leading-relaxed">{question.help}</p>
        )}

        <div className="mt-8 space-y-3">
          {question.options.map((option) => {
            const selected = answers[question.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                aria-pressed={selected}
                className={[
                  "w-full text-left rounded-lg border px-5 py-4 transition-colors",
                  selected
                    ? "border-acid-500 bg-ink-800 text-bone"
                    : "border-ink-700 bg-ink-900 text-ash-200 hover:border-ash-600 hover:text-bone",
                ].join(" ")}
              >
                <span className="block">{option.label}</span>
                {option.note && (
                  <span className="mt-1 block text-sm text-ash-500">
                    {option.note}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between text-sm">
        {index > 0 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => i - 1)}
            className="text-ash-400 hover:text-bone transition-colors"
          >
            ← Back
          </button>
        ) : (
          <Link
            href="/"
            className="text-ash-400 hover:text-bone transition-colors"
          >
            ← Leave the check
          </Link>
        )}

        {answers[question.id] && !isLast && (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="text-ash-400 hover:text-bone transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
