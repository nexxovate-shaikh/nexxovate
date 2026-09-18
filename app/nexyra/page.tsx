import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import { IndexList, QuoteBand, SplitFeature, StatRow } from "../components/site/blocks";

export const metadata: Metadata = {
  title: "Nexyra",
  description:
    "Nexyra is Nexxovate's intelligence platform: an operating architecture for enterprise agents, and an AI service desk built on top of it.",
  alternates: { canonical: "/nexyra" },
};

export default function NexyraPage() {
  return (
    <>
      <PageHero
        eyebrow="The Nexyra platform"
        title="Where enterprise intelligence"
        accent="is composed and governed."
        state="architecture"
        lede="Nexyra is the layer beneath everything autonomous you operate. Agents, memory, knowledge, workflows and connectors are composed into one execution fabric — and the products built on it inherit that governance rather than reinventing it."
        primary={{ href: "/nexyra/os", label: "Explore Nexyra OS" }}
        secondary={{ href: "/nexyra/service-desk", label: "AI Service Desk" }}
      />

      <StatRow
        items={[
          { value: "6", label: "Architectural layers" },
          { value: "Policy", label: "Bounded autonomy" },
          { value: "Composable", label: "By design" },
          { value: "Observable", label: "End to end" },
        ]}
      />

      <SplitFeature
        eyebrow="Nexyra OS"
        heading="An operating architecture, not a dashboard."
        body="Nexyra OS is where agents are given authority, memory is made durable and governed, knowledge is made queryable, and workflows become things an agent can invoke rather than a person can only follow. It is the substrate; everything else is an application of it."
        points={[
          "Agents with scoped authority and explicit escalation paths",
          "Durable, governed memory across every interaction",
          "Your documents, policies and estate made addressable",
          "Deterministic workflows agents can call, with rollback",
        ]}
        media={{ poster: "/images/automation.jpg", video: "/videos/nexyra-os.mp4", caption: "Agents, memory, knowledge, workflows, systems, execution." }}
        href={{ label: "Explore Nexyra OS", url: "/nexyra/os" }}
        accent="#4d7cff"
        tone="ink"
      />

      <SplitFeature
        eyebrow="Nexyra AI Service Desk"
        heading="Understanding before resolution."
        body="An enterprise issue arrives as a sentence, not a schema. The service desk reads intent, investigates across systems of record in parallel, brings specialist agents in where they hold context, resolves — and folds what it learned back into the knowledge estate."
        points={[
          "Intent, entitlement and urgency established before routing",
          "Parallel investigation across systems of record",
          "Multi-agent collaboration where context is specialised",
          "Actions taken, not merely recommended",
        ]}
        media={{ poster: "/images/ai-assistant.jpg", video: "/videos/service-desk.mp4", caption: "Issue → understanding → investigation → resolution → learning." }}
        href={{ label: "Explore the AI Service Desk", url: "/nexyra/service-desk" }}
        flip
        accent="#7a5cff"
      />

      <QuoteBand
        quote="An agent can act because its authority, its evidence and its execution path are all explicit."
        attribution="Nexyra — architectural principle"
      />

      <IndexList
        eyebrow="Built on Nexyra"
        heading="One substrate, several surfaces."
        intro="Each product inherits the same authority model, memory and audit trail. Nothing is bolted on afterwards."
        rows={[
          {
            title: "Nexyra OS",
            body: "The operating architecture — agents, memory, knowledge, workflows, connected systems and bounded autonomous execution.",
            href: "/nexyra/os",
            meta: "Platform",
          },
          {
            title: "Nexyra AI Service Desk",
            body: "Enterprise support that understands, investigates and resolves, with a learning loop that compounds.",
            href: "/nexyra/service-desk",
            meta: "Product",
          },
          {
            title: "Agent Platform",
            body: "Deploy agents trained on your own knowledge estate, with the governance model already in place.",
            href: "/platform",
            meta: "Workspace",
          },
          {
            title: "Autonomous Managed Services",
            body: "AMS runs on the same fabric — which is why its decisions carry the same audit lineage.",
            href: "/ams",
            meta: "Service",
          },
        ]}
      />

      <CTASection
        eyebrow="See it against your estate"
        title="Bring us a workflow you would never hand to a black box."
        body="That is the interesting one. We will show you how Nexyra bounds it, what evidence it retains, and what it escalates instead of guessing."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/ams", label: "Explore AMS" }}
      />
    </>
  );
}
