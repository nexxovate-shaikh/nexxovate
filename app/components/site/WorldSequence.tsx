"use client";

/* ============================================================
   EXPERTISE WORLD
   Each capability is a sequence, not a card. The stage rail is
   driven by scroll position: signal illuminates, then detection,
   then analysis — the transformation is something you watch happen
   rather than something you read a list about.
   ============================================================ */

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import type { World } from "@/lib/brand";
import { ArrowLink, EASE, Kicker, Shell } from "./primitives";
import CurvedMedia from "./CurvedMedia";

export default function WorldSequence({
  world,
  flip = false,
}: {
  world: World;
  flip?: boolean;
}) {
  const section = useRef<HTMLElement>(null);
  const calm = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start 65%", "end 55%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      world.stages.length - 1,
      Math.max(0, Math.floor(v * world.stages.length))
    );
    setActive(i);
  });

  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={section}
      id={world.id}
      className="relative overflow-hidden border-t border-white/[0.06] bg-void py-28 md:py-36"
    >
      {/* the world's own light */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 h-[62vmax] w-[62vmax] rounded-full opacity-45 blur-[150px]"
        style={{
          background: `radial-gradient(circle, ${world.accent}26 0%, transparent 66%)`,
          [flip ? "right" : "left"]: "-18vmax",
        }}
      />

      <Shell width="full">
        {/* ---- the cinematic frame leads, full width ---- */}
        <CurvedMedia
          poster={world.portal.poster}
          video={world.portal.video}
          accent={world.accent}
          label={world.stages[active]?.label ?? world.kicker}
          caption={world.stages[active]?.detail ?? ""}
          flip={flip}
          height="clamp(280px, 40vw, 520px)"
        />

        <div
          className={`mt-16 grid items-start gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* ---- narrative column ---- */}
          <div className="lg:col-span-5">
            <div>
              <Kicker index={world.index}>{world.kicker}</Kicker>

              <motion.h2
                initial={calm ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="display-lg mt-7 max-w-[16ch] text-paper"
              >
                {world.title}
              </motion.h2>

              <motion.p
                initial={calm ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="body-copy mt-7 max-w-[52ch]"
              >
                {world.lede}
              </motion.p>

              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                {world.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p
                      className="font-display text-2xl font-semibold tracking-[-0.02em]"
                      style={{ color: world.accent }}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-1 font-mono-ui text-[0.62rem] uppercase tracking-[0.16em] text-white/32">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <ArrowLink href={world.href}>Explore {world.kicker}</ArrowLink>
              </div>
            </div>
          </div>

          {/* ---- sequence column ---- */}
          <div className="lg:col-span-7">
            {/* stage rail */}
            <div className="relative pl-12">
              {/* track */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.08]" />
              <motion.div
                className="absolute left-[15px] top-2 w-px origin-top"
                style={{
                  height: railHeight,
                  background: `linear-gradient(to bottom, ${world.accent}, ${world.accent}00)`,
                }}
              />

              <ol className="space-y-7">
                {world.stages.map((stage, i) => {
                  const reached = i <= active;

                  return (
                    <li key={stage.label} className="relative">
                      {/* node */}
                      <span
                        className="absolute -left-12 top-1.5 flex h-8 w-8 items-center justify-center"
                        aria-hidden
                      >
                        <motion.span
                          className="absolute h-8 w-8 rounded-full"
                          animate={{
                            opacity: i === active ? [0.15, 0.4, 0.15] : 0,
                            scale: i === active ? [0.9, 1.25, 0.9] : 0.9,
                          }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          style={{ background: world.accent }}
                        />
                        <motion.span
                          className="relative block rounded-full"
                          animate={{
                            width: reached ? 9 : 6,
                            height: reached ? 9 : 6,
                            backgroundColor: reached ? world.accent : "#2a3346",
                            boxShadow: reached
                              ? `0 0 18px 0 ${world.accent}99`
                              : "0 0 0 0 transparent",
                          }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      </span>

                      <motion.div
                        animate={{ opacity: reached ? 1 : 0.34 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono-ui text-[0.6rem] tracking-[0.18em] text-white/28">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="display-md text-paper">{stage.label}</h3>
                        </div>
                        <p className="mt-2 max-w-[54ch] text-[0.88rem] leading-relaxed text-faint">
                          {stage.detail}
                        </p>
                      </motion.div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
