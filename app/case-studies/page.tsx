import type { Metadata } from "next";
import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import ServiceCard from "@/app/components/visual/ServiceCard";
import { PageHero, SectionHead, PageCTA } from "@/app/components/PageShell";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { CASE_STUDIES } from "@/lib/content/site";

/* ══════════════════════════════════════════════════════════════
   Case studies.

   Rebuilt onto the design system. It was the last page still on
   the old identity — white ground, purple-to-pink gradients,
   max-w-7xl, its own type scale — so a visitor arriving here from
   the home page landed on what looked like a different company.

   It is also where "Selected work" moved to. That block was living
   inside the Problems band on the home page, costing 852px there,
   and this is the page it was always describing.

   PROVENANCE: the three engagements below are the ones this page
   already carried, with their results kept exactly as written. The
   two lists had drifted apart — the old page said "Reduced support
   workload by 45%", CASE_STUDIES in site.ts said nothing of the
   kind — so both are here: the result line from this page, the
   photography and description from the shared content file. No
   figure has been changed and none has been added.
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Case Studies — AI and Automation",
  description:
    "Intelligent platforms and automation systems Nexxovate has built across AI, cloud infrastructure and enterprise operations.",
};

/* The result lines, carried over verbatim from the previous page. */
const RESULTS: Record<string, string> = {
  "AI Customer Support Assistant": "Reduced support workload by 45%",
  "Business Workflow Automation": "Saved 20+ hours per week",
  "AI Analytics Dashboard": "Improved operational insights",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        kicker="Selected work"
        lines={[<>Solutions</>, <Accent>we&apos;ve built</Accent>]}
        intro="Examples of intelligent platforms and automation systems designed to improve operational efficiency, accelerate insights and transform enterprise workflows."
        image="/images/plates/case-studies.jpg"
        alt="Nexxovate engagements"
      />

      {/* ── The work ── */}
      <Section band="deep" zone="security" className="ground-dust">
        <Container>
          <SectionHead
            kicker="Engagements"
            title="What we have"
            accent="put into production"
          />

          {/* The lead engagement runs full width with its panel beside
              the copy; the other two share a row. Three equal thirds
              would shrink every panel to about 400px, where the thing
              each one shows — the conversation, the flow, the chart —
              stops being legible and becomes decoration. */}
          <Stagger className="grid gap-8 md:gap-10 lg:grid-cols-2">
            {CASE_STUDIES.map((item, i) => (
              <StaggerItem key={item.title} className={i === 0 ? "lg:col-span-2" : ""}>
                <ServiceCard
                  index={i}
                  title={item.title}
                  result={RESULTS[item.title]}
                  desc={item.desc}
                  panel={item.img}
                  panelAlt={`${item.title} — ${RESULTS[item.title] ?? ""}`}
                  cta="Discuss a similar engagement"
                  wide={i === 0}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── An honest note about what is not here ── */}
      <Section band="light" zone="transformation" className="ground-grid">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>Named references</Kicker>
            <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-mute">
              The engagements above are described without naming the clients
              involved. Where a client has agreed to be named and to have
              figures published, that reference belongs here — send it over and
              it goes in. Nothing on this page has been embellished to fill the
              space.
            </p>
          </Reveal>
        </Container>
      </Section>

      <PageCTA
        title="Tell us what is slow,"
        accent="manual or fragile"
        intro="We will scope what an AI system can take off your team — and what it should not."
      />
    </>
  );
}
