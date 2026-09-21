import type { Metadata } from "next";
import FAQ from "@/app/components/FAQ";
import { FAQ_INSIGHTS } from "@/lib/content/faq";
import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import { PageHero, PageCTA } from "@/app/components/PageShell";
import ServiceCard from "@/app/components/visual/ServiceCard";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { INSIGHTS } from "@/lib/insights";

/* ══════════════════════════════════════════════════════════════
   INSIGHTS — index.

   Moved onto this site's design system from the other rebuild,
   which rendered it with its own CurvedMedia component, its own type
   and blue/violet accents. The ARTICLES are unchanged: same data file
   (lib/insights.ts), same slugs, same URLs, so nothing that links to
   an article breaks.

   The featured article leads full width; the rest share a row.
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Insights on the Autonomous Enterprise",
  description:
    "Writing from Nexxovate on enterprise AI, operations, cybersecurity and building technology teams.",
};

export default function InsightsPage() {
  const featured = INSIGHTS.find((i) => i.featured) ?? INSIGHTS[0];
  const rest = INSIGHTS.filter((i) => i.slug !== featured.slug);

  return (
    <>
      <PageHero
        kicker="Insights"
        lines={[<>Thinking on</>, <Accent>the autonomous enterprise</Accent>]}
        intro="What we have learned building AI, cloud and security systems that have to work on a Monday morning, written down."
        image="/images/plates/insights.jpg"
        alt="Insights"
        zone="ai"
      />

      <Section band="deep" zone="ai" className="ground-sheen">
        <Container>
          <Reveal className="mb-10 md:mb-12">
            <Kicker>Latest</Kicker>
          </Reveal>

          <Stagger className="grid gap-8 md:gap-10 lg:grid-cols-2">
            <StaggerItem className="lg:col-span-2">
              <ServiceCard
                index={0}
                title={featured.title}
                result={`${featured.category} · ${featured.readingTime} read`}
                desc={featured.excerpt}
                panel={featured.poster}
                panelAlt=""
                href={`/insights/${featured.slug}`}
                cta="Read the article"
                wide
              />
            </StaggerItem>
            {rest.map((post, i) => (
              <StaggerItem key={post.slug}>
                <ServiceCard
                  index={i + 1}
                  title={post.title}
                  result={`${post.category} · ${post.readingTime} read`}
                  desc={post.excerpt}
                  panel={post.poster}
                  panelAlt=""
                  href={`/insights/${post.slug}`}
                  cta="Read the article"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <FAQ items={FAQ_INSIGHTS} />

      <PageCTA
        title="Have a problem worth"
        accent="writing about?"
        intro="Most of these started as a conversation with a client about something slow, manual or fragile."
        label="Start the conversation"
      />
    </>
  );
}
