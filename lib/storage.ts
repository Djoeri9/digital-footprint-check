import type { Answers } from "./scoring";

/**
 * Answers never leave the browser. sessionStorage keeps them for the length of
 * the tab and nothing more: no cookie, no server round-trip, no persistence
 * after the tab closes. This is deliberate. The tool should be able to describe
 * its own data handling in one sentence.
 */
const KEY = "dfc:answers";

export function saveAnswers(answers: Answers): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // Private mode or blocked storage: the quiz still works in memory.
  }
}

export function loadAnswers(): Answers | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Answers) : null;
  } catch {
    return null;
  }
}

export function clearAnswers(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
