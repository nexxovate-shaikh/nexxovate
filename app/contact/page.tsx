import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Kicker, Accent, StatusDot } from "@/app/components/ui";
import { PageHero } from "@/app/components/PageShell";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import EnquiryForm from "@/app/components/home/EnquiryForm";

/* ══════════════════════════════════════════════════════════════
   CONTACT.

   The page this replaces was four unlabelled boxes on flat black
   with a centred "SEND ENQUIRY" in caps and nothing else on the
   page — no ground, no hierarchy, no reason to believe anyone is
   on the other end. It read as a form that had lost its design,
   because that is what it was: it came from the other rebuild and
   never picked up this site's system.

   ── WHAT MAKES A CONTACT PAGE FEEL EXPENSIVE ──────────────────
   Not gradients. Three things, in this order:

   1. THE FORM IS ON A SURFACE. A field floating on a page ground
      has nothing to be inset into, so it reads as a gap rather
      than an input. Here the whole form sits on a raised plate
      with its own hairline and shadow, and the fields are darker
      than the plate — the standard cue that a control is a well
      you type into.

   2. THE PAGE ANSWERS "WHAT HAPPENS NEXT". The column beside the
      form is not decoration: who reads this, how fast they reply,
      and what to say. An enterprise buyer filling in a form is
      taking a small risk, and every unanswered question about
      where it lands is a reason to close the tab.

   3. IT SAYS WHERE ELSE TO GO. Someone who is not ready to write
      a message should still have somewhere to click, or they
      leave. That is what the three routes at the foot are for.

   The two-column split is deliberate: the form on the left where
   reading starts, the reassurance on the right where the eye rests
   between fields.
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Contact Nexxovate Experts",
  description:
    "Tell us what is slow, manual or fragile. Enterprise enquiries are read by the people who scope the work, not by a sales queue.",
};

/* Honest, checkable, and all of it true of how this site is built —
   nothing here promises a number nobody is measuring. */
const ASSURANCES: { label: string; detail: string }[] = [
  {
    label: "A person scopes it",
    detail:
      "Enquiries go to the team who would run the engagement, not to a sales queue that forwards them on.",
  },
  {
    label: "Three fields, not seven",
    detail:
      "Name, work email and what you are trying to change. Everything else is a question we can ask once there is something to ask about.",
  },
  {
    label: "No CAPTCHA",
    detail:
      "Nothing to prove you are human. If the send fails, the message stays in the box rather than vanishing with it.",
  },
];

const ROUTES: { title: string; note: string; href: string }[] = [
  {
    title: "See Nexyra running",
    note: "Network monitoring, the service desk agent, the auditor and chat — with real consoles, not diagrams.",
    href: "/nexyra",
  },
  {
    title: "Scope an engagement",
    note: "A short consultation that ends with what AI should take off your team, and what it should not.",
    href: "/ai-consultation",
  },
  {
    title: "Talent and training",
    note: "The teams that sustain the build after it ships, and the certification paths behind them.",
    href: "/talent",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        lines={[<>Tell us what is slow,</>, <Accent>manual or fragile</Accent>]}
        intro="The more specific you are, the more useful the first reply will be. A sentence about the workflow that costs your team the most attention is worth more than a completed brief."
        image="/images/plates/contact.jpg"
        alt="Nexxovate"
        zone="transformation"
      />

      {/* ── The form ── */}
      <Section band="deep" zone="transformation" className="ground-aurora">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* THE PLATE. The form's ground is one step lighter than
                the band, so the fields — which are one step darker
                again — read as inset. Three tones, which is the
                minimum for a control to look like a control. */}
            <Reveal>
              <div
                className="rounded-[18px] p-6 md:rounded-[22px] md:p-9"
                style={{
                  background: "var(--color-ink-2)",
                  border: "1px solid var(--color-line)",
                  boxShadow: "0 1px 2px rgba(4,8,18,0.3), 0 26px 64px rgba(4,8,18,0.42)",
                }}
              >
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Kicker>Start here</Kicker>
                    <h2 className="font-display mt-4 text-[length:var(--text-h3)] font-semibold">
                      Send an enquiry
                    </h2>
                  </div>
                  <StatusDot label="Usually answered within one working day" />
                </div>

                <EnquiryForm />
              </div>
            </Reveal>

            {/* ── What happens next ── */}
            <div className="flex flex-col gap-8">
              <Reveal delay={0.08}>
                <h3 className="font-display text-[length:var(--text-h4)] font-semibold">
                  What happens to this
                </h3>
                <ul className="mt-6 flex flex-col gap-6">
                  {ASSURANCES.map((a) => (
                    <li key={a.label}>
                      <div className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1 h-px w-5 shrink-0"
                          style={{ background: "var(--color-champagne)" }}
                        />
                        <div>
                          <p className="font-display text-[15px] font-semibold text-text">
                            {a.label}
                          </p>
                          <p className="mt-2 text-[14px] leading-relaxed text-mute">
                            {a.detail}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="border-t border-line pt-7">
                  <p className="font-mono-label text-faint">Or write directly</p>
                  <a
                    href="mailto:nexxovate@gmail.com"
                    className="font-display mt-4 inline-block text-[length:var(--text-h4)] font-semibold text-text underline decoration-[color:var(--color-champagne)] decoration-2 underline-offset-[6px] transition-colors hover:text-[color:var(--color-champagne)]"
                  >
                    nexxovate@gmail.com
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Somewhere to go instead ──
          For the visitor who is not ready to type anything. Without
          this the page is a dead end for everyone who is still
          deciding, which is most of the people who reach it. */}
      <Section band="light" zone="transformation" className="ground-grid">
        <Container>
          <Reveal>
            <Kicker>Not ready to write yet</Kicker>
            <h2 className="font-display mt-6 max-w-[22ch] text-[length:var(--text-h2)] font-semibold">
              Three other ways in
            </h2>
          </Reveal>

          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line md:mt-12 md:grid-cols-3">
            {ROUTES.map((r) => (
              <StaggerItem key={r.href} className="bg-ink">
                <Link
                  href={r.href}
                  className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-surface md:p-8"
                >
                  <h3 className="font-display text-[length:var(--text-h4)] font-semibold leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.4px] leading-relaxed text-mute">
                    {r.note}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] text-[color:var(--zone-2)]">
                    Go there
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
