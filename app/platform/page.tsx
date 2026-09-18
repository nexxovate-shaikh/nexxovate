import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import { IndexList, StatRow } from "../components/site/blocks";

export const metadata: Metadata = {
  title: "Agent Platform",
  description:
    "Deploy Nexxovate agents trained on your own knowledge estate, with the Nexyra governance model already in place.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Agent platform"
        title="Your knowledge."
        accent="Your agents."
        state="architecture"
        lede="A workspace for deploying agents against your own documents, policies and operational estate — running on Nexyra OS, so authority, memory and audit lineage are inherited rather than reinvented."
        primary={{ href: "/platform/agent", label: "Open the agent" }}
        secondary={{ href: "/nexyra/os", label: "Explore Nexyra OS" }}
      />

      <StatRow
        items={[
          { value: "Scoped", label: "Agent authority" },
          { value: "Governed", label: "Durable memory" },
          { value: "Provenance", label: "On every answer" },
          { value: "Replayable", label: "Every execution" },
        ]}
      />

      <IndexList
        eyebrow="Workspace"
        heading="Three surfaces, one governed estate."
        intro="Knowledge intake, an agent to reason over it, and the controls that decide what it may do with what it knows."
        rows={[
          {
            title: "Knowledge intake",
            meta: "Upload",
            body: "Add documents, policies and internal data to the estate an agent reasons over. Text formats are extracted on intake; richer formats are provisioned per engagement.",
            href: "/platform/upload",
          },
          {
            title: "Agent",
            meta: "Ask",
            body: "Put a question to the Nexxovate agent. Answers are grounded in published material and carry the sources they came from — when it does not know, it says so.",
            href: "/platform/agent",
          },
          {
            title: "Governance",
            meta: "Provisioned",
            body: "Authority boundaries, retention, redaction and connector scope are configured with your team as part of the engagement, not left as defaults.",
            href: "/contact",
          },
        ]}
        tone="ink"
      />

      <CTASection
        eyebrow="Provisioning"
        title="Deploy agents against your own estate."
        body="The workspace here shows the shape. A production deployment is scoped with your team — connectors, authority boundaries and retention agreed before anything is switched on."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/nexyra", label: "Explore Nexyra" }}
      />
    </>
  );
}
