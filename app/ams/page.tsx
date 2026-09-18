import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import WorldSequence from "../components/site/WorldSequence";
import CTASection from "../components/site/CTASection";
import { IndexList, Pillars, QuoteBand, SplitFeature, StatRow } from "../components/site/blocks";
import { AutonomyCurve } from "../components/site/HomeSections";
import { WORLDS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Autonomous Managed Services",
  description:
    "AMS closes the loop between what the estate reports and what actually gets done — signal, detection, analysis, decision, orchestration and autonomous resolution, with full audit lineage.",
  alternates: { canonical: "/ams" },
};

const ams = WORLDS.find((w) => w.id === "ams")!;

const OPERATING_MODEL = [
  {
    title: "Authority is explicit",
    body: "Every autonomous action runs inside a stated boundary: which systems, which change classes, which hours, which blast radius. Outside that boundary it escalates rather than improvises.",
    meta: "Policy",
  },
  {
    title: "Evidence precedes action",
    body: "A remediation only executes when the reasoning behind it can be reconstructed — the signals, the correlation, the topology, the prior incidents it matched against.",
    meta: "Assurance",
  },
  {
    title: "Every decision is reversible",
    body: "Runbooks carry their own rollback. If verification after execution does not confirm a good state, the change reverses itself and the incident is handed to a person with the full trace attached.",
    meta: "Safety",
  },
  {
    title: "The loop improves itself",
    body: "Resolved incidents feed the correlation model and the runbook library. Coverage widens because the system earned it, not because someone raised the threshold.",
    meta: "Learning",
  },
];

const COVERAGE = [
  {
    title: "Infrastructure & platform",
    body: "Compute, storage, network and container estates across cloud and on-premises footprints, monitored as one surface rather than a set of consoles.",
  },
  {
    title: "Application operations",
    body: "Service health, dependency chains and release-correlated regressions — the failures that only make sense when you can see across tiers.",
  },
  {
    title: "Identity & access",
    body: "Entitlement drift, orphaned access and the joiner-mover-leaver work that quietly consumes an operations team.",
  },
  {
    title: "Data & integration",
    body: "Pipeline failures, schema drift and the silent partial successes that are worse than an outage because nothing alerts.",
  },
];

export default function AmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Autonomous Managed Services"
        title="Operations that"
        accent="resolve themselves."
        state="orchestration"
        lede="AMS is not monitoring with faster alerts. It is a closed loop: signals are correlated into events, cause is reasoned about against topology and history, policy decides whether autonomy acts, and remediation executes and verifies itself — with the evidence retained for every decision."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "#model", label: "See the operating model" }}
      />

      <StatRow
        items={[
          { value: "6", label: "Stages, signal to resolution" },
          { value: "24/7", label: "Operational readiness" },
          { value: "100%", label: "Decisions with audit lineage" },
          { value: "Reversible", label: "By design, every action" },
        ]}
      />

      <WorldSequence world={ams} />

      <SplitFeature
        id="detection"
        eyebrow="Signal & detection"
        heading="Noise is not a monitoring problem. It is a correlation problem."
        body="Most estates do not lack telemetry — they lack a layer that can tell which twelve alerts are one event. AMS ingests logs, traces, metrics, tickets and change records together, and treats correlation across those surfaces as the first real piece of work."
        points={[
          "Cross-surface correlation across infrastructure, application, identity and data",
          "Change-aware baselines so a deployment does not read as an incident",
          "Topology and dependency mapping maintained continuously, not annually",
          "Signal quality measured and reported as its own metric",
        ]}
        media={{ poster: "/images/dashboard.jpg", video: "/videos/ams-detection.mp4", caption: "Correlation across every enterprise surface." }}
        href={{ label: "How resolution closes the loop", url: "#resolution" }}
        accent="#4d7cff"
        tone="ink"
      />

      <SplitFeature
        id="resolution"
        eyebrow="Autonomous resolution"
        heading="The difference between a recommendation and a resolution."
        body="An alert that suggests a fix still costs a person their attention. AMS executes the runbook, verifies the resulting state against what it expected, and closes the incident — or reverses itself and escalates with the full reasoning attached."
        points={[
          "Runbooks execute in order across connected systems, with rollback built in",
          "Post-execution verification against expected state, not just exit codes",
          "Escalation carries the trace, so the human starts where the system stopped",
          "Every autonomous action is attributable, timestamped and replayable",
        ]}
        media={{ poster: "/images/automation.jpg", video: "/videos/ams-resolution.mp4", caption: "Execute, verify, close — or reverse and escalate." }}
        flip
        accent="#39d0d8"
      />

      <QuoteBand
        quote="Autonomy you cannot audit is not autonomy. It is an unattributed change."
        attribution="Nexxovate — AMS operating principles"
      />

      <Pillars
        id="model"
        eyebrow="Operating model"
        heading="How autonomy is governed, measured and scaled."
        items={OPERATING_MODEL.map(({ title, body }) => ({ title, body }))}
      />

      <IndexList
        eyebrow="Coverage"
        heading="Where AMS takes the load."
        intro="Autonomy is introduced one class of work at a time — beginning where the failure modes are best understood and the blast radius is smallest."
        rows={COVERAGE}
        tone="void"
      />

      <AutonomyCurve />

      <CTASection
        eyebrow="Start with one class of work"
        title="Show us the estate that costs you the most attention."
        body="We will map where autonomy is safe to introduce first, agree the authority boundary, and put a number on what gets measured before anything is automated."
        primary={{ href: "/contact", label: "Let's build the future" }}
        secondary={{ href: "/nexyra/os", label: "Explore Nexyra OS" }}
      />
    </>
  );
}
