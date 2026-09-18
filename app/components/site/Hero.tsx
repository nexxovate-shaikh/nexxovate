"use client";

/* ============================================================
   HERO
   A full-frame environment, not a split layout. The Nexus occupies
   the middle distance; typography sits in front of it; an index rail
   and a live telemetry readout hold the edges so the frame is
   composed at every breakpoint instead of drifting into empty space.
   ============================================================ */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { BRAND } from "@/lib/brand";
import { EASE, PrimaryLink, GhostLink } from "./primitives";

const HeroScene = dynamic(() => import("../webgl/HeroScene"), { ssr: false });

const INDEX_LINKS = [
  { label: "Autonomous Managed Services", short: "AMS", href: "/ams" },
  { label: "Nexyra OS", short: "OS", href: "/nexyra/os" },
  { label: "Nexyra AI Service Desk", short: "DESK", href: "/nexyra/service-desk" },
  { label: "Cybersecurity & Risk", short: "SEC", href: "/services#security" },
];

/* a small honest readout — it reports the page's own state, nothing more */
function Telemetry() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = [
    { k: "CORE", v: "ONLINE" },
    { k: "STATE", v: "ACTIVATION" },
    { k: "SESSION", v: `${String(Math.floor(uptime / 60)).padStart(2, "0")}:${String(uptime % 60).padStart(2, "0")}` },
  ];

  return (
    <div className="glass hidden w-[190px] rounded-2xl px-4 py-4 xl:block">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
        </span>
        <span className="font-mono-ui text-[0.58rem] tracking-[0.2em] text-white/45">
          NEXUS TELEMETRY
        </span>
      </div>

      <dl className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <div key={row.k} className="flex items-center justify-between gap-3">
            <dt className="font-mono-ui text-[0.58rem] tracking-[0.16em] text-white/28">
              {row.k}
            </dt>
            <dd className="font-mono-ui text-[0.62rem] tracking-[0.1em] text-electric-soft">
              {row.v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 h-px w-full bg-white/[0.08]" />

      <div className="mt-3 flex gap-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="h-4 w-[3px] rounded-full bg-electric/40"
            animate={{ scaleY: [0.25, 1, 0.4, 0.85, 0.3] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
            style={{ originY: 1 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const calm = useReducedMotion();

  return (
    <section className="grain vignette relative flex min-h-[100svh] items-center overflow-hidden bg-void">
      {/* ---- background + midground: the environment ---- */}
      <HeroScene state="activation" />

      {/* grade the frame so type always has a floor to sit on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(120%_80%_at_50%_50%,transparent_28%,rgba(5,6,10,0.72)_78%,rgba(5,6,10,0.95)_100%)]"
      />

      {/* ---- foreground ---- */}
      <div className="relative z-20 mx-auto w-full max-w-[1600px] px-6 pt-52 pb-36 md:px-10 md:pt-28">
        <div className="flex items-start justify-between gap-10">
          {/* left rail — editorial detail, holds the frame's edge */}
          <div className="hidden shrink-0 pt-2 xl:block">
            <div className="flex h-[420px] flex-col items-center justify-between">
              <span className="font-mono-ui text-[0.58rem] tracking-[0.2em] text-white/25">
                001
              </span>
              <span
                className="font-mono-ui text-[0.58rem] tracking-[0.32em] text-white/25"
                style={{ writingMode: "vertical-rl" }}
              >
                ENGINEERING THE AUTONOMOUS ENTERPRISE
              </span>
              <span className="h-16 w-px bg-gradient-to-b from-white/25 to-transparent" />
            </div>
          </div>

          {/* centre stack */}
          <div className="relative mx-auto max-w-4xl text-center">
            {/* a soft scrim so the object reads as depth behind the type,
                never as texture through it */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[50%] bg-[radial-gradient(closest-side,rgba(5,6,10,0.6)_0%,rgba(5,6,10,0.3)_60%,transparent_100%)] blur-2xl md:-inset-x-24 md:-inset-y-16 md:bg-[radial-gradient(closest-side,rgba(5,6,10,0.72)_0%,rgba(5,6,10,0.42)_58%,transparent_100%)]"
            />

            <motion.div
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25" />
              <span className="kicker">Autonomous Intelligence</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/25" />
            </motion.div>

            <motion.h1
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              className="display-hero mt-8"
            >
              <span className="block text-forge">Beyond automation.</span>
              <span className="mt-2 block text-spine">Into autonomy.</span>
            </motion.h1>

            <motion.p
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              className="lede mx-auto mt-9 text-center"
            >
              Nexxovate engineers enterprises that no longer wait to be operated.
              Signals resolve themselves, agents reason together, and the systems
              that run your business govern their own decisions — with the audit
              lineage to prove every one.
            </motion.p>

            <motion.div
              initial={calm ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.58 }}
              className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <PrimaryLink href="/contact" className="uppercase">
                {BRAND.cta}
              </PrimaryLink>
              <GhostLink href="/ams">Explore AMS</GhostLink>
            </motion.div>
          </div>

          {/* right rail — telemetry */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="hidden shrink-0 pt-2 xl:block"
          >
            <Telemetry />
          </motion.div>
        </div>
      </div>

      {/* ---- index bar ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        className="absolute inset-x-0 bottom-0 z-20 border-t border-white/[0.07] bg-[rgba(5,6,10,0.55)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1600px] items-stretch px-6 md:px-10">
          {INDEX_LINKS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-1 items-center gap-3 py-5 transition-colors duration-500 hover:bg-white/[0.03] ${
                i > 0 ? "border-l border-white/[0.07] pl-5" : ""
              }`}
            >
              <span className="font-mono-ui text-[0.58rem] tracking-[0.18em] text-white/25">
                0{i + 1}
              </span>
              <span className="hidden text-[0.8rem] font-medium text-mute transition-colors duration-400 group-hover:text-paper md:block">
                {item.label}
              </span>
              <span className="font-mono-ui text-[0.7rem] tracking-[0.14em] text-mute transition-colors duration-400 group-hover:text-paper md:hidden">
                {item.short}
              </span>
              <span
                className="ml-auto hidden text-white/20 transition-all duration-400 group-hover:translate-x-0.5 group-hover:text-electric-soft sm:block"
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ---- scroll cue ---- */}
      <div className="pointer-events-none absolute bottom-[104px] left-1/2 z-20 hidden -translate-x-1/2 lg:block">
        <div className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent via-electric to-transparent"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
