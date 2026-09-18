"use client";

/* ============================================================
   Interior page hero.
   Same cinematic grammar as the homepage — environment behind,
   editorial type in front — at a scale that leaves room for the
   page's own content to lead.
   ============================================================ */

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

import type { NexusState } from "@/lib/brand";
import { EASE, GhostLink, PrimaryLink, Shell } from "./primitives";
import Stage from "../webgl/Stage";
import { useCapability } from "../webgl/useCapability";

const NexusCore = dynamic(() => import("../webgl/NexusCore"), { ssr: false });
const LightRig = dynamic(
  () => import("../webgl/SceneEnvironment").then((m) => ({ default: m.LightRig })),
  { ssr: false }
);
const Dust = dynamic(
  () => import("../webgl/SceneEnvironment").then((m) => ({ default: m.Dust })),
  { ssr: false }
);
const CameraRig = dynamic(
  () => import("../webgl/SceneEnvironment").then((m) => ({ default: m.CameraRig })),
  { ssr: false }
);

export default function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  state = "activation",
  primary,
  secondary,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  /** the second line, rendered in the spine gradient */
  accent?: string;
  lede: string;
  state?: NexusState;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  align?: "left" | "center";
}) {
  const calm = useReducedMotion();
  const cap = useCapability();
  const centered = align === "center";

  // on narrow viewports the object moves up and back so it frames the
  // headline instead of sitting underneath it
  const camera: [number, number, number] = cap.compact
    ? [0.3, 0.3, 12.5]
    : [0.4, 0.4, 9.6];

  // the object holds the right of the frame; type owns the left
  const objectPosition: [number, number, number] = cap.compact
    ? [0, 3.15, 0]
    : [3.6, 0.5, -1.2];

  return (
    <section className="grain vignette relative flex min-h-[76svh] items-end overflow-hidden bg-void pb-16 pt-40 md:min-h-[80svh] md:pb-24">
      <div className="absolute inset-0">
        <Stage
          camera={{ position: camera, fov: 42 }}
          fallback={
            <div aria-hidden className="absolute inset-0">
              <div
                className="absolute right-[8%] top-1/2 h-[52vmin] w-[52vmin] -translate-y-1/2 rounded-full blur-[100px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(77,124,255,0.32) 0%, rgba(122,92,255,0.1) 45%, transparent 70%)",
                }}
              />
              <div className="absolute right-[8%] top-1/2 h-[30vmin] w-[30vmin] -translate-y-1/2 rounded-full border border-white/10" />
            </div>
          }
        >
          <color attach="background" args={["#05060a"]} />
          <CameraRig origin={camera} strength={cap.compact ? 0.3 : 0.7} />
          <LightRig />
          <ambientLight intensity={0.24} />
          <group position={objectPosition}>
            <NexusCore
              state={state}
              scale={cap.compact ? 0.58 : 0.82}
              detail={cap.compact ? "reduced" : "full"}
            />
          </group>
          <Dust count={cap.compact ? 350 : 700} radius={24} color="#a8bde8" />
        </Stage>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] bg-[linear-gradient(to_top,rgba(5,6,10,0.98)_0%,rgba(5,6,10,0.9)_30%,rgba(5,6,10,0.62)_52%,rgba(5,6,10,0.3)_74%,rgba(5,6,10,0.85)_100%)] md:bg-[linear-gradient(to_top,rgba(5,6,10,0.97)_0%,rgba(5,6,10,0.7)_38%,rgba(5,6,10,0.35)_70%,rgba(5,6,10,0.85)_100%)]"
      />

      {/* a left-weighted scrim so the copy always has a floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[16] hidden bg-[linear-gradient(to_right,rgba(5,6,10,0.92)_0%,rgba(5,6,10,0.7)_34%,transparent_62%)] lg:block"
      />

      <Shell width="full" className={`z-20 ${centered ? "text-center" : ""}`}>
        <motion.div
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-9 bg-gradient-to-r from-transparent to-white/25" />
          <span className="kicker">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className={`display-xl mt-7 max-w-[17ch] ${centered ? "mx-auto" : ""}`}
        >
          <span className="text-forge">{title}</span>
          {accent && <span className="mt-1 block text-spine">{accent}</span>}
        </motion.h1>

        <motion.p
          initial={calm ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.34 }}
          className={`lede mt-8 ${centered ? "mx-auto text-center" : ""}`}
        >
          {lede}
        </motion.p>

        {(primary || secondary) && (
          <motion.div
            initial={calm ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.46 }}
            className={`mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 ${
              centered ? "items-center justify-center" : ""
            }`}
          >
            {primary && (
              <PrimaryLink href={primary.href} className="uppercase">
                {primary.label}
              </PrimaryLink>
            )}
            {secondary && <GhostLink href={secondary.href}>{secondary.label}</GhostLink>}
          </motion.div>
        )}
      </Shell>
    </section>
  );
}
