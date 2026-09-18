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
  title: "Nexyra OS",
  description:
    "Nexyra OS is the intelligent operating architecture for the enterprise — agents, memory, knowledge, workflows and connected systems assembled into one governed execution fabric.",
  alternates: { canonical: "/nexyra/os" },
};

const os = WORLDS.find((w) => w.id === "nexyra-os")!;

export default function NexyraOsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nexyra OS"
        title="The operating architecture"
        accent="for autonomous work."
        state="architecture"
        lede="Every autonomous system eventually needs the same six things: reasoners with authority, memory that survives the session, knowledge it can actually query, deterministic paths it can invoke, connections into the real estate, and execution that stays inside policy. Nexyra OS is those six things, assembled and governed as one."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "#layers", label: "See the layers" }}
      />

      <StatRow
        items={[
          { value: "6", label: "Architectural layers" },
          { value: "Scoped", label: "Agent authority" },
          { value: "Durable", label: "Governed memory" },
          { value: "Replayable", label: "Every execution" },
        ]}
      />

      <WorldSequence world={os} />

      <Pillars
        id="layers"
        eyebrow="The layers"
        heading="What a dashboard cannot give you."
        items={[
          {
            title: "Agents",
            body: "Purpose-built reasoners with a stated scope: the systems they may touch, the actions they may take, and the point at which they must hand over.",
          },
          {
            title: "Memory",
            body: "Recall that outlives the conversation and stays governed — retention, redaction and access are policy, not a side effect of a vector store.",
          },
          {
            title: "Knowledge",
            body: "Documents, policies, runbooks and estate topology made addressable, with provenance attached so an answer can be traced to its source.",
          },
          {
            title: "Workflows",
            body: "Deterministic execution paths an agent can invoke. When the outcome must be exact, reasoning chooses the path — it does not improvise one.",
          },
        ]}
      />

      <SplitFeature
        eyebrow="Connected systems"
        heading="Autonomy is only as real as its reach."
        body="An agent that can reason but cannot act is a chatbot. Nexyra OS connects into the platforms an enterprise already runs — service management, identity, cloud control planes, data platforms, communications — and treats each connection as a governed capability rather than an integration."
        points={[
          "Connectors expose capabilities, not raw credentials",
          "Every call is attributable to an agent, a policy and a request",
          "Rate, scope and blast radius are enforced at the connector",
          "Failures degrade to escalation, never to a silent partial state",
        ]}
        media={{ poster: "/images/cloud.jpg", video: "/videos/nexyra-connect.mp4", caption: "Governed capability, not raw access." }}
        accent="#39d0d8"
        tone="ink"
      />

      <QuoteBand
        quote="Memory, knowledge and authority are architecture. They are not a longer prompt."
        attribution="Nexyra OS — design note"
      />

      <SplitFeature
        eyebrow="Autonomous execution"
        heading="Bounded, observable, reversible."
        body="Execution is where autonomy stops being a demo. Nexyra OS runs work inside a declared boundary, records the reasoning alongside the action, verifies the resulting state, and reverses itself when verification fails — so the failure mode is a rollback and an escalation, not a surprise."
        points={[
          "Policy evaluated before execution, not asserted afterwards",
          "Reasoning, action and outcome stored together and replayable",
          "Post-execution verification against expected state",
          "Automatic rollback with the full trace attached on escalation",
        ]}
        media={{ poster: "/images/dashboard.jpg", video: "/videos/nexyra-exec.mp4", caption: "Execute inside policy. Verify. Reverse if wrong." }}
        flip
        accent="#e2c188"
      />

      <IndexList
        eyebrow="Where it runs"
        heading="Applications of the same fabric."
        rows={[
          {
            title: "Nexyra AI Service Desk",
            body: "Enterprise support that understands intent, investigates in parallel and resolves — inheriting the OS authority model wholesale.",
            href: "/nexyra/service-desk",
          },
          {
            title: "Autonomous Managed Services",
            body: "Closed-loop operations from signal to resolution, governed by the same policy layer.",
            href: "/ams",
          },
          {
            title: "Agent Platform",
            body: "Your own agents, trained on your own knowledge estate, deployed with governance already in place.",
            href: "/platform",
          },
        ]}
      />

      <CTASection
        eyebrow="Architecture review"
        title="Bring the workflow you would never hand to a black box."
        body="We will walk through how Nexyra OS bounds it, what evidence it keeps, and exactly where it stops and asks a person."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/nexyra/service-desk", label: "AI Service Desk" }}
      />
    </>
  );
}
