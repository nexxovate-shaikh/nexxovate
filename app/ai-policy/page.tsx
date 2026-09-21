import type { Metadata } from "next";
import { LegalShell } from "@/app/components/LegalShell";

/* ⚠️ Same caveat as /privacy: this states how AI is used on the
   site, which is factual and checkable. It does not make the
   governance commitments a published AI policy makes — those need
   your legal and security sign-off. */

export const metadata: Metadata = {
  title: "Responsible AI Policy: How We Use AI",
  description:
    "How AI is used on nexxovate.com, pending publication of the full AI policy.",
};

export default function AiPolicyPage() {
  return (
    <LegalShell kicker="Responsible AI" title="How we use AI" status="interim">
      <h2>On this website</h2>
      <ul>
        <li>
          <strong>The Nexyra concierge</strong> is an AI assistant. It answers
          questions about Nexxovate&apos;s services and can take your details so
          someone can follow up. It is not a human, and it is labelled as an
          assistant wherever it appears.
        </li>
        <li>
          <strong>It can be wrong.</strong> Anything it tells you about pricing,
          timelines or capability should be confirmed with a person before you
          rely on it.
        </li>
        <li>
          <strong>A person is always available.</strong> Every page offers a
          route to a human through the contact form.
        </li>
      </ul>

      <h2>Imagery</h2>
      <p>
        Some photography and video on this site is AI-generated and used to
        illustrate the kind of work described. It does not depict Nexxovate
        clients, staff, premises or real engagements. The dashboard-style
        panels on the services pages are designed illustrations of what each
        service produces; the figures in them are examples, not client
        results.
      </p>

      <h2>What is not yet documented here</h2>
      <p>
        This page does not yet set out model governance, human-oversight
        thresholds, evaluation and bias testing, or how AI is used in delivery
        for clients. Those belong in the formal policy, which is in preparation.
      </p>

      <h2>Questions</h2>
      <p>
        If you have a question about how AI is used on this site or in our
        products, email info@nexxovate.com or use the contact form, and a
        person will reply.
      </p>
    </LegalShell>
  );
}
