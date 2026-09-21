"use client";

import Link from "next/link";
import { Kicker, Button } from "@/app/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { AWARDS } from "@/lib/content/site";

/* ══════════════════════════════════════════════════════════════
   AWARDS & RECOGNITION

   The layout is the reference site's: an oversized headline held
   sticky on the left with one call to action under it, and the
   awards themselves in a two-column grid on the right that scrolls
   past it. It works because the claim stays on screen while the
   evidence goes by — you cannot read a card without the headline
   still in view telling you what the card is proving.

   Two things done better than the reference:

   · Their cards are a photographic texture behind white type, and
     the contrast lands wherever the texture happens to be light.
     These draw the texture in CSS, so it is always darkest exactly
     where the title sits, and it costs no bytes and no requests.
   · Their whole card is a link with a "Read more" affordance drawn
     inside it, which screen readers announce twice. Here the card
     is one link with one accessible name.

   AWARDS is empty, so this component renders nothing at all — no
   placeholder, no "coming soon". I will not invent awards, analyst
   placements, certifications or partner tiers; an invented one is
   checkable in about thirty seconds and fatal in procurement. Add
   entries to AWARDS in lib/content/site.ts — title, issuer, year —
   and this whole band appears.
   ══════════════════════════════════════════════════════════════ */

/* Four textures, one per card position, drawn rather than loaded.
   The sweep angle changes per index so a 2x2 grid does not read as
   the same tile printed four times. */
function texture(i: number) {
  const angle = [118, 62, 152, 28][i % 4];
  const warm = i % 2 === 0 ? "rgba(217,174,99,0.20)" : "rgba(201,209,218,0.14)";
  return {
    background: `
      radial-gradient(120% 90% at ${i % 2 ? "85%" : "15%"} 8%, ${warm}, transparent 58%),
      linear-gradient(${angle}deg, rgba(126,147,172,0.10), transparent 55%),
      linear-gradient(to top, rgba(10,11,13,0.95) 22%, rgba(10,11,13,0.35) 70%),
      #101214
    `,
  };
}

export default function Awards() {
  /* Nothing ships until there is something true to ship. The
     Recognition band still stands on its partners and its client
     quotes, both of which are real; the awards grid simply is not
     there until AWARDS has entries. A "coming soon" panel on a live
     site is worse than an absence — it advertises the gap. */
  if (AWARDS.length === 0) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-16">
      {/* The claim, held in place while the evidence scrolls. */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <Kicker>Recognition</Kicker>
          <h2 className="font-display mt-6 text-[length:var(--text-display)] font-semibold leading-[0.95]">
            We are
            {" "}<br />
            industry
            {" "}<br />
            recognised
          </h2>

          <div className="mt-9">
            <Button href="/about#recognition">See all awards</Button>
          </div>
        </Reveal>
      </div>

      <Stagger className="grid gap-5 sm:grid-cols-2">
        {AWARDS.map((award, i) => {
          const inner = (
            <>
              <span
                aria-hidden="true"
                className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                style={texture(i)}
              />
              <span className="relative flex h-full flex-col">
                <span className="font-mono-label tabular-nums text-[color:var(--color-champagne)]">
                  {award.year}
                </span>
                <span className="font-display mt-5 flex-1 text-[length:var(--text-h4)] font-semibold leading-snug text-text">
                  {award.title}
                </span>
                <span className="mt-8 text-[13.5px] text-mute">{award.issuer}</span>
                {award.href && (
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-2 text-[14px] text-text"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    Read more
                  </span>
                )}
              </span>
            </>
          );

          const shell =
            "group relative flex min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-line p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-lit md:p-8";

          return (
            <StaggerItem key={`${award.title}-${award.year}`}>
              {award.href ? (
                <Link href={award.href} className={shell}>
                  {inner}
                </Link>
              ) : (
                <div className={shell}>{inner}</div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
