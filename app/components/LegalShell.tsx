import type { ReactNode } from "react";
import Link from "next/link";
import { Section, Container, Kicker } from "@/app/components/ui";

/* ══════════════════════════════════════════════════════════════
   Shell for the footer's legal pages.

   These exist because the footer row that links to them exists.
   The alternative was seven links to 404s, which is worse than no
   row at all — a broken privacy link is the first thing a security
   reviewer clicks and the first thing they write down.

   Each page carries a `status`:

     "live"    the content is factual and complete, written from
               what is actually true of this build.
     "interim" the page states what is factually true and says
               plainly that the formal policy is with your legal
               team. It is not a policy and does not pretend to be.

   I have written the two that are statements of fact about how
   this site works. I have NOT drafted the two that are legal
   instruments — a privacy statement and an AI policy carry
   obligations, and those are for a lawyer, not for me.
   ══════════════════════════════════════════════════════════════ */

export function LegalShell({
  kicker,
  title,
  status = "live",
  updated,
  children,
}: {
  kicker: string;
  title: string;
  status?: "live" | "interim";
  /** Only set this when the content genuinely changed. */
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Section band="dark" zone="infrastructure" className="!pt-[128px] !pb-10">
        <Container>
          <Kicker>{kicker}</Kicker>
          <h1 className="font-display mt-6 max-w-[16ch] text-[length:var(--text-display)] font-semibold">
            {title}
          </h1>
          {updated && (
            <p className="mt-6 text-[14px] text-faint">Last updated {updated}</p>
          )}
        </Container>
      </Section>

      <Section band="deep" zone="ai">
        <Container>
          {status === "interim" && (
            <div
              className="mb-10 rounded-[16px] border-2 border-dashed p-6 md:p-7"
              style={{ borderColor: "var(--color-line-lit)" }}
            >
              <p className="font-mono-label text-[color:var(--color-champagne)]">
                Interim notice — not yet a policy
              </p>
              <p className="mt-4 max-w-3xl leading-relaxed text-mute">
                What follows is a factual description of how this website
                works. It is <span className="text-text">not</span> a legal
                policy and should not be read as one. The formal statement is
                with Nexxovate&apos;s legal advisers; until it is published,
                this page exists so that the link in the footer goes somewhere
                honest rather than nowhere.
              </p>
            </div>
          )}

          {/* max-w-[68ch]: past about 75 characters a line of body text
              gets measurably harder to track back from. */}
          <div className="max-w-[68ch] [&_a]:text-text [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:mt-12 [&_h2]:text-[length:var(--text-h3)] [&_h2]:font-semibold [&_h2:first-child]:mt-0 [&_li]:mt-2.5 [&_li]:leading-relaxed [&_li]:text-mute [&_p]:mt-5 [&_p]:leading-relaxed [&_p]:text-mute [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>

          <p className="mt-14 border-t border-line pt-8 text-[14px] text-mute">
            Questions about this page?{" "}
            <Link
              href="/contact"
              className="text-text underline underline-offset-4"
            >
              Get in touch
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
