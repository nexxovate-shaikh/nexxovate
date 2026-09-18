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
  title: "Talent Solutions",
  description:
    "Enterprise talent solutions from Nexxovate — contract staffing, contract-to-hire, permanent recruitment and dedicated offshore teams, aligned to delivery outcomes.",
  alternates: { canonical: "/staffing" },
};

export default function StaffingPage() {
  return (
    <>
      <PageHero
        eyebrow="Talent solutions"
        title="Autonomous systems still need"
        accent="people who can govern them."
        state="collaboration"
        lede="The more an estate runs itself, the more it matters who sets its boundaries. Nexxovate builds the engineering and operational capability behind intelligent systems — through flexible workforce models aligned to delivery, not to a headcount line."
        primary={{ href: "/contact", label: "Request a talent consultation" }}
        secondary={{ href: "/training", label: "Capability & training" }}
      />

      <StatRow
        items={[
          { value: "4", label: "Workforce models" },
          { value: "Domain", label: "Aligned talent mapping" },
          { value: "Deep", label: "Technical evaluation" },
          { value: "Scalable", label: "Workforce architecture" },
        ]}
      />

      <IndexList
        eyebrow="Workforce models"
        heading="Designed for enterprise scale."
        intro="Whether you are scaling delivery, standing up a new platform or strengthening operations, the model should follow the outcome — not the other way round."
        rows={[
          {
            title: "Contract staffing",
            meta: "Flexible capacity",
            body: "Specialist engineers embedded into your delivery for a defined horizon, evaluated against your technical bar rather than a keyword match.",
          },
          {
            title: "Contract-to-hire",
            meta: "Prove then commit",
            body: "Capability proven inside your own delivery before a permanent commitment is made on either side.",
          },
          {
            title: "Permanent hiring",
            meta: "Long horizon",
            body: "Structured search for the roles that define an engineering culture, with governance around how the decision gets made.",
          },
          {
            title: "Offshore & dedicated teams",
            meta: "Owned outcome",
            body: "A team that belongs to your roadmap, with delivery ownership, not a pool of hours billed against a ticket queue.",
          },
        ]}
        tone="ink"
      />

      <SplitFeature
        eyebrow="How we select"
        heading="Screening for judgement, not for keywords."
        body="A CV tells you what someone has been near. Our evaluation is built to find out how a person reasons when the system is behaving strangely and the runbook does not cover it — because that is the work that actually matters on an enterprise estate."
        points={[
          "Domain-aligned talent mapping against your architecture",
          "Deep technical screening by practitioners, not recruiters",
          "Enterprise hiring governance so decisions are consistent and defensible",
          "Cultural and operational fit assessed alongside technical depth",
        ]}
        media={{ poster: "/images/team.jpg", video: "/videos/talent.mp4", caption: "Evaluated by practitioners, against your bar." }}
        accent="#7a5cff"
      />

      <QuoteBand
        quote="The more the estate decides for itself, the more it matters who set the boundary."
        attribution="Nexxovate — talent principles"
      />

      <Pillars
        eyebrow="Why organisations trust us"
        heading="Beyond recruitment."
        items={[
          {
            title: "Aligned to delivery",
            body: "Talent strategy is designed against the delivery outcomes it has to support, and reviewed when those outcomes change.",
          },
          {
            title: "Governance maturity",
            body: "Consistent hiring standards, documented decisions, and a bar that does not move under pressure.",
          },
          {
            title: "Capability that stays",
            body: "Knowledge transfer is part of the engagement, so capability remains when a contract ends.",
          },
        ]}
      />

      <CTASection
        eyebrow="Talent consultation"
        title="Build stronger teams with Nexxovate."
        body="Tell us the outcome you are hiring against. We will design a workforce model around it and be honest about which parts you should not outsource."
        primary={{ href: "/contact", label: "Speak to our talent team" }}
        secondary={{ href: "/training", label: "Capability & training" }}
      />
    </>
  );
}
