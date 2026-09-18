"use client";

/* ============================================================
   THE TECHNOLOGY UNIVERSE
   Curved holographic portals orbiting the Nexus. Moving between
   them turns the whole environment — screens travel toward the
   camera, behind the core, above and below it — so exploring the
   capability set feels like moving through a place.
   ============================================================ */

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { WORLDS } from "@/lib/brand";
import { EASE, Kicker, Shell } from "./primitives";
import Stage from "../webgl/Stage";
import CurvedMedia from "./CurvedMedia";

const PortalScene = dynamic(() => import("../webgl/PortalScene"), { ssr: false });

export default function PortalCarousel() {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) => {
      setEngaged(true);
      setIndex((i) => (i + dir + WORLDS.length) % WORLDS.length);
    },
    []
  );

  /* keyboard navigation once the section has focus */
  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const onKey = (e: KeyboardEvent) => {
      if (!node.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* a slow drift through the set until someone takes control */
  useEffect(() => {
    if (engaged) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % WORLDS.length), 7000);
    return () => clearInterval(id);
  }, [engaged]);

  const world = WORLDS[index];

  return (
    <section
      ref={host}
      tabIndex={-1}
      className="relative overflow-hidden border-y border-white/[0.06] bg-void"
      aria-roledescription="carousel"
      aria-label="Nexxovate technology portals"
    >
      {/* ---- the 3D universe ---- */}
      <div className="relative h-[92svh] min-h-[620px] w-full">
        <Stage
          camera={{ position: [0, 0.25, 15], fov: 45 }}
          fallback={
            /* no WebGL: the same idea, delivered as a curved DOM panel */
            <div className="absolute inset-0 flex items-center">
              <Shell width="wide">
                <CurvedMedia
                  poster={world.portal.poster}
                  accent={world.accent}
                  label={world.kicker}
                  caption={world.title}
                  height="clamp(300px, 46vh, 520px)"
                />
              </Shell>
            </div>
          }
        >
          <PortalScene worlds={WORLDS} activeIndex={index} />
        </Stage>

        {/* grade so the type always reads */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] bg-[linear-gradient(to_bottom,rgba(5,6,10,0.94)_0%,rgba(5,6,10,0.55)_18%,transparent_34%,transparent_54%,rgba(5,6,10,0.9)_88%,rgba(5,6,10,0.97)_100%)]"
        />

        {/* ---- heading ---- */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-24 md:pt-28">
          <Shell width="full">
            <Kicker index="—">The Nexxovate technology universe</Kicker>
            <h2 className="display-lg mt-5 max-w-[18ch] text-paper">
              Six environments.
              <br />
              <span className="text-spine">One intelligence.</span>
            </h2>
          </Shell>
        </div>

        {/* ---- active world readout ---- */}
        <div className="absolute inset-x-0 bottom-0 z-20 pb-10">
          <Shell width="full">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="max-w-xl"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: world.accent, boxShadow: `0 0 14px ${world.accent}` }}
                    />
                    <span className="font-mono-ui text-[0.62rem] tracking-[0.2em] text-white/45">
                      {world.index} — {world.kicker.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="display-md mt-4 text-paper">{world.title}</h3>

                  <p className="mt-3 max-w-[48ch] text-[0.88rem] leading-relaxed text-faint">
                    {world.stages.map((s) => s.label).join("  ·  ")}
                  </p>

                  <Link
                    href={world.href}
                    className="group mt-6 inline-flex items-center gap-2.5 text-[0.82rem] font-medium"
                    style={{ color: world.accent }}
                  >
                    <span className="relative">
                      Enter this environment
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* ---- controls ---- */}
              <div className="flex items-center gap-6">
                <div className="hidden gap-1.5 md:flex">
                  {WORLDS.map((w, i) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setEngaged(true);
                        setIndex(i);
                      }}
                      aria-label={`Show ${w.kicker}`}
                      aria-current={i === index}
                      className="group relative h-9 w-9"
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                        style={{
                          width: i === index ? 28 : 14,
                          background: i === index ? w.accent : "rgba(255,255,255,0.22)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous environment"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-paper/70 transition-all duration-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-paper"
                  >
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path d="M13 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next environment"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 text-paper/70 transition-all duration-400 hover:border-white/30 hover:bg-white/[0.04] hover:text-paper"
                  >
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}
