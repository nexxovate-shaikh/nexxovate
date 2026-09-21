import type { Metadata } from "next";
import { Section, Container, Accent } from "@/app/components/ui";
import {
  PageHero,
  SectionHead,
  OfferGrid,
  ProofList,
  PageCTA,
} from "@/app/components/PageShell";
 import { TRAINING_PROGRAMS, TRAINING_PROOF } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Corporate Technology Training",
  description:
    "Enterprise training programs including corporate training, online learning, classroom workshops and career transformation pathways.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        kicker="Capability development"
        lines={[<>Future-ready learning</>, <Accent>for high-performance teams</Accent>]}
        intro="Nexxovate builds capability through structured, industry-relevant programs designed around the platforms your teams actually run."
        image="/images/plates/training.jpg"
        alt="Enterprise training"
        cta="/contact"
        ctaLabel="Explore training programs"
      />

      <Section band="light" zone="ai" className="ground-grid">
        <Container>
          <SectionHead
            kicker="Learning programs"
            title="Designed for"
            accent="enterprise impact"
            intro="Structured programs aligned with enterprise capability building and long-term performance."
          />
          <OfferGrid offers={TRAINING_PROGRAMS} />
        </Container>
      </Section>

      <Section band="deep" zone="security" className="ground-aurora">
        <Container>
          <ProofList
            kicker="Why Nexxovate"
            title="Why teams learn"
            accent="with us"
            points={TRAINING_PROOF}
            image="/images/plates/proof-training.jpg"
            alt="Learning session"
          />
        </Container>
      </Section>

      <PageCTA
        title="Build future-ready"
        accent="capabilities"
        intro="Let us design a structured learning roadmap aligned with your organisation's growth."
        label="Speak to our learning team"
      />
    </>
  );
}
