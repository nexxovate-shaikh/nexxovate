import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import { IndexList, Pillars, QuoteBand, StatRow } from "../components/site/blocks";

export const metadata: Metadata = {
  title: "AI Consultation",
  description:
    "A structured first engagement with Nexxovate: map the estate, find where autonomy is safe to introduce first, and agree what gets measured.",
  alternates: { canonical: "/ai-consultation" },
};

export default function AIConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="AI consultation"
        title="Find out where autonomy"
        accent="is actually safe to start."
        state="activation"
        lede="A structured engagement, not a discovery call. We map the estate, identify the class of work where closed-loop autonomy carries the least risk and the most return, and agree the measurement before anyone writes an automation."
        primary={{ href: "/contact", label: "Request a consultation" }}
        secondary={{ href: "/ams", label: "Explore AMS" }}
      />

      <StatRow
        items={[
          { value: "4", label: "Structured stages" },
          { value: "Estate", label: "Mapped, not surveyed" },
          { value: "Baseline", label: "Agreed before build" },
          { value: "Honest", label: "About what not to automate" },
        ]}
      />

      <IndexList
        eyebrow="How it runs"
        heading="Four stages, one honest answer."
        intro="The output is a roadmap you could hand to another partner. That is deliberate — advice you can only act on with us is not advice."
        rows={[
          {
            title: "Estate mapping",
            meta: "Week one",
            body: "Systems, dependencies, telemetry quality and where operational effort actually goes — measured from your data rather than from an interview.",
          },
          {
            title: "Opportunity assessment",
            meta: "Week two",
            body: "Which classes of work are candidates for autonomy, ranked by understood failure modes and blast radius rather than by potential saving.",
          },
          {
            title: "Governance design",
            meta: "Week three",
            body: "The authority boundary, escalation paths, evidence retention and rollback strategy — written down before anything is built.",
          },
          {
            title: "Roadmap & baseline",
            meta: "Week four",
            body: "A sequenced plan with the measurement agreed up front, and a clear statement of what should stay in human hands.",
          },
        ]}
        tone="ink"
      />

      <QuoteBand
        quote="The most valuable output of a first engagement is usually the list of things we told you not to automate."
        attribution="Nexxovate — advisory principles"
      />

      <Pillars
        eyebrow="What you get"
        heading="Deliverables, not impressions."
        items={[
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
        ]}
      />

      <CTASection
        eyebrow="Book the engagement"
        title="Start with the estate you already have."
        body="Bring your ticket history, your telemetry and the operation that costs the most attention. Four weeks later you will know exactly where to start — and where not to."
        primary={{ href: "/contact", label: "Request a consultation" }}
        secondary={{ href: "/case-studies", label: "See the outcomes" }}
      />
    </>
  );
}
