import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import {
  IndexList,
  Pillars,
  QuoteBand,
  SplitFeature,
  StatRow,
} from "../components/site/blocks";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nexxovate enterprise services: AI and intelligent automation, cloud and infrastructure, cybersecurity and risk, digital transformation, managed services, talent and capability building.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise services"
        title="Capability, engineered"
        accent="for autonomy."
        state="activation"
        lede="Six practices that compound. Each one is useful on its own; together they are how an estate climbs from monitored to self-governing without ever taking a step it cannot reverse."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/ams", label: "Explore AMS" }}
      />

      <StatRow
        items={[
          { value: "7.6+", label: "Years of enterprise delivery" },
          { value: "24/7", label: "Operational readiness" },
          { value: "Security", label: "First by architecture" },
          { value: "Measured", label: "At every stage" },
        ]}
      />

      <SplitFeature
        id="ai"
        eyebrow="AI & Intelligent Automation"
        heading="From copilots to closed loops."
        body="Most AI programmes stall at the assistant — useful, but still waiting on a person. The work that changes an operating cost is the next step: giving a system the authority, the evidence and the execution path to finish the job itself."
        points={[
          "Reasoning agents with scoped authority and designed escalation",
          "Governed memory and a queryable knowledge estate",
          "Deterministic workflows agents invoke rather than improvise",
          "Every autonomous decision attributable and replayable",
        ]}
        media={{ poster: "/images/ai.jpg", video: "/videos/ai.mp4", caption: "Reasoning, authority, execution — governed as one." }}
        href={{ label: "Explore Nexyra OS", url: "/nexyra/os" }}
        accent="#4d7cff"
        tone="ink"
      />

      <SplitFeature
        id="cloud"
        eyebrow="Cloud & Infrastructure"
        heading="Global estate, orchestrated as one."
        body="Regions, providers and generations of technology, presented and operated as a single intelligent system — where placement, capacity and cost become decisions the platform makes continuously rather than decisions a change board makes quarterly."
        points={[
          "Every region, provider and legacy footprint mapped as one surface",
          "Data movement placed where latency and cost actually demand",
          "Capacity and posture tuned without waiting for a change window",
          "Observability designed in, not retrofitted after the first outage",
        ]}
        media={{ poster: "/images/cloud.jpg", video: "/videos/cloud.mp4", caption: "One fabric across regions and providers." }}
        flip
        accent="#39d0d8"
      />

      <SplitFeature
        id="security"
        eyebrow="Cybersecurity & Risk"
        heading="Contain it before it becomes an incident."
        body="A threat surfaces. The system detects the deviation, intelligence establishes the blast radius, controls engage across identity, network and endpoint, the threat is isolated, and the environment returns to a verified good state — in seconds, not across a shift handover."
        points={[
          "Behavioural baselines that understand your estate, not a generic one",
          "Blast radius and lineage established before containment decisions",
          "Controls engaged automatically inside a declared authority boundary",
          "Continuous assurance rather than an annual attestation",
        ]}
        media={{ poster: "/images/cyber.jpg", video: "/videos/security.mp4", caption: "Detect, analyse, isolate, stabilise." }}
        accent="#b451d8"
        tone="ink"
      />

      <SplitFeature
        id="transformation"
        eyebrow="Digital Transformation"
        heading="From fragmented to self-governing."
        body="Transformation is a sequence, not a programme launch. Fragmented systems become connected systems; connected systems become intelligent ones; intelligent systems become an enterprise that runs and governs itself. Each horizon is measured before the next begins."
        points={[
          "Integration first, so there is a single operational truth to reason from",
          "Prediction and recommendation placed inside existing workflows",
          "Bounded classes of work handed to closed-loop autonomy",
          "Every horizon reversible, every step measured",
        ]}
        media={{ poster: "/images/office.jpg", video: "/videos/transformation.mp4", caption: "Fragmented → connected → intelligent → autonomous." }}
        flip
        accent="#e2c188"
      />

      <QuoteBand
        quote="The distance between automated and autonomous is where the operating cost still lives."
        attribution="Nexxovate"
      />

      <IndexList
        eyebrow="Also delivered"
        heading="The practices that make the rest possible."
        intro="Autonomous systems still need people who can govern them, and organisations that can absorb the change."
        rows={[
          {
            title: "Autonomous Managed Services",
            body: "Closed-loop operations from signal to resolution, with authority, evidence and rollback declared up front.",
            href: "/ams",
            meta: "Flagship",
          },
          {
            title: "Talent Solutions",
            body: "Contract, contract-to-hire, permanent and dedicated offshore teams — engineering capability at enterprise scale.",
            href: "/staffing",
          },
          {
            title: "Capability & Training",
            body: "Structured programmes that build the engineering and operational capability to run intelligent systems responsibly.",
            href: "/training",
          },
          {
            title: "Consulting & Advisory",
            body: "Where autonomy is safe to introduce first, what it should be measured against, and what must stay in human hands.",
            href: "/ai-consultation",
          },
        ]}
      />

      <Pillars
        eyebrow="How we deliver"
        heading="Why enterprises keep us after the first programme."
        items={[
          {
            title: "Governance up front",
            body: "Authority boundaries, escalation paths and measurement are agreed before anything is automated — not documented afterwards.",
          },
          {
            title: "Ownership, not resourcing",
            body: "We take outcomes, not headcount lines. The delivery model has a name against every commitment.",
          },
          {
            title: "Security by architecture",
            body: "Access is a governed capability at the connector, never a shared credential in a runbook.",
          },
          {
            title: "Reversible by default",
            body: "Every change carries its rollback. The worst case is a reversal and an escalation, never a surprise.",
          },
        ]}
      />

      <CTASection />
    </>
  );
}
