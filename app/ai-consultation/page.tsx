import type { Metadata } from "next";
import FAQ from "@/app/components/FAQ";
import { FAQ_CONSULTATION } from "@/lib/content/faq";
import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import { PageHero, PageCTA } from "@/app/components/PageShell";
import ServiceCard from "@/app/components/visual/ServiceCard";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   AI CONSULTATION.

   Moved onto this site's design system. The version it replaces came
   from the other rebuild: its own hero component, its own type scale,
   its own colours — which is why clicking Consultation from the
   Services menu felt like arriving on a different website, and part
   of why that menu lagged.

   The COPY is kept. The four stages, the three deliverables and the
   line about advice you could hand to another partner were the
   strongest writing on that page, and none of it is changed here.
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "AI Consultation: Where Autonomy Belongs",
  description:
    "A four-week consultation that maps your estate, ranks where autonomy belongs, designs the governance and ends in a roadmap you could hand to another partner.",
};

const STAGES = [
  {
    title: "Estate mapping",
    body: "Systems, dependencies, telemetry quality and where operational effort actually goes — measured from your data rather than from an interview.",
  },
  {
    title: "Opportunity assessment",
    body: "Which classes of work are candidates for autonomy, ranked by understood failure modes and blast radius rather than by potential saving.",
  },
  {
    title: "Governance design",
    body: "The authority boundary, escalation paths, evidence retention and rollback strategy — written down before anything is built.",
  },
  {
    title: "Roadmap & baseline",
    body: "A sequenced plan with the measurement agreed up front, and a clear statement of what should stay in human hands.",
  },
];

const DELIVERABLES = [
  {
    title: "Opportunity map",
    body: "Ranked candidates for autonomy across your estate, with the reasoning behind the ranking and the data it came from.",
  },
  {
    title: "Governance model",
    body: "Authority boundaries, escalation design, evidence and retention — the document your risk function will ask for.",
  },
  {
    title: "Measured baseline",
    body: "What today actually costs, agreed with your team, so improvement can be demonstrated rather than asserted.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        kicker="AI Consultation"
        lines={[<>Find out where</>, <Accent>autonomy belongs</Accent>]}
        intro="Four weeks, your own data, and an honest answer — including about what not to automate."
        image="/images/plates/consultation.jpg"
        alt="AI Consultation"
        cta="/contact"
        ctaLabel="Request a consultation"
        zone="ai"
      />

      {/* ── The engagement, at a glance ── */}
      <Section band="deep" zone="ai" className="ground-aurora">
        <Container>
          <Reveal>
            <ServiceCard
              index={0}
              title="Four stages, one honest answer."
              desc="The output is a roadmap you could hand to another partner. That is deliberate — advice you can only act on with us is not advice."
              panel="/images/work/consult-roadmap.jpg"
              panelAlt="A four-week consultation roadmap: estate mapping, opportunity assessment, governance design, and roadmap and baseline, with the final week highlighted."
              cta="Request a consultation"
              wide
            />
          </Reveal>
        </Container>
      </Section>

      {/* ── The four stages ── */}
      <Section band="light" zone="ai" className="ground-grid">
        <Container>
          <Reveal className="mb-10 max-w-2xl md:mb-12">
            <Kicker>How it runs</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              Structured stages, <Accent>agreed before build</Accent>
            </h2>
          </Reveal>

          <Stagger className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage, i) => (
              <StaggerItem key={stage.title} className="bg-ink">
                <div className="flex h-full flex-col p-7 md:p-8">
                  <span className="font-mono-label tabular-nums text-[color:var(--color-champagne)]">
                    Week {i + 1}
                  </span>
                  <h3 className="font-display mt-5 text-[length:var(--text-h4)] font-semibold">
                    {stage.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.6px] leading-relaxed text-mute">
                    {stage.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── What you leave with ── */}
      <Section band="dark" zone="ai" className="ground-sheen">
        <Container>
          <Reveal className="mb-10 max-w-2xl md:mb-12">
            <Kicker>What you leave with</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              Deliverables, <Accent>not impressions</Accent>
            </h2>
          </Reveal>

          <Stagger className="grid gap-5 md:grid-cols-3">
            {DELIVERABLES.map((d, i) => (
              <StaggerItem key={d.title}>
                <div
                  className="flex h-full flex-col rounded-[18px] p-7 md:p-8"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--color-champagne) 6%, transparent), transparent 60%), var(--color-ink-2)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  <span className="font-mono-label tabular-nums text-[color:var(--color-champagne)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-[length:var(--text-h4)] font-semibold">
                    {d.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.6px] leading-relaxed text-mute">
                    {d.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <FAQ items={FAQ_CONSULTATION} />

      <PageCTA
        title="Start with the estate"
        accent="you already have"
        intro="Bring your ticket history, your telemetry and the operation that costs the most attention. Four weeks later you will know exactly where to start — and where not to."
        label="Request a consultation"
      />
    </>
  );
}
