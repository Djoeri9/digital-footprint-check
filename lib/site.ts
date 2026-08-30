/**
 * Single place for the details that change between phases and between
 * deployments. Nothing here is secret; real keys belong in env vars.
 */
export const SITE = {
  bookTitle: "Starve The Machine",
  author: "Joeri R. Hostyn",

  /**
   * Absolute base URL, needed for link previews on social platforms: they will
   * not follow relative image paths. Set NEXT_PUBLIC_SITE_URL once the domain
   * exists; until then previews only work correctly on the deployed host.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100",

  // The live Amazon US listing. While it still reads PLACEHOLDER the buy
  // button hides itself rather than sending anyone to a dead page.
  amazonUrl: "https://www.amazon.com/dp/B0H8PNQL18",

  /**
   * Self-hosted Umami. Both values must be set for the script to render, so a
   * missing configuration means no script at all rather than a broken one.
   * First-party and cookieless by design: see the privacy page, which changes
   * its wording when this is switched on.
   */
  analytics: {
    scriptUrl: process.env.NEXT_PUBLIC_UMAMI_URL ?? "",
    websiteId: process.env.NEXT_PUBLIC_UMAMI_ID ?? "",
  },

  /**
   * Receives access and deletion requests. Routed to a real inbox that gets
   * read: a rights request has to arrive somewhere, and keeping it separate
   * from newsletter replies means it will not be lost among them.
   */
  contactEmail: "privacy@joerihostyn.com",

  /**
   * Phase 4 turns this on together with the ESP integration. While it is false
   * the tool genuinely collects nothing, and the privacy page says so without
   * describing a feature that does not exist yet.
   */
  emailCaptureEnabled: true,

  /** Phase 7. Adds the Have I Been Pwned block to the results page. */
  breachCheckEnabled: false,
} as const;
