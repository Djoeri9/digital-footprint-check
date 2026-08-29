import {
  CATEGORIES,
  CategoryId,
  MAX_POINTS_PER_QUESTION,
  QUESTIONS,
} from "./questions";

export type Answers = Record<string, string>;

export type BandId = "light" | "moderate" | "substantial" | "wide";

export type CategoryResult = {
  id: CategoryId;
  label: string;
  blurb: string;
  score: number; // 0-100
  band: BandId;
  reading: string;
  firstStep: string;
};

export type Result = {
  score: number; // 0-100
  band: BandId;
  headline: string;
  summary: string;
  categories: CategoryResult[];
  answeredAt: string;
};

/** Category weights in the overall score. They sum to 1. */
const CATEGORY_WEIGHTS: Record<CategoryId, number> = {
  social: 0.25,
  location: 0.25,
  communication: 0.3,
  financial: 0.2,
};

export const BANDS: Record<BandId, { label: string; range: string }> = {
  light: { label: "Light", range: "0-24" },
  moderate: { label: "Moderate", range: "25-49" },
  substantial: { label: "Substantial", range: "50-74" },
  wide: { label: "Wide", range: "75-100" },
};

export function bandFor(score: number): BandId {
  if (score < 25) return "light";
  if (score < 50) return "moderate";
  if (score < 75) return "substantial";
  return "wide";
}

const OVERALL_COPY: Record<BandId, { headline: string; summary: string }> = {
  light: {
    headline: "A light footprint",
    summary:
      "You already leave less behind than most people do. The habits that got you here are the ones worth keeping deliberate, because footprints tend to grow quietly, one convenient sign-up at a time.",
  },
  moderate: {
    headline: "A moderate footprint",
    summary:
      "Nothing here is unusual. You have made the ordinary trade-offs most people make, and a few of them are doing more work than you would expect. The sections below show where the trail is thickest.",
  },
  substantial: {
    headline: "A substantial footprint",
    summary:
      "Most of this is the result of convenience rather than carelessness: defaults you accepted once and never revisited. That is also what makes it straightforward to reduce. The same few habits account for most of the trail.",
  },
  wide: {
    headline: "A wide footprint",
    summary:
      "You are visible across most of the categories we look at. That is a common place to land, and it is not a verdict on your judgement. It is what happens when every service is designed to ask for one more identifier. A handful of changes move this number further than you would think.",
  },
};

const CATEGORY_COPY: Record<
  CategoryId,
  { reading: Record<BandId, string>; firstStep: Record<BandId, string> }
> = {
  social: {
    reading: {
      light:
        "Very little of your daily life is published under your own name. Whatever you do post is reaching a small, known audience.",
      moderate:
        "A recognisable version of you exists in public, but it is partial. Someone reading it would learn your interests before they learned your routine.",
      substantial:
        "Your name, face and rough weekly pattern are readable by people you have never met. Individually these posts say little. Together they sketch a fairly complete picture.",
      wide: "A stranger could reconstruct your circle, your habits and your calendar from public posts alone. Not because any one post reveals much, but because there are many of them.",
    },
    firstStep: {
      light:
        "Next time a new app asks to import your contacts, decline. That single permission is how most social graphs get rebuilt elsewhere.",
      moderate:
        "Pick your most-used platform and re-read its audience setting for old posts. Most offer a one-click way to limit everything published before today.",
      substantial:
        "Set the account you post to most to followers-only for a month. You will notice quickly whether the public reach was ever doing anything for you.",
      wide: "Start with location tags. Turning them off going forward costs you nothing and removes the single most useful signal in a public timeline.",
    },
  },
  location: {
    reading: {
      light:
        "Your movements are not being logged continuously. Where you go stays largely between you and the road.",
      moderate:
        "A few apps hold a partial map of your week. It is usually enough to show where you live and where you work.",
      substantial:
        "Several apps are recording your movements in the background. Location history is unusually revealing: it identifies a person faster than a name does.",
      wide: "Your movements are being recorded by more services than you could list from memory. A week of that data typically shows your home, your work, your gym and who you visit.",
    },
    firstStep: {
      light:
        "Keep an eye on new installs. Location access is most often granted in the first thirty seconds of using an app.",
      moderate:
        "Open your phone location settings and switch anything set to Always down to While using. Almost nothing breaks.",
      substantial:
        "Go through the location permission list once, top to bottom. Most people find three or four apps that have no business knowing.",
      wide: "Turn off location history in your maps app first, then work down the permission list. That one setting usually holds the longest record.",
    },
  },
  communication: {
    reading: {
      light:
        "Your identifiers are compartmentalised. That makes it hard for two companies to work out that their records describe the same person.",
      moderate:
        "One address or number links several accounts. It is the join key that data brokers rely on to merge separate profiles into one.",
      substantial:
        "A single email address and phone number tie most of your accounts together, and you are accepting most tracking by default. Those profiles get merged more often than they get built.",
      wide: "Your email address, your phone number and your browsing are all pointing at the same person. Very little cross-referencing is required to assemble one profile from them.",
    },
    firstStep: {
      light:
        "Nothing urgent here. If you ever add an alias, add it for shopping. That is where addresses get resold most.",
      moderate:
        "Create one alias for shops and newsletters and use it for the next thing you sign up for. You do not have to migrate anything old.",
      substantial:
        "Reject non-essential cookies for one week and notice how little changes. It is the cheapest habit on this list.",
      wide: "Leave the phone number field blank on the next form that does not legally need it. Most forms accept it, and the ones that do not are telling you something.",
    },
  },
  financial: {
    reading: {
      light:
        "Your logins are separate and your purchases are not feeding a single profile. A breach at one company stays at that company.",
      moderate:
        "Some password overlap or a couple of loyalty schemes mean a few of your accounts move together. One leak can reach further than the site it came from.",
      substantial:
        "Reused credentials and linked rewards accounts mean a leak at one retailer has reach into accounts that have nothing to do with it.",
      wide: "One password pattern connects most of your accounts, and your purchase history is consolidated under a small number of programmes. This is the category where a single old breach does the most travelling.",
    },
    firstStep: {
      light:
        "Nothing to do. If you add accounts, keep them in the manager you are already using.",
      moderate:
        "Change the password on your email account first. It is the one that can reset all the others.",
      substantial:
        "Install a password manager and let it generate exactly one new password, for your email. Do the rest whenever you happen to log in.",
      wide: "Start with the email account, then your bank. Those two carry the recovery path for nearly everything else you own.",
    },
  },
};

/**
 * Looks up the copy for one category and band. The API route uses this rather
 * than trusting text posted from the browser: the client says which category
 * came out heaviest, the server decides what that means.
 */
export function categoryDetail(
  id: CategoryId,
  band: BandId
): { label: string; reading: string; firstStep: string } | null {
  if (!(id in CATEGORY_COPY) || !(band in BANDS)) return null;
  return {
    label: CATEGORIES[id].label,
    reading: CATEGORY_COPY[id].reading[band],
    firstStep: CATEGORY_COPY[id].firstStep[band],
  };
}

export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => Boolean(answers[q.id]));
}

export function scoreAnswers(answers: Answers): Result {
  const categories = (Object.keys(CATEGORIES) as CategoryId[]).map((id) => {
    const questions = QUESTIONS.filter((q) => q.category === id);

    let earned = 0;
    let possible = 0;

    for (const q of questions) {
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      possible += q.weight * MAX_POINTS_PER_QUESTION;
      if (chosen) earned += q.weight * chosen.points;
    }

    const score = possible === 0 ? 0 : Math.round((earned / possible) * 100);
    const band = bandFor(score);

    return {
      id,
      label: CATEGORIES[id].label,
      blurb: CATEGORIES[id].blurb,
      score,
      band,
      reading: CATEGORY_COPY[id].reading[band],
      firstStep: CATEGORY_COPY[id].firstStep[band],
    } satisfies CategoryResult;
  });

  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.score * CATEGORY_WEIGHTS[c.id], 0)
  );
  const band = bandFor(overall);

  return {
    score: overall,
    band,
    headline: OVERALL_COPY[band].headline,
    summary: OVERALL_COPY[band].summary,
    categories,
    answeredAt: new Date().toISOString(),
  };
}
