"use client";

/* ============================================================
   Supporting homepage movements: the positioning statement, the
   autonomy curve, and the client / insight proof band.
   ============================================================ */

import Image from "next/image";
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

/* ------------------------------------------------------------
   MANIFESTO
   One idea, given room. The pull-quote does the work; the three
   supporting notes give it structure without turning into cards.
------------------------------------------------------------ */

const NOTES = [
  {
    k: "Automation waits",
    v: "It executes what someone already decided, exactly as they decided it. The moment reality differs, it stops and asks.",
  },
  {
    k: "Autonomy decides",
    v: "It establishes cause, weighs the options against policy, acts inside its authority — and escalates when it should.",
  },
  {
    k: "Governance proves it",
    v: "Every autonomous decision carries its evidence, its authority and its outcome. Autonomy without that is just risk.",
  },
];

export function Manifesto() {
  const calm = useReducedMotion();

  return (
    <Section tone="void" className="border-t border-white/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-electric/45 to-transparent"
      />

      <Shell width="wide">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Kicker index="00">The position</Kicker>

            <motion.blockquote
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: EASE }}
              className="mt-8"
            >
              <p className="display-xl max-w-[19ch] text-paper">
                Most enterprises have{" "}
                <span className="text-white/35">automated</span> the work.
                Very few have made it{" "}
                <span className="text-spine">autonomous.</span>
              </p>
            </motion.blockquote>

            <Reveal delay={0.12}>
              <p className="lede mt-9">
                The distance between those two words is where the operating cost
                still lives — in the escalations, the handovers, the shift that
                waits for a decision only a person is allowed to make. Closing
                it is the whole of our work.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Stagger className="space-y-px">
              {NOTES.map((note, i) => (
                <StaggerItem key={note.k}>
                  <div className="group relative border-t border-white/[0.09] py-7 transition-colors duration-500 hover:border-white/20">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-ui text-[0.6rem] tracking-[0.18em] text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display-md text-paper">{note.k}</h3>
                    </div>
                    <p className="mt-3 max-w-[46ch] pl-[2.1rem] text-[0.88rem] leading-relaxed text-faint">
                      {note.v}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   AUTONOMY CURVE
   Six horizons on one rail. Deliberately not a chart — it is a
   scale a reader can place themselves on.
------------------------------------------------------------ */

const CURVE = [
  { stage: "Monitored", note: "You are told what happened." },
  { stage: "Alerted", note: "You are told it matters." },
  { stage: "Assisted", note: "You are told what to do." },
  { stage: "Automated", note: "The known path runs itself." },
  { stage: "Autonomous", note: "The system decides and acts." },
  { stage: "Self-governing", note: "It improves its own policy." },
];

export function AutonomyCurve() {
  return (
    <Section tone="graphite" className="border-t border-white/[0.06]">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[60vmax] w-[80vmax] -translate-x-1/2 rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(226,193,136,0.09) 0%, rgba(77,124,255,0.1) 40%, transparent 68%)",
        }}
      />

      <Shell width="full">
        <div className="max-w-2xl">
          <Kicker tone="gold">The autonomy curve</Kicker>
          <h2 className="display-lg mt-6 text-paper">
            Six horizons. Most estates stall at four.
          </h2>
          <p className="lede mt-6">
            Autonomy is not a switch. It is a curve an estate climbs one class
            of work at a time — and knowing exactly where you sit is what makes
            the next step safe.
          </p>
        </div>

        {/* the rail */}
        <div className="relative mt-16 overflow-x-auto pb-4">
          <div className="min-w-[860px]">
            <div className="relative h-px w-full bg-white/[0.1]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric via-violet-core to-gold"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.8, ease: EASE }}
              />
            </div>

            <div className="grid grid-cols-6">
              {CURVE.map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
                  className="relative pr-6 pt-8"
                >
                  <span
                    className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full"
                    style={{
                      background:
                        i < 4 ? "#4d7cff" : i === 4 ? "#7a5cff" : "#e2c188",
                      boxShadow: `0 0 16px ${
                        i < 4 ? "#4d7cff" : i === 4 ? "#7a5cff" : "#e2c188"
                      }`,
                    }}
                  />
                  <p className="font-mono-ui text-[0.6rem] tracking-[0.18em] text-white/28">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2.5 font-display text-lg font-semibold tracking-[-0.02em] text-paper">
                    {item.stage}
                  </h3>
                  <p className="mt-2 max-w-[20ch] text-[0.8rem] leading-relaxed text-faint">
                    {item.note}
                  </p>
                  {i >= 4 && (
                    <span className="mt-3 inline-block rounded-full border border-gold/30 px-2.5 py-1 font-mono-ui text-[0.55rem] tracking-[0.14em] text-gold">
                      NEXXOVATE TERRITORY
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ArrowLink href="/ams">See how AMS climbs the curve</ArrowLink>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   PROOF: clients + a route into the writing
------------------------------------------------------------ */

export function ClientProof() {
  return (
    <Section tone="void" tight className="border-t border-white/[0.06]">
      <Shell width="full">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Kicker>Trusted by</Kicker>
            <p className="mt-5 max-w-[26ch] font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper">
              Organizations that cannot afford an operational surprise.
            </p>
            <div className="mt-7">
              <ArrowLink href="/case-studies">Read the case studies</ArrowLink>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent"
              />
              <Image
                src="/images/clients.png"
                alt="Client organizations working with Nexxovate"
                width={1400}
                height={280}
                className="h-auto w-full opacity-60 mix-blend-luminosity transition-opacity duration-700 hover:opacity-85"
              />
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------
   INSIGHTS TEASER
------------------------------------------------------------ */

const NOTES_INDEX = [
  {
    tag: "Operating model",
    title: "What has to be true before autonomy is safe",
    href: "/insights",
  },
  {
    tag: "Service desk",
    title: "Why understanding, not routing, is the hard part",
    href: "/insights",
  },
  {
    tag: "Architecture",
    title: "Memory, knowledge and the limits of a prompt",
    href: "/insights",
  },
];

export function InsightsTeaser() {
  return (
    <Section tone="ink" className="border-t border-white/[0.06]">
      <Shell width="full">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Kicker>Insights</Kicker>
            <h2 className="display-lg mt-6 max-w-[16ch] text-paper">
              What we are learning, written down.
            </h2>
          </div>
          <ArrowLink href="/insights">All insights</ArrowLink>
        </div>

        <Stagger className="mt-14 grid gap-px border-t border-white/[0.09] md:grid-cols-3">
          {NOTES_INDEX.map((note, i) => (
            <StaggerItem key={note.title}>
              <Link
                href={note.href}
                className={`group flex h-full flex-col justify-between p-8 transition-colors duration-500 hover:bg-white/[0.02] ${
                  i > 0 ? "md:border-l md:border-white/[0.09]" : ""
                }`}
              >
                <div>
                  <p className="font-mono-ui text-[0.6rem] uppercase tracking-[0.18em] text-electric-soft">
                    {note.tag}
                  </p>
                  <h3 className="mt-5 max-w-[22ch] font-display text-xl font-medium leading-snug tracking-[-0.02em] text-paper">
                    {note.title}
                  </h3>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-[0.78rem] text-faint transition-colors duration-400 group-hover:text-paper">
                  Read
                  <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Shell>
    </Section>
  );
}
