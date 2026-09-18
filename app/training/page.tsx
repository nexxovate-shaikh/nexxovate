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
  title: "Capability & Training",
  description:
    "Nexxovate training programmes — corporate training, online learning, classroom workshops and career transformation, built to create capability rather than certificates.",
  alternates: { canonical: "/training" },
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Capability & training"
        title="Capability compounds."
        accent="Certificates don't."
        state="activation"
        lede="Structured, practitioner-led programmes that build the engineering and operational capability an enterprise actually runs on — measured by what teams do differently afterwards, not by attendance."
        primary={{ href: "/contact", label: "Explore programmes" }}
        secondary={{ href: "/staffing", label: "Talent solutions" }}
      />

      <StatRow
        items={[
          { value: "4", label: "Programme formats" },
          { value: "Practitioners", label: "As instructors" },
          { value: "Project", label: "Based learning" },
          { value: "Measured", label: "Capability change" },
        ]}
      />

      <IndexList
        eyebrow="Programme formats"
        heading="Built around how teams actually learn."
        intro="The format follows the outcome. Deep architectural change needs a room and a whiteboard; tooling adoption does not."
        rows={[
          {
            title: "Corporate training programmes",
            meta: "Cohort",
            body: "Curriculum designed against your architecture and delivery model, run for a team that will apply it together the following week.",
          },
          {
            title: "Online learning",
            meta: "Distributed",
            body: "Structured paths for distributed teams, with real project work rather than a video library and a quiz.",
          },
          {
            title: "Classroom & workshops",
            meta: "Intensive",
            body: "Facilitated sessions for the decisions that need a room — architecture, incident practice, operating model design.",
          },
          {
            title: "Career transformation",
            meta: "Individual",
            body: "Longer programmes for people moving into engineering and operations roles, with mentoring from practitioners.",
          },
        ]}
        tone="ink"
      />

      <SplitFeature
        eyebrow="How we teach"
        heading="Practitioners, real systems, real failure."
        body="Our instructors are people who run the systems they teach. Sessions are built around real architectures and real incidents, because the useful skill is not recalling the correct answer — it is reasoning to one when the situation is unfamiliar."
        points={[
          "Industry-aligned curriculum designed for your estate",
          "Project-based learning against realistic systems",
          "Enterprise-ready frameworks and tooling, not toy examples",
          "Capability measured after the programme, not during it",
        ]}
        media={{ poster: "/images/training.jpg", video: "/videos/training.mp4", caption: "Taught by the people who run it." }}
        accent="#39d0d8"
      />

      <QuoteBand
        quote="Training that does not change what a team does on Monday was entertainment."
        attribution="Nexxovate — learning principles"
      />

      <Pillars
        eyebrow="Outcomes"
        heading="What organisations get from it."
        items={[
          {
            title: "Measurable capability",
            body: "Improvement in skills, behaviours and productivity that can be observed in delivery, not just reported in feedback forms.",
          },
          {
            title: "Retention that follows",
            body: "Teams stay where they are learning. Capability building is one of the few retention levers that is not a salary conversation.",
          },
          {
            title: "Autonomy readiness",
            body: "The governance skills a team needs before you hand any part of the estate to a system that decides for itself.",
          },
        ]}
      />

      <CTASection
        eyebrow="Learning roadmap"
        title="Build future-ready capability."
        body="Tell us where delivery slows down. We will design a learning roadmap against that, and say plainly which gaps training will not close."
        primary={{ href: "/contact", label: "Speak to our learning team" }}
        secondary={{ href: "/staffing", label: "Talent solutions" }}
      />
    </>
  );
}
