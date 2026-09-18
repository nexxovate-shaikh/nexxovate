"use client";

import Link from "next/link";
import { Section, Container, Kicker, Button } from "@/app/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { UPDATES } from "@/lib/content/site";

/* ══════════════════════════════════════════════════════════════
   UPDATES & ANNOUNCEMENTS

   The reference site puts this third on the page, and the reason
   is not editorial — it is commercial. An enterprise buyer scans a
   vendor's home page for evidence that the company is currently
   operating: a dated item from last month does that in one glance,
   and nothing else on a home page does it at all.

   Three marks carry the whole effect, and all three are easy to
   leave out:

   · the DATE, formatted from an ISO string rather than typed, so
     it cannot quietly go stale in a different format to its
     neighbours — optional, and absent until real publication dates
     exist, because a wrong one is worse than none;
   · the READ TIME, which is what makes a row of links feel like a
     newsroom rather than a nav menu;
   · the KIND — Insight, Press release, Video — set in the mono
     label, so the eye can sort the rail before reading a word.

   The band removes itself when there is nothing to show. An empty
   newsroom is worse than no newsroom.
   ══════════════════════════════════════════════════════════════ */

const fmt = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

export default function Updates() {
  if (UPDATES.length === 0) return null;

  return (
    <Section zone="ai" band="dark">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <Reveal>
            <Kicker>Newsroom</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              Updates and announcements
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Button href="/insights" variant="quiet">
              View all
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line md:grid-cols-3">
          {UPDATES.map((item) => (
            <StaggerItem key={item.href} className="bg-ink">
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors duration-500 hover:bg-surface md:p-9"
              >
                <div>
                  <span className="font-mono-label text-[color:var(--zone-2)]">
                    {item.kind}
                  </span>

                  <h3 className="font-display mt-6 text-[length:var(--text-h4)] font-semibold leading-snug">
                    {item.title}
                  </h3>

                </div>

                <div className="flex items-center gap-3 text-[13px] text-faint">
                  {/* The date prints only when there is a real one.
                      A newsroom stamped with a made-up month is
                      checkable, and a stale one argues that nothing
                      has happened since — worse than no date at all. */}
                  {item.date && (
                    <>
                      <time dateTime={item.date} className="tabular-nums">
                        {fmt.format(new Date(item.date))}
                      </time>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span className="tabular-nums">{item.minutes} min read</span>
                  <span
                    aria-hidden="true"
                    className="ml-auto transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
