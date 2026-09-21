import type { Metadata } from "next";
import { LegalShell } from "@/app/components/LegalShell";

/* ══════════════════════════════════════════════════════════════
   Terms of use — INTERIM.

   Added because the Nexyra Auditor report lists "Terms / legal page
   exists" as outstanding, and because a site that takes enquiries
   and runs an AI concierge should have one.

   This page does NOT contain terms. Terms of use are a contract:
   they allocate liability, set governing law and a jurisdiction for
   disputes, and limit what a visitor may rely on. Those are
   decisions for Nexxovate and its legal advisers, and writing them
   here on their behalf would be worse than having none — a clause
   that reads authoritatively and is wrong is a clause someone can
   hold you to.

   So this uses the same `interim` status as the privacy and AI
   policy pages: it states plainly what is true of the site today,
   says the formal terms are pending, and gives a contact. When the
   real text arrives, replace the body and drop status="interim".
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Terms of Use for This Website",
  description:
    "Terms governing use of nexxovate.com. Interim notice while the formal terms are finalised.",
};

export default function TermsPage() {
  return (
    <LegalShell kicker="Legal" title="Terms of use" status="interim">
      <h2>What this site is</h2>
      <p>
        nexxovate.com is the website of Nexxovate. It describes the services
        we provide and the Nexyra products, and lets you send us an
        enquiry or talk to the Nexyra concierge.
      </p>

      <h2>Information on this site</h2>
      <p>
        We describe our products and services as accurately as we can, but
        the pages here are general information, not a proposal or an offer.
        What we will actually deliver for your organisation is set out in a
        written agreement between us, and that agreement governs if the two
        ever differ.
      </p>

      <h2>The Nexyra concierge</h2>
      <p>
        The concierge is an AI assistant. It can be wrong, and nothing it
        says is a commitment on our behalf. Please do not share passwords,
        payment details or other sensitive information with it. How we
        handle what you do share is described in the{" "}
        <a href="/privacy">privacy notice</a> and the{" "}
        <a href="/ai-policy">AI policy</a>.
      </p>

      <h2>Formal terms</h2>
      <p>
        The formal terms of use — covering liability, intellectual property,
        governing law and disputes — are being finalised with our legal
        advisers and will replace this notice. If you need them before then,
        for example for a procurement review,{" "}
        <a href="/contact">contact us</a> and we will send what applies.
      </p>
    </LegalShell>
  );
}
