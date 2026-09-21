import type { Metadata } from "next";
import { LegalShell } from "@/app/components/LegalShell";

export const metadata: Metadata = {
  title: "Responsible Disclosure of Security Issues",
  description:
    "How to report a security vulnerability in Nexxovate's website or products.",
};

export default function SecurityPage() {
  return (
    <LegalShell
      kicker="Security"
      title="Responsible disclosure"
    >
      <p>
        If you have found a security vulnerability in this website or in a
        Nexxovate product, we would rather hear about it from you than from
        someone else. We will not pursue legal action against anyone who reports
        a genuine issue in good faith and follows the guidance below.
      </p>

      <h2>How to report</h2>
      <ul>
        <li>Contact us with a description of the issue and how to reproduce it.</li>
        <li>
          Include the affected URL or product, and the impact you believe it has.
        </li>
        <li>
          Give us reasonable time to investigate and fix the issue before making
          it public.
        </li>
      </ul>

      <h2>Please do not</h2>
      <ul>
        <li>Access, modify or delete data that is not your own.</li>
        <li>
          Run automated scanning that degrades service for other users, or test
          denial-of-service.
        </li>
        <li>Use social engineering, phishing or physical attacks against staff.</li>
      </ul>

      <h2>What to expect</h2>
      <p>
        We will acknowledge your report, keep you informed while we investigate,
        and tell you when it is resolved. We do not currently operate a paid
        bounty programme.
      </p>

      {/* NOTE FOR NEXXOVATE — remove this paragraph once the address
          exists. A disclosure page whose only route is a marketing
          contact form is a disclosure page researchers will skip. */}
      <h2>In scope</h2>
      <ul>
        <li>This website, nexxovate.com, and its subdomains.</li>
        <li>
          The Nexyra products, including the website auditor at
          audit.nexxovate.com.
        </li>
      </ul>
      <h2>Where to send it</h2>
      <p>
        Email <a href="mailto:info@nexxovate.com?subject=Security">info@nexxovate.com</a>{" "}
        with <strong>Security</strong> in the subject line, or use the contact
        form and mark your message the same way. A machine-readable version of
        this policy is published at{" "}
        <a href="/.well-known/security.txt">/.well-known/security.txt</a>, so
        security tools can find the right contact automatically.
      </p>
    </LegalShell>
  );
}
