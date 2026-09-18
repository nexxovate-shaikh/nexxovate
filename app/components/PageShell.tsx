"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem, MaskText, EASE } from "@/lib/motion";
import { Section, Container, Kicker, Accent, Button } from "./ui";
import type { Offer } from "@/lib/content/pages";

/* ══════════════════════════════════════════════════════════════
   Shared inner-page furniture.

   Every non-home page is built from these four blocks, so the
   Services, Talent, Training, About and Insights pages cannot
   drift into separate visual systems the way the previous site's
   did — that drift is exactly what left three competing designs
   shipping at once.
   ══════════════════════════════════════════════════════════════ */

/* ── Hero ───────────────────────────────────────────────────── */

/**
 * The same contained media panel as the home page, with a still
 * image instead of video. Margin on all four sides is the device
 * that makes it read as a composed object rather than wallpaper.
 */
export function PageHero({
  kicker,
  lines,
  intro,
  image,
  alt,
  cta,
  ctaLabel,
  zone = "infrastructure",
}: {
  kicker: string;
  lines: React.ReactNode[];
  intro: string;
  image: string;
  alt: string;
  cta?: string;
  ctaLabel?: string;
  zone?: "infrastructure" | "ai" | "security" | "transformation";
}) {
  return (
    <Section zone={zone} band="dark" className="!pt-[88px] !pb-14 md:!pb-18">
      <Container className="pb-10 pt-4 md:pb-12 md:pt-6">
        <div className="relative isolate overflow-hidden rounded-[20px] md:rounded-[28px]">
          <div className="relative min-h-[440px] md:min-h-[520px]">
            <Image
              src={image}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/92 via-ink/60 to-ink/25" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

            <div className="relative flex min-h-[440px] flex-col justify-end p-7 sm:p-10 md:min-h-[520px] md:p-14">
              <Kicker>{kicker}</Kicker>

              <MaskText
                as="h1"
                className="font-display mt-6 max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)] font-semibold"
                delay={0.1}
                lines={lines}
              />

              <Reveal delay={0.35}>
                <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] leading-relaxed text-mute">
                  {intro}
                </p>
              </Reveal>

              {cta && ctaLabel && (
                <Reveal delay={0.45}>
                  <div className="mt-9">
                    <Button href={cta}>{ctaLabel}</Button>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── Section heading ────────────────────────────────────────── */

export function SectionHead({
  kicker,
  title,
  accent,
  intro,
  action,
  actionLabel,
}: {
  kicker: string;
  title: string;
  accent?: string;
  intro?: string;
  action?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-10 grid gap-8 md:mb-9 md:mb-10 md:grid-cols-2 md:items-end">
      <Reveal>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
          {title} {accent && <Accent>{accent}</Accent>}
        </h2>
      </Reveal>

      {(intro || action) && (
        <Reveal delay={0.1}>
          <div className="md:text-right">
            {intro && (
              <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md">
                {intro}
              </p>
            )}
            {action && actionLabel && (
              <div className="mt-6">
                <Button href={action} variant="quiet">
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ── Offer grid ─────────────────────────────────────────────── */

/**
 * The image tiles. The previous pages showed a title over a photo
 * and nothing else, which is why they read as brochure filler —
 * every tile here carries copy that says what the thing actually
 * is.
 */
export function OfferGrid({ offers }: { offers: Offer[] }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer, i) => (
        <StaggerItem key={offer.title}>
          <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-ink-2 transition-colors duration-500 hover:border-line-lit">
            <div className="relative h-[190px] overflow-hidden">
              <Image
                src={offer.img}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-70 transition-[transform,opacity] duration-[1100ms] ease-out group-hover:scale-[1.04] group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
              <span className="font-mono-label absolute left-6 top-5 tabular-nums text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <h3 className="font-display text-[length:var(--text-h4)] font-semibold">
                {offer.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.4px] leading-relaxed text-mute">
                {offer.desc}
              </p>
              <span
                className="mt-6 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{
                  background:
                    "linear-gradient(90deg, var(--zone), var(--zone-2), transparent)",
                }}
                aria-hidden="true"
              />
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ── Proof list ─────────────────────────────────────────────── */

export function ProofList({
  kicker,
  title,
  accent,
  points,
  image,
  alt,
}: {
  kicker: string;
  title: string;
  accent?: string;
  points: string[];
  image: string;
  alt: string;
}) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <Reveal>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-display mt-6 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold">
          {title} {accent && <Accent>{accent}</Accent>}
        </h2>

        <ul className="mt-10 flex flex-col">
          {points.map((point, i) => (
            <li
              key={point}
              className="flex gap-5 border-b border-line py-5 first:border-t"
            >
              <span className="font-mono-label shrink-0 tabular-nums text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-relaxed text-mute">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-line">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        </div>
      </Reveal>
    </div>
  );
}

/* ── Closing CTA ────────────────────────────────────────────── */

export function PageCTA({
  title,
  accent,
  intro,
  href = "/contact",
  label = "Start the conversation",
}: {
  title: string;
  accent?: string;
  intro: string;
  href?: string;
  label?: string;
}) {
  return (
    <Section zone="transformation" band="dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 380px at 50% 115%, rgba(217,174,99,0.18), transparent 68%)",
        }}
      />
      <Container className="text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)] font-semibold">
            {title} {accent && <Accent>{accent}</Accent>}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-mute">
            {intro}
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={href}>{label}</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export { EASE };
