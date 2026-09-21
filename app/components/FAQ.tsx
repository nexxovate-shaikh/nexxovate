import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import { Reveal } from "@/lib/motion";
import type { FaqItem } from "@/lib/content/faq";

/* ══════════════════════════════════════════════════════════════
   FAQ — questions and answers, with FAQPage structured data.

   Two jobs. For a visitor, it answers the questions people ask on a
   first call before they have to make one. For search and answer
   engines, the FAQPage JSON-LD marks each pair up explicitly — the
   audit's "Q&A-style content marked up" check — and the answers are
   plain text in the server HTML, which is what crawlers that do not
   run JavaScript can read.

   Native <details>: opens and closes with no JavaScript, works with
   a keyboard and a screen reader out of the box, and the answer text
   is in the HTML even while collapsed.

   Every answer is drawn from copy already on the site. Nothing here
   states a timeline, a price or a client that is not stated elsewhere.
   ══════════════════════════════════════════════════════════════ */

export default function FAQ({
  items,
  title = "Questions we",
  accent = "hear first",
}: {
  items: FaqItem[];
  title?: string;
  accent?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <Section band="dark" className="ground-orbit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Kicker>FAQ</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              {title} <Accent>{accent}</Accent>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="overflow-hidden rounded-[20px]"
              style={{
                border: "1px solid var(--color-line)",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-surface) 70%, transparent), transparent)",
              }}
            >
              {items.map((item, i) => (
                <details
                  key={item.q}
                  className="faq group"
                  style={i > 0 ? { borderTop: "1px solid var(--color-line)" } : undefined}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 md:px-8 md:py-6">
                    <span className="font-display text-[length:var(--text-h4)] font-semibold leading-snug">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[18px] leading-none text-[color:var(--color-champagne)] transition-transform duration-300 group-open:rotate-45"
                      style={{ border: "1px solid var(--color-line-lit)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[62ch] px-6 pb-6 text-[15.5px] leading-relaxed text-mute md:px-8 md:pb-7">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
