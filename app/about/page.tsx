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
  title: "About",
  description:
    "Nexxovate is an enterprise technology company engineering the autonomous enterprise — across intelligence, infrastructure, security, operations and talent.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nexxovate"
        title="We build enterprises"
        accent="that run themselves."
        state="ecosystem"
        lede="Nexxovate is a technology partner for organisations whose operations are too important to leave waiting on a person. We work where intelligence, infrastructure, security and talent meet — and we are judged on what the estate does when nobody is watching it."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/case-studies", label: "See the outcomes" }}
      />

      <StatRow
        items={[
          { value: "7.6+", label: "Years of enterprise delivery" },
          { value: "6", label: "Practices, one operating model" },
          { value: "24/7", label: "Operational readiness" },
          { value: "100%", label: "Decisions with audit lineage" },
        ]}
      />

      <SplitFeature
        eyebrow="Who we are"
        heading="Engineers who have carried a pager."
        body="Nexxovate was founded by people who have run enterprise estates, not only advised on them. That shows up in how we work: we are sceptical of autonomy without evidence, we design the escalation before the automation, and we would rather ship a smaller boundary that holds than a broad one that surprises you at 3am."
        points={[
          "Delivery-led, with a named owner against every commitment",
          "Governance and measurement agreed before implementation begins",
          "Long engagements — we are still there when the estate changes",
          "Security treated as architecture, not as a review gate",
        ]}
        media={{ poster: "/images/about-team.jpg", video: "/videos/team.mp4", caption: "Delivery-led, governance-first." }}
        accent="#4d7cff"
        tone="ink"
      />

      <QuoteBand
        quote="Beyond automation. Into autonomy."
        attribution="The Nexxovate position"
      />

      <Pillars
        eyebrow="Principles"
        heading="What we hold to when the pressure is on."
        items={[
          {
            title: "Execution excellence",
            body: "Reliable delivery, engineering discipline, and outcomes that were agreed before the work started rather than after it slipped.",
          },
          {
            title: "Intelligent innovation",
            body: "New capability adopted because it changes an operating cost — never because it is the thing everyone is currently talking about.",
          },
          {
            title: "Evidence over assertion",
            body: "If a decision cannot be reconstructed, it does not ship. That applies to our systems and to our recommendations.",
          },
          {
            title: "Long-term partnership",
            body: "We optimise for the estate you will have in three years, which occasionally means telling you not to buy something now.",
          },
        ]}
      />

      <SplitFeature
        eyebrow="Mission & vision"
        heading="Close the distance between automated and autonomous."
        body="Our mission is to give organisations systems that decide as well as they execute — bounded by policy, provable under audit, and improving because of what they resolved yesterday. Our vision is to be the partner enterprises trust with the operations they cannot afford to have go wrong."
        points={[
          "Mission — intelligent technology, strong foundations, future-ready talent",
          "Vision — a globally trusted enterprise partner across intelligence, infrastructure and workforce",
          "Measure — what the estate does unattended, not what the roadmap promises",
        ]}
        media={{ poster: "/images/about-office.jpg", video: "/videos/office.mp4", caption: "Engineering the autonomous enterprise." }}
        flip
        accent="#e2c188"
      />

      <IndexList
        eyebrow="Leadership"
        heading="Who you will actually work with."
        intro="Enterprise enquiries are reviewed by our leadership team. The people who scope the work are the people accountable for delivering it."
        rows={[
          {
            title: "Shaikh Arif",
            meta: "Founder & Managing Director",
            body: "Leads enterprise IT operations, service delivery and digital transformation engagements across the practice.",
          },
          {
            title: "Head of Engineering & AI",
            meta: "Technology",
            body: "Owns cloud architecture, agent design and the governance model that bounds autonomous execution.",
          },
          {
            title: "Head of Delivery & Talent",
            meta: "Operations",
            body: "Accountable for execution across managed services and for the workforce models behind them.",
          },
        ]}
      />

      <CTASection
        eyebrow="Work with us"
        title="Let's build the future together."
        body="Bring us the part of your operation that costs the most attention. We will tell you honestly whether autonomy is the right answer for it."
      />
    </>
  );
}
