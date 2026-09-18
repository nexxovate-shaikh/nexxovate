import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import { QuoteBand, SplitFeature, StatRow } from "../components/site/blocks";
import { Kicker, Reveal, Section, Shell } from "../components/site/primitives";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How organisations work with Nexxovate to automate operations, modernise platforms and introduce autonomy safely — with the outcomes measured.",
  alternates: { canonical: "/case-studies" },
};

const CASES = [
  {
    id: "support",
    eyebrow: "AI service assistant",
    heading: "Support that answers before the queue forms",
    body: "An AI assistant deployed across customer support to handle the repetitive tier — understanding intent, checking entitlement and acting rather than acknowledging. The team kept the work that needed judgement and stopped carrying the work that did not.",
    points: [
      "Repetitive tier resolved without human handling",
      "Response times reduced across all channels",
      "Escalations arrive with the investigation already attached",
    ],
    result: "Support workload reduced by 45%",
    poster: "/images/ai-assistant.jpg",
    video: "/videos/case-support.mp4",
    accent: "#7a5cff",
  },
  {
    id: "workflow",
    eyebrow: "Workflow automation",
    heading: "Twenty hours a week returned to the operation",
    body: "Document processing and operational workflows rebuilt around intelligent extraction and deterministic execution paths — with rollback on every step, so the automation could be trusted with work that mattered rather than only with work that was safe.",
    points: [
      "Intelligent extraction across unstructured document sets",
      "Deterministic workflows with verification and rollback",
      "Exceptions routed to people with full context, not raw payloads",
    ],
    result: "20+ hours saved per week",
    poster: "/images/automation.jpg",
    video: "/videos/case-workflow.mp4",
    accent: "#4d7cff",
  },
  {
    id: "analytics",
    eyebrow: "Operational intelligence",
    heading: "One picture of an estate that had four",
    body: "A centralised analytics layer turning fragmented operational data into a single, current view — the prerequisite for autonomy, because a system cannot reason about an estate it cannot see whole.",
    points: [
      "Fragmented sources consolidated into one operational truth",
      "Real-time insight replacing weekly reconciliation",
      "Predictive signal surfaced inside existing workflows",
    ],
    result: "Single operational view across the estate",
    poster: "/images/dashboard.jpg",
    video: "/videos/case-analytics.mp4",
    accent: "#39d0d8",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Outcomes,"
        accent="measured."
        state="orchestration"
        lede="A selection of intelligent automation and platform engagements. Each one started with a class of work the organisation understood well — and each was measured against something agreed before implementation began."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/ams", label: "Explore AMS" }}
      />

      <StatRow
        items={[
          { value: "45%", label: "Support workload reduced" },
          { value: "20+", label: "Hours returned per week" },
          { value: "1", label: "Operational view, four sources" },
          { value: "Measured", label: "Against agreed baselines" },
        ]}
      />

      {CASES.map((item, i) => (
        <SplitFeature
          key={item.id}
          id={item.id}
          eyebrow={item.eyebrow}
          heading={item.heading}
          body={item.body}
          points={item.points}
          media={{
            poster: item.poster,
            video: item.video,
            label: item.eyebrow,
            caption: item.result,
          }}
          flip={i % 2 === 1}
          accent={item.accent}
          tone={i % 2 === 1 ? "ink" : "void"}
        />
      ))}

      <QuoteBand
        quote="Every engagement starts by agreeing what we will measure. That conversation is usually the valuable one."
        attribution="Nexxovate — delivery principles"
      />

      <Section tone="void" className="border-t border-white/[0.06]">
        <Shell width="wide">
          <Reveal>
            <Kicker tone="gold">A note on numbers</Kicker>
            <p className="mt-7 max-w-[62ch] text-[1rem] leading-[1.78] text-mute">
              The figures above are outcomes from specific engagements, measured
              against baselines agreed with the client before work started. They
              are not a promise of what your estate will do — the honest answer to
              &ldquo;what will this save us?&rdquo; always begins with looking at
              your own data. That is what the first engagement is for.
            </p>
          </Reveal>
        </Shell>
      </Section>

      <CTASection
        eyebrow="Your estate"
        title="What would we measure for you?"
        body="Bring the operation that costs the most attention. We will agree the baseline first, and only then talk about what to automate."
      />
    </>
  );
}
