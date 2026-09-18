"use client";

/* ============================================================
   Content blocks shared across interior pages.
   Editorial rows and split features rather than card grids — the
   same rhythm everywhere so the site reads as one publication.
   ============================================================ */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowLink,
  EASE,
  Kicker,
  Reveal,
  Section,
  Shell,
  Stagger,
  StaggerItem,
} from "./primitives";
import CurvedMedia from "./CurvedMedia";

/* ------------------------------------------------------------
   INDEX LIST — numbered editorial rows
------------------------------------------------------------ */

export type IndexRow = {
  title: string;
  body: string;
  href?: string;
  meta?: string;
};

export function IndexList({
  eyebrow,
  heading,
  intro,
  rows,
  id,
  tone = "void",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  rows: IndexRow[];
  id?: string;
  tone?: "void" | "ink" | "graphite";
}) {
  return (
    <Section id={id} tone={tone} className="border-t border-white/[0.06]">
      <Shell width="full">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Kicker>{eyebrow}</Kicker>
              <h2 className="display-lg mt-6 max-w-[15ch] text-paper">{heading}</h2>
              {intro && <p className="body-copy mt-6 max-w-[42ch]">{intro}</p>}
            </div>
          </div>

          <div className="lg:col-span-8">
            <Stagger className="border-t border-white/[0.09]">
              {rows.map((row, i) => {
                const inner = (
                  <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-8 md:grid-cols-[4rem_1fr] md:gap-x-6">
                    <span className="font-mono-ui text-[0.62rem] tracking-[0.18em] text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="display-md text-paper">{row.title}</h3>
                        {row.meta && (
                          <span className="font-mono-ui text-[0.6rem] uppercase tracking-[0.16em] text-electric-soft">
                            {row.meta}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-[58ch] text-[0.9rem] leading-relaxed text-faint">
                        {row.body}
                      </p>
                      {row.href && (
                        <span className="mt-4 inline-flex items-center gap-2 text-[0.8rem] text-electric-soft">
                          Explore
                          <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                            →
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                );

                return (
                  <StaggerItem key={row.title}>
                    {row.href ? (
                      <Link
                        href={row.href}
                        className="group block border-b border-white/[0.09] transition-colors duration-500 hover:bg-white/[0.02]"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="border-b border-white/[0.09]">{inner}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   SPLIT FEATURE — narrative beside a curved display
------------------------------------------------------------ */

export function SplitFeature({
  eyebrow,
  heading,
  body,
  points,
  media,
  href,
  flip = false,
  accent = "#4d7cff",
  id,
  tone = "void",
}: {
  eyebrow: string;
  heading: string;
  body: string;
  points?: string[];
  media: { poster: string; video?: string; label?: string; caption?: string };
  href?: { label: string; url: string };
  flip?: boolean;
  accent?: string;
  id?: string;
  tone?: "void" | "ink" | "graphite";
}) {
  return (
    <Section id={id} tone={tone} className="border-t border-white/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 h-[54vmax] w-[54vmax] rounded-full opacity-40 blur-[140px]"
        style={{
          background: `radial-gradient(circle, ${accent}22 0%, transparent 66%)`,
          [flip ? "left" : "right"]: "-16vmax",
        }}
      />

      <Shell width="full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
            <Kicker>{eyebrow}</Kicker>
            <Reveal>
              <h2 className="display-lg mt-6 max-w-[15ch] text-paper">{heading}</h2>
              <p className="body-copy mt-6 max-w-[48ch]">{body}</p>

              {points && (
                <ul className="mt-8 space-y-3.5">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3.5">
                      <span
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                      />
                      <span className="text-[0.88rem] leading-relaxed text-mute">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {href && (
                <div className="mt-9">
                  <ArrowLink href={href.url}>{href.label}</ArrowLink>
                </div>
              )}
            </Reveal>
          </div>

          <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            <CurvedMedia
              poster={media.poster}
              video={media.video}
              accent={accent}
              label={media.label ?? eyebrow}
              caption={media.caption}
              flip={flip}
            />
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   PILLARS — three or four principles, hairline separated
------------------------------------------------------------ */

export function Pillars({
  eyebrow,
  heading,
  items,
  tone = "ink",
  id,
}: {
  eyebrow: string;
  heading: string;
  items: { title: string; body: string }[];
  tone?: "void" | "ink" | "graphite";
  id?: string;
}) {
  return (
    <Section id={id} tone={tone} className="border-t border-white/[0.06]">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />

      <Shell width="full">
        <div className="max-w-2xl">
          <Kicker tone="gold">{eyebrow}</Kicker>
          <h2 className="display-lg mt-6 text-paper">{heading}</h2>
        </div>

        <Stagger
          className={`mt-14 grid gap-px border-t border-white/[0.09] ${
            items.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {items.map((item, i) => (
            <StaggerItem key={item.title}>
              <div
                className={`h-full p-8 ${
                  i > 0 ? "md:border-l md:border-white/[0.09]" : ""
                }`}
              >
                <span className="font-mono-ui text-[0.6rem] tracking-[0.18em] text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-md mt-4 text-paper">{item.title}</h3>
                <p className="mt-3.5 text-[0.88rem] leading-relaxed text-faint">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   QUOTE BAND — one idea, given the whole frame
------------------------------------------------------------ */

export function QuoteBand({
  quote,
  attribution,
  tone = "graphite",
}: {
  quote: string;
  attribution?: string;
  tone?: "void" | "ink" | "graphite";
}) {
  const calm = useReducedMotion();

  return (
    <Section tone={tone} tight className="border-t border-white/[0.06]">
      <Shell width="wide">
        <motion.blockquote
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="display-lg text-forge">{quote}</p>
          {attribution && (
            <footer className="mt-7 font-mono-ui text-[0.62rem] uppercase tracking-[0.2em] text-white/30">
              {attribution}
            </footer>
          )}
        </motion.blockquote>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   STAT ROW
------------------------------------------------------------ */

export function StatRow({
  items,
  tone = "void",
}: {
  items: { value: string; label: string }[];
  tone?: "void" | "ink" | "graphite";
}) {
  return (
    <Section tone={tone} tight className="border-t border-white/[0.06]">
      <Shell width="full">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="border-l border-white/[0.09] pl-5">
                <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-spine md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-3 max-w-[20ch] font-mono-ui text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-white/35">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
