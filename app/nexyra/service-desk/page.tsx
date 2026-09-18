import type { Metadata } from "next";

import PageHero from "../../components/site/PageHero";
import WorldSequence from "../../components/site/WorldSequence";
import CTASection from "../../components/site/CTASection";
import {
  IndexList,
  Pillars,
  QuoteBand,
  SplitFeature,
  StatRow,
} from "../../components/site/blocks";
import { WORLDS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Nexyra AI Service Desk",
  description:
    "Nexyra AI Service Desk understands enterprise issues in the words people actually use, investigates across systems of record, collaborates across specialist agents, resolves and learns.",
  alternates: { canonical: "/nexyra/service-desk" },
};

const desk = WORLDS.find((w) => w.id === "service-desk")!;

export default function ServiceDeskPage() {
  return (
    <>
      <PageHero
        eyebrow="Nexyra AI Service Desk"
        title="Understanding"
        accent="before resolution."
        state="collaboration"
        lede="People do not report incidents in your schema. They say the thing that is wrong. The Nexyra service desk establishes what was actually meant, what the person is entitled to, and how urgent it really is — before a single routing decision is made."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "#collaboration", label: "How agents collaborate" }}
      />

      <StatRow
        items={[
          { value: "L1–L3", label: "Coverage across tiers" },
          { value: "Multi", label: "Agent collaboration" },
          { value: "Parallel", label: "Systems investigation" },
          { value: "Continuous", label: "Learning loop" },
        ]}
      />

      <WorldSequence world={desk} />

      <SplitFeature
        eyebrow="Understanding"
        heading="Routing is the easy half. Comprehension is the hard one."
        body="Classification models can put a ticket in a queue. They cannot tell that the person describing a slow report and the person describing a failed export are hitting the same upstream job. Understanding means resolving the sentence against the estate, not against a taxonomy."
        points={[
          "Intent resolved against topology, entitlement and recent change",
          "Duplicate and related requests recognised before triage, not after",
          "Urgency derived from impact, not from the reporter's adjective",
          "Ambiguity produces one clarifying question, not a rejection",
        ]}
        media={{ poster: "/images/ai-assistant.jpg", video: "/videos/desk-understanding.mp4", caption: "Resolve the sentence against the estate." }}
        accent="#7a5cff"
        tone="ink"
      />

      <SplitFeature
        id="collaboration"
        eyebrow="Agent collaboration"
        heading="Specialists, not one model pretending to know everything."
        body="Identity, network, data and application context live in different places and behave differently. Nexyra brings the agent that holds each piece of context into the same investigation, and keeps a single thread of reasoning across all of them."
        points={[
          "Specialist agents contribute where they hold real context",
          "One investigation thread — no restating the problem per handover",
          "Disagreement between agents surfaces rather than being averaged away",
          "A person can join the thread at any point and see the whole trace",
        ]}
        media={{ poster: "/images/team.jpg", video: "/videos/desk-collab.mp4", caption: "One thread of reasoning across specialists." }}
        flip
        accent="#b451d8"
      />

      <QuoteBand
        quote="The measure of a service desk is not how fast it replies. It is how rarely the same problem has to be understood twice."
        attribution="Nexyra — service desk principles"
      />

      <Pillars
        eyebrow="What changes"
        heading="For the person asking, and the team behind it."
        items={[
          {
            title: "For the requester",
            body: "One place, plain language, an answer that reflects their actual entitlement — and an action taken rather than a ticket number.",
          },
          {
            title: "For the L1 team",
            body: "The repetitive tier stops consuming people. What arrives has already been investigated, with the evidence attached.",
          },
          {
            title: "For engineering",
            body: "Escalations come with a trace, not a paragraph. The work starts where the system stopped, not at the beginning.",
          },
          {
            title: "For the business",
            body: "Resolution paths are retained, so capability compounds instead of leaving when a person does.",
          },
        ]}
      />

      <IndexList
        eyebrow="Where it fits"
        heading="Alongside what you already run."
        intro="Nexyra sits on top of your existing service management platform rather than replacing it — the record of truth stays where your auditors expect to find it."
        rows={[
          {
            title: "Your ITSM stays the system of record",
            body: "Tickets, approvals and reporting remain where they are. Nexyra contributes understanding, investigation and action against them.",
          },
          {
            title: "Knowledge becomes an asset, not an archive",
            body: "Resolution paths are written back with provenance, so the next occurrence is faster because of what actually worked.",
          },
          {
            title: "Escalation is designed, not accidental",
            body: "The boundary between autonomous action and human judgement is declared up front and reported on continuously.",
          },
          {
            title: "It runs on Nexyra OS",
            body: "Authority, memory and audit lineage are inherited from the platform rather than reimplemented per product.",
            href: "/nexyra/os",
          },
        ]}
      />

      <CTASection
        eyebrow="Start with your ticket history"
        title="Show us last quarter's tickets."
        body="We will tell you which classes the service desk can resolve outright, which it should investigate and escalate, and which should never leave a person's hands."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/nexyra/os", label: "Explore Nexyra OS" }}
      />
    </>
  );
}
