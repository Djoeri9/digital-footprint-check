# Digital Footprint Check

A twelve-question check that estimates how much of you is readable online, and
shows which of four categories accounts for most of it. Companion tool to the
book *Starve The Machine* by Joeri R. Hostyn.

The point of publishing this repository is that the claims on the privacy page
should be checkable rather than trusted.

## What happens to your answers

Nothing leaves the browser. The questions, the weights and the arithmetic all
ship to the client as part of the page; answers live in `sessionStorage`, which
the browser clears when the tab closes.

You can verify this without reading any code: open your developer tools, switch
to the network tab, and take the check. No request carries your answers.

In the code, the relevant files are [`lib/questions.ts`](lib/questions.ts),
[`lib/scoring.ts`](lib/scoring.ts) and [`lib/storage.ts`](lib/storage.ts).
There is no analytics script, no tracking pixel, no third-party embed, and no
cookie — which is why the site never shows you a cookie banner.

## What leaves the browser, and when

One thing, once, and only if you ask for it: if you enter an email address to
receive your report, that address and your score are sent to
[`app/api/subscribe`](app/api/subscribe/route.ts), which forwards them to Kit.
Your individual answers are not included.

Two tags are applied, and they are deliberately separate:

- `footprint-tool` — everyone who requests a report. Triggers the report email.
- `newsletter-opt-in` — only people who tick the box. The only tag any
  marketing sequence is allowed to target.

See [`lib/kit.ts`](lib/kit.ts).

## Running it locally

```bash
npm install
cp .env.example .env.local   # add your own Kit API key
npm run dev
```

The quiz and results work without any environment variables. Only the email
step needs a Kit key.

| Variable | What it is |
| --- | --- |
| `KIT_API_KEY` | Kit V4 API key, server-side only |
| `KIT_TAG_ID` | Tag applied to everyone who finishes |
| `KIT_NEWSLETTER_TAG_ID` | Tag applied only on explicit opt-in |
| `NEXT_PUBLIC_SITE_URL` | Absolute base URL, for share links and previews |

Next.js (App Router) and Tailwind. No database.

## The score

Twelve questions, each scored 0–3 and weighted within its category. Category
scores are normalised to 0–100, then combined: identifiers 30%, social 25%,
location 25%, accounts 20%.

It is an estimate built from self-reported habits, not a measurement. It looks
nothing up and cannot see your accounts. What it does reliably is rank your own
four categories against each other.
