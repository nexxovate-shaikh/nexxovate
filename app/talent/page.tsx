import type { Metadata } from "next";
import { Section, Container } from "@/app/components/ui";
import {
  PageHero,
  SectionHead,
  OfferGrid,
  ProofList,
  PageCTA,
} from "@/app/components/PageShell";
 import { TALENT_MODELS, TALENT_PROOF } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Talent Solutions",
  description:
    "Enterprise talent solutions including contract staffing, contract-to-hire, permanent recruitment and offshore dedicated teams.",
};

export default function TalentPage() {
  return (
    <>
      <PageHero
        kicker="Technology talent solutions"
        lines={[<>Enterprise talent for</>, <>high-performance teams</>]}
        intro="Nexxovate helps organisations attract, scale and retain top technology talent through flexible, enterprise-grade workforce models."
        image="/images/staffing-hero.jpg"
        alt="Enterprise staffing"
        cta="/contact"
        ctaLabel="Request a talent consultation"
      />

      <Section band="light" zone="ai">
        <Container>
          <SectionHead
            kicker="Workforce models"
            title="Built for"
            accent="enterprise scale"
            intro="Scalable enterprise-grade hiring aligned to business delivery outcomes."
          />
          <OfferGrid offers={TALENT_MODELS} />
        </Container>
      </Section>

      <Section band="deep" zone="security">
        <Container>
          <ProofList
            kicker="Why Nexxovate"
            title="Why organisations trust us"
            accent="with talent"
            points={TALENT_PROOF}
            image="/images/team.jpg"
            alt="Team collaboration"
          />
        </Container>
      </Section>

      <PageCTA
        title="Build stronger teams"
        accent="with Nexxovate"
        intro="Let us design a scalable, future-ready talent strategy aligned to your growth."
        label="Speak to our talent team"
      />
    </>
  );
}
