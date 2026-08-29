# Kit emails — copy to paste

Two separate things, and they must stay separate:

- **The report** goes to everyone who finished the check (tag `footprint-tool`).
  They asked for it. It is the thing they typed their address for.
- **The sequence** goes only to people who ticked the box (tag `newsletter-opt-in`).
  This is marketing. Never point it at the other tag.

Merge fields available on every subscriber the tool creates:

- `{{ subscriber.footprint_score }}` — a number, 0–100
- `{{ subscriber.footprint_band }}` — `light`, `moderate`, `substantial` or `wide`

Kit's liquid syntax. If a field is ever empty the line still sends, so keep
sentences readable without the number where you can.

---

## 1. The report email

**Trigger:** tag `footprint-tool` added
**Send:** immediately

**Subject:** Your footprint check: {{ subscriber.footprint_score }} out of 100

**Preview text:** The four categories, and where yours is thickest.

---

Hi,

You scored **{{ subscriber.footprint_score }} out of 100** on the digital
footprint check — {{ subscriber.footprint_band }} exposure.

Here is what that number is, so you can hold it at the right weight: it is an
estimate built from twelve answers about your habits. It has not looked
anything up, and it cannot see your accounts. Two people with the same score
can be in quite different situations.

What it is good at is ranking your own four categories against each other:

- **Social presence** — how much of your week is published under your name
- **Location trail** — how many apps hold a record of where you have been
- **Identifiers & tracking** — how easily one email address joins your accounts
- **Accounts & spending** — how far a single old leak could travel

The category at the top of your results page is where a small change buys you
the most. Not the one you would guess, usually.

If you want to see the breakdown again, take the check a second time — it runs
entirely in your browser, so nothing was stored on our side except this address
and the number above.

— Joeri

P.S. The check is a rough map. The book behind it explains the terrain: how
the everyday defaults got set, who they pay, and how to take part in less of it
without leaving modern life. [Starve The Machine](AMAZON_URL_HERE).

---

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

Replace `AMAZON_URL_HERE` in both places once the listing is live.
