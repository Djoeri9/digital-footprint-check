import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Digital Footprint Check — twelve questions, runs in your browser";

/**
 * Generated at build time, served from our own host. A link preview image
 * fetched from a third-party CDN would report every scroll past the post.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px 80px",
          color: "#eceeec",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8d928d",
          }}
        >
          A twelve-question check
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", width: 96, height: 4, backgroundColor: "#8cc63f" }} />
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.15, maxWidth: 940 }}>
            You know roughly what you share. Most people are off by a category
            or two.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8d928d",
          }}
        >
          <div style={{ display: "flex" }}>Digital Footprint Check</div>
          <div style={{ display: "flex" }}>Runs entirely in your browser</div>
        </div>
      </div>
    ),
    size
  );
}
