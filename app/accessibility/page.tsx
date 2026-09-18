import type { Metadata } from "next";
import { LegalShell } from "@/app/components/LegalShell";

/* Written from what is measurably true of this build, not from a
   template. Every number below was checked against the running
   site; the "known gaps" section exists because an accessibility
   statement that claims no gaps is not credible. */

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How nexxovate.com is built for accessibility, what has been verified, and what is still outstanding.",
};

export default function AccessibilityPage() {
  return (
    <LegalShell kicker="Accessibility" title="Accessibility statement">
      <p>
        Nexxovate aims to meet <strong>WCAG 2.1 Level AA</strong> across this
        website. This statement describes what has been implemented and
        verified, and what has not.
      </p>

      <h2>What has been verified</h2>
      <ul>
        <li>
          <strong>Colour contrast.</strong> Every text colour was measured
          against the exact background it sits on. Body text runs 7.4:1 or
          better and the lightest supporting text 4.6:1 — both above the 4.5:1
          minimum. Button fills were checked separately against the 3:1 floor
          for interface components.
        </li>
        <li>
          <strong>Keyboard access.</strong> All interactive elements are
          reachable and operable by keyboard, with a visible focus ring. A skip
          link is the first stop on every page. The product selector on the home
          page supports arrow keys, Home and End.
        </li>
        <li>
          <strong>Reduced motion.</strong> The site honours{" "}
          <code>prefers-reduced-motion</code>. Scroll animation, video playback,
          image drift and the pointer tilt all stop; the content stays complete
          and switches instantly instead of animating.
        </li>
        <li>
          <strong>Forms.</strong> Every field has a real, persistent{" "}
          <code>&lt;label&gt;</code> rather than a placeholder. Errors are tied
          to their field programmatically and announced.
        </li>
        <li>
          <strong>Touch targets.</strong> Footer and control buttons are at
          least 44&nbsp;&times;&nbsp;44&nbsp;px.
        </li>
      </ul>

      <h2>Known gaps</h2>
      <ul>
        <li>
          <strong>No independent audit.</strong> The checks above were carried
          out during development. This site has not been assessed by an external
          accessibility auditor or tested with assistive technology by disabled
          users. Those are the two things that would make this statement
          authoritative, and neither has happened yet.
        </li>
        <li>
          <strong>Background video.</strong> The clips on the home page are
          silent, decorative and hidden from assistive technology. They carry no
          information, so they have no captions.
        </li>
        <li>
          <strong>Third-party content.</strong> Embedded services may not meet
          the same standard.
        </li>
      </ul>

      <h2>Reporting a problem</h2>
      <p>
        If any part of this site is difficult or impossible for you to use,
        please tell us — including the page and what went wrong. We will respond
        and, where we can, fix it.
      </p>
    </LegalShell>
  );
}
