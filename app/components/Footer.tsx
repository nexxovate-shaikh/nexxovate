"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_GROUPS, LEGAL } from "@/lib/content/site";
import { Container } from "./ui";

/* ══════════════════════════════════════════════════════════════
   Footer.

   Built to the reference site's structure — a display statement
   held left, link columns right, then the wordmark and socials over
   a rule, then the legal row.

   The first attempt added three things theirs does not have: a
   descriptive paragraph, a solid champagne CTA button, and a mono
   tagline on the right of the legal row. All three are gone. The
   paragraph and the button pushed the statement off the top of the
   fold and made a footer read like a banner; the tagline sat
   underneath the chat launcher (fixed, bottom-right, 74px) and
   rendered as struck-through text. Nothing now occupies the bottom
   right corner of the page for that reason.

   No rules under the column heads and only ONE hairline in the
   whole footer, above the legal row — which is exactly where the
   reference puts its only rule. Three underlined headings turn
   three columns into three little tables; the space does the
   separating instead.

   What remains is theirs, done a little better:

   · IT SITS ON A ROUNDED PLATE. The page ends on the charcoal CTA;
     the footer lifts off it as a panel with rounded top corners
     rather than butting against it as another band. Theirs does the
     same trick in reverse (white card under dark page), and it is
     the single cheapest thing on this page that reads as expensive.

   · THE STATEMENT IS THE BRAND LINE, not a repeat of the CTA above
     it. "Amplifying AI intelligence" is Nexxovate's own tagline,
     already in the logo lockup; the footer is where a tagline
     belongs, said once, large, and left alone.

   · THE SOCIAL BUTTONS HAVE NAMES. Theirs are unlabelled grey
     circles — fine for a sighted mouse user, silent to everyone
     else. These carry a visible glyph AND an accessible name, and
     they are 44px, which is the minimum touch target rather than
     the 32px theirs uses.

   · THE COLUMN HEADS ARE SET AS LABELS. Theirs runs three unlabelled
     columns, so "Industries / iRun / iTransform" and "Brand /
     Company / Careers" read as one undifferentiated list of twelve.
     A heading per column turns the same links into a map.

   Every link resolves. The previous version of this file had
   href="#" on every item; these come from the same source as the
   nav and the sitemap, so the three cannot drift apart.
   ══════════════════════════════════════════════════════════════ */

/* LinkedIn and X are switched off: the site audit reported both
   URLs as dead on every page. When the company pages exist, put the
   real URLs back in and they render again — nothing else changes.
     { label: "LinkedIn", href: "https://www.linkedin.com/company/<handle>", short: "in" },
     { label: "X", href: "https://x.com/<handle>", short: "X" }, */
const SOCIAL = [
  { label: "GitHub", href: "https://github.com/nexxovate-shaikh", short: "GH" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-band="deep"
      className="relative -mt-6 overflow-hidden rounded-t-[28px] md:-mt-8 md:rounded-t-[40px]"
    >
      {/* A last, quiet echo of the hero field, and a champagne
          hairline along the very top edge so the plate reads as
          lifted rather than merely lighter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(217,174,99,0.5) 25%, rgba(217,174,99,0.5) 75%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 opacity-60"
        style={{
          background:
            "radial-gradient(800px 320px at 50% 100%, rgba(217,174,99,0.14), transparent 70%), radial-gradient(460px 220px at 50% 100%, rgba(201,209,218,0.08), transparent 72%)",
        }}
      />

      <Container className="py-16 md:py-20">
        {/* ── Statement + link columns ── */}
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <h2 className="font-display max-w-[11ch] text-[clamp(2.4rem,4.4vw,3.9rem)] font-semibold leading-[1.02]">
            Amplifying
            <br />
            <span style={{ color: "var(--color-champagne)" }}>
              AI intelligence
            </span>
          </h2>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono-label text-faint">
                  {group.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-[14.5px] text-mute transition-colors hover:text-text"
                      >
                        {/* A rule that grows from nothing on hover —
                            the whole hover state, no colour shift on
                            the row and no underline that reflows the
                            line box. */}
                        <span
                          aria-hidden="true"
                          className="h-px w-0 transition-[width] duration-300 ease-out group-hover:w-3"
                          style={{ background: "var(--color-champagne)" }}
                        />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ── Wordmark + socials ── */}
        <div className="mt-20 flex flex-col items-start justify-between gap-8 md:mt-24 md:flex-row md:items-center">
          <Link href="/" aria-label="Nexxovate home" className="shrink-0">
            <Image
              src="/logo-lockup.png"
              alt="Nexxovate — Amplifying AI Intelligence"
              width={472}
              height={118}
              className="h-[76px] w-auto object-contain md:h-[88px]"
            />
          </Link>

          <ul className="flex gap-3">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* 44px, not the 32px the reference uses: that is
                     the minimum comfortable touch target, and a
                     footer is exactly where a thumb ends up. */
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-semibold text-mute transition-colors hover:text-text"
                >
                  <span aria-hidden="true">{s.short}</span>
                  <span className="sr-only">
                    {s.label} — opens in a new tab
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Legal ──
            LEGAL carries only the pages that exist. Below two
            entries a legal row reads as an oversight rather than a
            row, so the copyright line stands alone until there are
            enough of them. See the note in lib/content/site.ts:
            an enterprise buyer's security review looks for a privacy
            statement, and there is not one yet. */}
        <div className="mt-10 border-t border-line pt-8">
          {/* All of it left-aligned, and the row stops well short of
              the right edge. The chat launcher is fixed at
              bottom-right at 74px; anything the footer puts there is
              a collision waiting for the moment someone scrolls to
              the bottom, which is the only moment this row is read. */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pr-24 text-[13px] text-faint">
            {LEGAL.length >= 2 &&
              LEGAL.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
            <p>© {year} Nexxovate. All rights reserved.</p>
          </div>
        </div>

      </Container>
    </footer>
  );
}
