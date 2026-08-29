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

  // TODO(phase 5): replace with the live Amazon US listing.
  amazonUrl: "https://www.amazon.com/dp/PLACEHOLDER",

  // TODO(phase 6): the address that receives access and deletion requests.
  contactEmail: "privacy@example.com",

  /**
   * Phase 4 turns this on together with the ESP integration. While it is false
   * the tool genuinely collects nothing, and the privacy page says so without
   * describing a feature that does not exist yet.
   */
  emailCaptureEnabled: true,

  /** Phase 7. Adds the Have I Been Pwned block to the results page. */
  breachCheckEnabled: false,
} as const;
