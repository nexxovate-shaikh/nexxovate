import type { Metadata } from "next";

import PageHero from "../components/site/PageHero";
import CTASection from "../components/site/CTASection";
import { IndexList } from "../components/site/blocks";

export const metadata: Metadata = {
  title: "Client Portal",
  description:
    "The Nexxovate client portal — engagement status, delivery reporting and operational insight for existing clients.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/client" },
};

export default function ClientPortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Client portal"
        title="Your engagement,"
        accent="in one place."
        state="orchestration"
        lede="Delivery status, operational reporting and the evidence behind every autonomous decision made on your estate. Portal access is provisioned per engagement — your delivery lead issues credentials."
        primary={{ href: "/contact", label: "Request access" }}
        secondary={{ href: "/ams", label: "Explore AMS" }}
      />

      <IndexList
        eyebrow="What the portal carries"
        heading="Everything your team asked us to prove."
        intro="Access is provisioned during onboarding. If you are an existing client and cannot get in, your delivery lead can reissue credentials."
        rows={[
          {
            title: "Delivery status",
            meta: "Live",
            body: "Milestones, owners and the current position against what was agreed — the same view we work from internally.",
          },
          {
            title: "Operational reporting",
            meta: "Continuous",
            body: "What the estate did, what closed inside policy, what escalated, and how quickly.",
          },
          {
            title: "Decision evidence",
            meta: "Audit",
            body: "The reasoning, action and outcome behind every autonomous decision, replayable and exportable.",
          },
          {
            title: "Commercials",
            meta: "Per engagement",
            body: "Invoices and consumption against the commercial model agreed for your engagement.",
          },
        ]}
        tone="ink"
      />

      <CTASection
        eyebrow="Access"
        title="Need portal access?"
        body="Existing clients should contact their delivery lead. If you are not sure who that is, we will route you."
        primary={{ href: "/contact", label: "Contact Nexxovate" }}
        secondary={{ href: "/about", label: "About us" }}
      />
    </>
  );
}
