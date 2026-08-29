"use client";

import { useEffect, useState } from "react";

/**
 * A quiet arc. It counts up over roughly a second and then stops moving.
 * No pulsing, no red, and deliberately the same colour at every band: green is
 * the book's accent, not a verdict. How exposed you are is said in words.
 */
const STROKE = "#9bbc2d";
const TRACK = "#262922";

const RADIUS = 84;
const CIRCUMFERENCE = Math.PI * RADIUS; // half circle

export function ScoreGauge({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(score);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease out: fast at first, settling slowly.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(score * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const offset = CIRCUMFERENCE * (1 - shown / 100);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 112"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`Exposure score ${score} out of 100: ${label}`}
      >
        <path
          d={`M 16 100 A ${RADIUS} ${RADIUS} 0 0 1 184 100`}
          fill="none"
          stroke={TRACK}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d={`M 16 100 A ${RADIUS} ${RADIUS} 0 0 1 184 100`}
          fill="none"
          stroke={STROKE}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
        <text
          x="100"
          y="88"
          textAnchor="middle"
          className="font-display"
          fill="#eceeec"
          fontSize="46"
        >
          {shown}
        </text>
      </svg>

      <p className="mt-1 text-sm text-ash-500">
        {label} exposure · {score} out of 100
      </p>
    </div>
  );
}
