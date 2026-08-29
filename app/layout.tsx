import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Link from "next/link";
import { SITE } from "@/lib/site";
import "./globals.css";

/**
 * Anton is the closest widely available face to the cover's condensed display
 * type. It is used sparingly: the wordmark, page titles and the score. Body
 * text stays in a neutral sans, because the cover face is unreadable at
 * paragraph length.
 */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "A short, calm questionnaire that estimates how much of you is readable online. Runs entirely in your browser. From the author of Starve The Machine.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Digital Footprint Check",
    template: "%s — Digital Footprint Check",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Digital Footprint Check",
    title: "Digital Footprint Check",
    description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Footprint Check",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-ink-700">
          <div className="mx-auto w-full max-w-3xl px-5 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl uppercase text-bone hover:text-acid-400 transition-colors"
            >
              Digital Footprint Check
            </Link>
            <Link
              href="/about-the-book"
              className="text-sm text-ash-400 hover:text-bone transition-colors"
            >
              The book
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink-700 mt-24">
          <div className="mx-auto w-full max-w-3xl px-5 py-10 text-sm text-ash-500 space-y-4">
            <p className="max-w-prose">
              This tool runs in your browser. Your answers are not sent
              anywhere, and nothing on this site tracks you.{" "}
              <Link
                href="/privacy"
                className="text-ash-200 underline underline-offset-4 decoration-ink-700 hover:decoration-acid-500"
              >
                How this tool handles your data
              </Link>
              .
            </p>
            <p>Intended for users 16 and older.</p>
            <p className="text-ash-600">
              A companion to <em>Starve The Machine</em> by Joeri R. Hostyn.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
