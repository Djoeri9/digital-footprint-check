# Kit emails — copy to paste

Two separate things, and they must stay separate:

- **The report** goes to everyone who finished the check (tag `footprint-tool`).
  They asked for it. It is the thing they typed their address for.
- **The sequence** goes only to people who ticked the box (tag `newsletter-opt-in`).
  This is marketing. Never point it at the other tag.

Merge fields available on every subscriber the tool creates:

- `{{ subscriber.footprint_score }}` — a number, 0–100
- `{{ subscriber.footprint_band }}` — `light`, `moderate`, `substantial` or `wide`
- `{{ subscriber.footprint_top_category }}` — their heaviest category, e.g. `Identifiers & tracking`
- `{{ subscriber.footprint_top_reading }}` — the paragraph explaining that category at their level
- `{{ subscriber.footprint_top_step }}` — the one concrete first step for it

Kit's liquid syntax. If a field is ever empty the line still sends, so keep
sentences readable without the number where you can.

---

## 1. The report email

**Trigger:** tag `footprint-tool` added
**Send:** immediately, every day of the week

**Subject:** Your footprint check: {{ subscriber.footprint_score }} out of 100

**Preview text:** Your heaviest category, and the one change worth making first.

---

Hi,

You scored **{{ subscriber.footprint_score }} out of 100** on the digital
footprint check — {{ subscriber.footprint_band }} exposure.

The number is the least interesting part, so here is the useful bit.

**Your heaviest category: {{ subscriber.footprint_top_category }}**

{{ subscriber.footprint_top_reading }}

**One first step**

{{ subscriber.footprint_top_step }}

That is deliberately one thing rather than a list. A single change you actually
make beats nine you read about, and this is the one that moves your number
most.

A word on what the score is, so you hold it at the right weight: it is an
estimate built from twelve answers about your habits. It has not looked
anything up and it cannot see your accounts. Two people with the same score can
be in quite different situations. What it does reliably is rank your own four
categories — social presence, location trail, identifiers and tracking,
accounts and spending — against each other.

Nothing was stored on our side except this address, the number, and which
category came top. Your individual answers never left your browser.

— Joeri

P.S. The check is a rough map. The book behind it explains the terrain: how
the everyday defaults got set, who they pay, and how to take part in less of it
without leaving modern life. [Starve The Machine](AMAZON_URL_HERE).

---

## 1b. The thirty-day retake

Same sequence as the report, second email, **30 days** after the first. Goes to
everyone with the `footprint-tool` tag, opt-in or not — it is about their own
result, not marketing.

**Subject:** A month on: has your number moved?

**Preview text:** Under two minutes. The second time is the interesting one.

---

Hi,

A month ago you scored {{ subscriber.footprint_score }} out of 100, and your
heaviest category was {{ subscriber.footprint_top_category }}.

If you made the change we suggested — or any other — the check will show it.
It takes under two minutes and it runs entirely in your browser, same as
last time.

**Take it again: SITE_URL_HERE**

Two things worth knowing before you do.

Most people find their number has barely moved, and that is the honest and
useful result. Exposure is built from defaults, not decisions, so it does not
drop because you meant well. It drops when a specific setting changes.

And some people find it has gone up. That is not a failure either. It usually
means a new app, a new account, a form filled in without much thought — which
is precisely how footprints grow. Noticing it is the whole point of measuring
twice.

— Joeri

## 2. The sequence — only for `newsletter-opt-in`

Four emails. Calm, spaced out, one idea each. The book appears twice, both
times as the logical end of a thought rather than as a pitch.

### Email 1 — day 0

**Subject:** What this list is, and what it isn't

---

Hi,

You ticked a box, so a short note on what you have let yourself in for.

Roughly once a month I write about how ordinary data collection works. Not
breaches and hackers — the boring, legal, everyday machinery: loyalty schemes,
permission dialogs, the join keys that let two companies work out you are the
same person.

No alarm, no countdowns, no "act now". If a subject cannot be made interesting
without frightening you, it probably isn't worth your attention.

One thing before the rest: unsubscribing is one click at the bottom of every
email, including this one, and I would rather you did that than let these pile
up unread.

— Joeri

### Email 2 — day 3

**Subject:** How your email address gets from a form to a broker

---

Hi,

Your score had a category called *Identifiers & tracking*. This is what sits
underneath it.

An email address on its own is not very interesting. What makes it valuable is
that it is the same string everywhere. A shop knows you as a customer. A
newsletter knows you as a reader. A delivery app knows your street. None of
them knows very much — until something joins those records, and the thing that
joins them is almost always your address or your phone number.

That joining is legal, routine and largely invisible. It is also the single
easiest thing to interrupt: an alias for shopping, a blank field where a phone
number is not legally required. Not because either is dramatic, but because
they break the key.

One alias, on the next thing you sign up for. That is the whole assignment.

— Joeri

### Email 3 — day 7

**Subject:** The setting that holds the longest record

---

Hi,

If you have never gone through your phone's location permissions, you are in
the majority — one of the answers in the check exists precisely because "I have
never looked" is the ordinary condition.

Worth knowing why it matters more than it sounds. Location history identifies a
person faster than a name does. A week of it typically shows where you sleep,
where you work, where you train, and who you visit. There is no equivalent
record of any of that from thirty years ago, for anyone.

The fix takes four minutes: open your location settings and move everything set
to *Always* down to *While using*. Almost nothing breaks. Maps still works.

Then, if you want the bigger one: turn off location history in your maps app.
That is usually the longest record anybody holds on you.

— Joeri

### Email 4 — day 12

**Subject:** Why the defaults are set the way they are

---

Hi,

Three emails of small fixes. Here is the part they don't add up to.

You can change every setting I have mentioned and still be handing over most of
what you did before, because the collection is not really a settings problem.
It is a design problem. Every dialog that asks for one more identifier was
built by someone who was paid to get a yes, and the defaults reflect that, not
your interests.

That is what I wrote the book about. Not a list of software to install — an
explanation of what the collecting is for, who pays for it, and why reducing
your supply degrades the profile more than any single tool does.

[Starve The Machine](AMAZON_URL_HERE) — it is short, and it is not written to
frighten you.

If it isn't for you, no harm done. These letters keep coming either way, about
once a month.

— Joeri

---

## Before any of this sends

**CAN-SPAM requires a physical postal address in every commercial email.**
Kit puts it in the footer and will not let you send without one. A PO box or a
virtual mailbox is fine and is the normal answer for authors who would rather
not publish a home address.

Replace `AMAZON_URL_HERE` in both places once the listing is live, and
`SITE_URL_HERE` in the retake email with the live address of the tool.
