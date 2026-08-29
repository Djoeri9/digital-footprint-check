export type CategoryId = "social" | "location" | "communication" | "financial";

export type Option = {
  /** Stable id, stored in the answer map. */
  id: string;
  label: string;
  /** Raw points this option contributes to its question's category. */
  points: number;
  /** Optional one-line clarification shown under the option. */
  note?: string;
};

export type Question = {
  id: string;
  category: CategoryId;
  /** Relative weight of this question inside its category. */
  weight: number;
  text: string;
  /** Short, neutral framing. Never alarming. */
  help?: string;
  options: Option[];
};

export const CATEGORIES: Record<
  CategoryId,
  { label: string; blurb: string }
> = {
  social: {
    label: "Social presence",
    blurb:
      "How much of your everyday life is published under your own name, and who can read it.",
  },
  location: {
    label: "Location trail",
    blurb:
      "How often your devices and apps record where you are, and how long that record lasts.",
  },
  communication: {
    label: "Identifiers & tracking",
    blurb:
      "How easily your email address, phone number and browsing can be tied back to one person: you.",
  },
  financial: {
    label: "Accounts & spending",
    blurb:
      "How much of what you buy — and how you log in — is linked to a single, reusable profile.",
  },
};

/**
 * Points are always 0..3 within a question; the category score normalises them,
 * so adding or removing a question does not skew the scale.
 */
export const QUESTIONS: Question[] = [
  // ---------------------------------------------------------------- social
  {
    id: "social-platforms",
    category: "social",
    weight: 1,
    text: "How many social platforms do you use at least once a week?",
    help: "Counting anything you post on, comment on, or scroll while logged in.",
    options: [
      { id: "none", label: "None", points: 0 },
      { id: "one-two", label: "One or two", points: 1 },
      { id: "three-four", label: "Three or four", points: 2 },
      { id: "five-plus", label: "Five or more", points: 3 },
    ],
  },
  {
    id: "social-visibility",
    category: "social",
    weight: 1.2,
    text: "Who can see your main profiles?",
    options: [
      { id: "no-profiles", label: "I don't keep public profiles", points: 0 },
      { id: "private", label: "Only people I've approved", points: 1 },
      { id: "mixed", label: "Some private, some public", points: 2 },
      { id: "public", label: "Mostly public — anyone can read them", points: 3 },
    ],
  },
  {
    id: "social-identity",
    category: "social",
    weight: 1,
    text: "Do those profiles carry your real name and face?",
    options: [
      { id: "neither", label: "Neither — handles only", points: 0 },
      { id: "one", label: "One of the two", points: 1 },
      { id: "both", label: "Both, on my main account", points: 2 },
      { id: "everywhere", label: "Both, on nearly every account", points: 3 },
    ],
  },
  {
    id: "social-context",
    category: "social",
    weight: 0.8,
    text: "How often do you post things that show where you are or who you're with?",
    help: "Holiday photos, gym check-ins, restaurant tags, stories.",
    options: [
      { id: "never", label: "Never", points: 0 },
      { id: "rarely", label: "A few times a year", points: 1 },
      { id: "monthly", label: "Most months", points: 2 },
      { id: "weekly", label: "Most weeks", points: 3 },
    ],
  },

  // -------------------------------------------------------------- location
  {
    id: "loc-app-permissions",
    category: "location",
    weight: 1.2,
    text: "How many apps on your phone can access your location?",
    help: "If you've never checked, that's a common and honest answer.",
    options: [
      { id: "none", label: "None, or only while I'm using them", points: 0 },
      { id: "few", label: "A handful — maps, weather", points: 1 },
      { id: "many", label: "Quite a few", points: 2 },
      { id: "unknown", label: "I've never looked", points: 3 },
    ],
  },
  {
    id: "loc-services",
    category: "location",
    weight: 1,
    text: "Which of these do you use regularly?",
    help: "Ride-hailing, food delivery, navigation with history on, route-tracking fitness apps.",
    options: [
      { id: "none", label: "None of them", points: 0 },
      { id: "one", label: "One", points: 1 },
      { id: "two-three", label: "Two or three", points: 2 },
      { id: "most", label: "Most of them", points: 3 },
    ],
  },
  {
    id: "loc-wifi",
    category: "location",
    weight: 0.8,
    text: "Do you connect to open WiFi in cafés, airports or hotels?",
    options: [
      { id: "never", label: "Never — mobile data only", points: 0 },
      { id: "vpn", label: "Sometimes, with a VPN on", points: 1 },
      { id: "sometimes", label: "Now and then, without one", points: 2 },
      { id: "often", label: "Whenever it's available", points: 3 },
    ],
  },

  // --------------------------------------------------------- communication
  {
    id: "comm-cookies",
    category: "communication",
    weight: 1,
    text: "What do you usually do with cookie banners?",
    options: [
      { id: "reject", label: "Reject everything non-essential", points: 0 },
      { id: "manage", label: "Open the settings and pick", points: 1 },
      { id: "depends", label: "Depends how much of a hurry I'm in", points: 2 },
      { id: "accept", label: "Accept all — it's faster", points: 3 },
    ],
  },
  {
    id: "comm-email",
    category: "communication",
    weight: 1.2,
    text: "How many email addresses do you spread across shops, newsletters and important accounts?",
    options: [
      { id: "aliases", label: "A separate alias per purpose", points: 0 },
      { id: "several", label: "Three or four, split by use", points: 1 },
      { id: "two", label: "A main one and a junk one", points: 2 },
      { id: "one", label: "One address for everything", points: 3 },
    ],
  },
  {
    id: "comm-phone",
    category: "communication",
    weight: 1,
    text: "How freely does your phone number get handed over?",
    help: "Loyalty schemes, delivery apps, sign-up forms, contact forms.",
    options: [
      { id: "rarely", label: "Almost never — I leave the field empty", points: 0 },
      { id: "important", label: "Only where it's genuinely required", points: 1 },
      { id: "often", label: "Fairly often, without thinking about it", points: 2 },
      { id: "always", label: "Any form that asks for it", points: 3 },
    ],
  },

  // ------------------------------------------------------------- financial
  {
    id: "fin-passwords",
    category: "financial",
    weight: 1.4,
    text: "How much do your passwords overlap?",
    options: [
      { id: "manager", label: "All unique, kept in a password manager", points: 0 },
      { id: "mostly-unique", label: "Mostly unique, a few repeats", points: 1 },
      { id: "handful", label: "A handful I rotate between", points: 2 },
      { id: "one", label: "Broadly the same one, with variations", points: 3 },
    ],
  },
  {
    id: "fin-loyalty",
    category: "financial",
    weight: 1,
    text: "How many loyalty or rewards programmes are tied to your shopping?",
    help: "Supermarket cards, pharmacy points, airline miles, store apps.",
    options: [
      { id: "none", label: "None", points: 0 },
      { id: "one-two", label: "One or two", points: 1 },
      { id: "three-five", label: "Three to five", points: 2 },
      { id: "many", label: "More than five", points: 3 },
    ],
  },
];

export const MAX_POINTS_PER_QUESTION = 3;
