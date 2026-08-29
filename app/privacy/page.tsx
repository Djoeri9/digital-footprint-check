import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How this tool handles your data",
  description:
    "What the Digital Footprint Check stores, what it does not, and how to have anything removed.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-16">
      <h1 className="font-display text-3xl text-bone">
        How this tool handles your data
      </h1>
      <p className="mt-4 text-ash-400">
        Written in plain language, because a privacy tool that needs a lawyer to
        explain itself has already failed.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl text-bone">The short version</h2>
        <ul className="space-y-3 text-ash-200 leading-relaxed">
          <li className="flex gap-3">
            <span className="text-ember-500">·</span>
            <span>
              Your quiz answers stay in your browser tab. They are not sent to a
              server, and they are gone when you close the tab.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-ember-500">·</span>
            <span>
              There is no Google Analytics, no Meta pixel, no advertising tag and
              no third-party tracker on any page of this site.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-ember-500">·</span>
            <span>
              We set no cookies. That is also why you were never shown a cookie
              banner.
            </span>
          </li>
          {SITE.emailCaptureEnabled ? (
            <li className="flex gap-3">
              <span className="text-ember-500">·</span>
              <span>
                If you give us your email address, we store your address, your
                score and your heaviest category. Nothing else.
              </span>
            </li>
          ) : (
            <li className="flex gap-3">
              <span className="text-ember-500">·</span>
              <span>
                We do not ask for your email address, and there is nowhere on
                this site to give it to us.
              </span>
            </li>
          )}
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl text-bone">
          What happens when you take the check
        </h2>
        <p className="text-ash-200 leading-relaxed">
          Every question, every weighting and all of the arithmetic ship to your
          browser as part of the page. Your answers are held in{" "}
          <code className="text-ash-200 bg-ink-800 px-1.5 py-0.5 rounded text-sm">
            sessionStorage
          </code>
          , a per-tab store that the browser clears when the tab closes. The
          server that sent you this page never learns what you answered, because
          the answers are never transmitted to it.
        </p>
        <p className="text-ash-400 leading-relaxed">
          You can verify this rather than take our word for it: open your
          browser developer tools, switch to the network tab, and take the
          check. No request carries your answers.
        </p>
      </section>

      {SITE.emailCaptureEnabled && (
        <>
          <section className="mt-12 space-y-4">
            <h2 className="font-display text-xl text-bone">
              If you ask for your report by email
            </h2>
            <p className="text-ash-200 leading-relaxed">
              We store three things: the email address you typed, the score the
              tool calculated, and which of the four categories came out
              heaviest. Not your individual answers, not your IP address, not
              your device. They sit with Kit, the company that sends the mail
              on our behalf, and go nowhere else.
            </p>
            <p className="text-ash-200 leading-relaxed">
              We keep them until you unsubscribe or ask us to delete them,
              whichever comes first. There is no other schedule and no archive
              behind it: unsubscribing removes you.
            </p>
            <p className="text-ash-200 leading-relaxed">
              Receiving the report and joining the mailing list are separate
              choices. The mailing list has its own checkbox, it is never
              pre-ticked, and declining it does not stop you receiving your
              report.
            </p>
            <p className="text-ash-400 leading-relaxed">
              Every email we send identifies who it is from, describes itself
              honestly in the subject line, and carries a working unsubscribe
              link. Unsubscribes are honoured immediately and in every case
              within ten business days, as the CAN-SPAM Act requires.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="font-display text-xl text-bone">
              Seeing, moving or deleting what we hold
            </h2>
            <p className="text-ash-200 leading-relaxed">
              This site is run from Belgium, so the GDPR applies to what we do
              with your address regardless of where you live. Residents of
              California, Virginia, Colorado, Connecticut and a growing number
              of other US states have comparable rights under their own laws.
              We apply the same standard to everyone, because maintaining two
              would be more work than honouring the higher one.
            </p>
            <p className="text-ash-200 leading-relaxed">
              You can ask us to show you what we hold, correct it, hand it to
              you in a portable form, or delete it. You can withdraw your
              consent to the mailing list at any time, and doing so does not
              affect anything we sent before. Our legal basis is your consent:
              you asked for the report, and the mailing list was a separate
              tick.
            </p>
            <p className="text-ash-200 leading-relaxed">
              Email{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="text-ember-400 underline underline-offset-4"
              >
                {SITE.contactEmail}
              </a>{" "}
              from the address in question and ask. We will tell you what we
              hold, or delete it, within thirty days. We do not sell or share
              personal information with third parties, so there is nothing to
              opt out of on that front.
            </p>
          </section>
        </>
      )}

      {SITE.breachCheckEnabled && (
        <section className="mt-12 space-y-4">
          <h2 className="font-display text-xl text-bone">The breach check</h2>
          <p className="text-ash-200 leading-relaxed">
            The address you enter is passed to the Have I Been Pwned API to run
            the lookup, and is not stored on our side unless you separately
            opted into the mailing list. We show which breaches an address
            appeared in and what categories of data were exposed. We never
            display leaked passwords or leaked data itself.
          </p>
        </section>
      )}

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl text-bone">Age</h2>
        <p className="text-ash-200 leading-relaxed">
          This tool is intended for people aged 16 and older. We do not
          knowingly collect personal information from children under 13. If you
          believe a child has sent us information, write to{" "}
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-ember-400 underline underline-offset-4"
          >
            {SITE.contactEmail}
          </a>{" "}
          and we will remove it.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl text-bone">
          Who is responsible for this
        </h2>
        <p className="text-ash-200 leading-relaxed">
          {SITE.author}, writing from Belgium, is the data controller. Reach us
          at{" "}
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-ember-400 underline underline-offset-4"
          >
            {SITE.contactEmail}
          </a>
          .
        </p>
        <p className="text-ash-400 leading-relaxed">
          Because the site is run from the EU, the GDPR governs what we do with
          your data, and it applies whether you are reading this in Ohio or in
          Ghent. Most of the readers we write for are in the United States, so
          we also follow CAN-SPAM and the state privacy laws that apply there.
          Where two rules differ, we follow the stricter one. If you think we
          have handled your data badly, you can complain to your own data
          protection authority; in Belgium that is the Gegevensbeschermingsautoriteit.
        </p>
      </section>

      <p className="mt-14 text-sm text-ash-600">
        Last updated when this page was written. Any change that affects what we
        collect will be noted here.{" "}
        <Link
          href="/"
          className="text-ash-400 underline underline-offset-4 hover:text-bone"
        >
          Back to the check
        </Link>
        .
      </p>
    </div>
  );
}
