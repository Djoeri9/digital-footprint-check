import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Umami, self-hosted on our own machine. It sets no cookies, stores no
 * identifiers and never leaves our server, which is the only kind of
 * measurement this particular site can defend. Renders nothing at all unless
 * both values are configured, so a half-finished setup cannot ship a broken
 * script tag.
 */
export function Analytics() {
  const { scriptUrl, websiteId } = SITE.analytics;
  if (!scriptUrl || !websiteId) return null;

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
      defer
    />
  );
}

/** True when measurement is actually switched on, for copy that must not lie. */
export const analyticsEnabled = Boolean(
  SITE.analytics.scriptUrl && SITE.analytics.websiteId
);
