import type { Metadata } from "next";
import { LegalShell } from "@/app/components/LegalShell";

/* ⚠️ NEXXOVATE — READ THIS BEFORE LAUNCH.

   This is NOT a privacy policy and it is marked as such on the page.
   A privacy statement is a legal instrument: it makes commitments
   about lawful basis, retention periods, international transfers,
   sub-processors and data-subject rights. Those are for your legal
   advisers to write, not for me to invent.

   What is below is the part I can state truthfully: exactly what
   this website collects and where it goes, read off the code. That
   is genuinely useful to a reviewer and it is all verifiable — but
   it does not discharge your obligations under GDPR, the DPDP Act
   or any other regime. Get the real statement written. */

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What nexxovate.com collects and where it goes, pending publication of the full privacy statement.",
};

export default function PrivacyPage() {
  return (
    <LegalShell kicker="Privacy" title="Privacy" status="interim">
      <h2>What this website collects</h2>
      <p>
        There are two places on this site where you can give us information, and
        both are things you choose to do:
      </p>
      <ul>
        <li>
          <strong>The enquiry form.</strong> Your name, work email, an optional
          company name, and the message you write. The page you sent it from and
          the time are recorded with it.
        </li>
        <li>
          <strong>The Nexyra concierge.</strong> Whatever you type into the chat,
          and any contact details you provide there.
        </li>
      </ul>

      <h2>Where it goes</h2>
      <p>
        Enquiries are stored in a spreadsheet maintained by Nexxovate and emailed
        to the Nexxovate inbox. They are used to respond to you and to keep track
        of the conversation. Your details are not sold.
      </p>

      <h2>What is not yet documented here</h2>
      <p>
        This page does not yet state retention periods, lawful basis, the full
        list of sub-processors, international transfer arrangements, or how to
        exercise your rights of access, correction and erasure. Those belong in
        the formal statement, which is in preparation.
      </p>
      <p>
        In the meantime, if you want to know what we hold about you, or want it
        deleted, contact us and we will act on it.
      </p>
    </LegalShell>
  );
}
