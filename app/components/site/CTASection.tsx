"use client";

/* ============================================================
   Closing frame. The Nexus returns in its final state — the full
   ecosystem — and the page ends on the same object it opened with.
   ============================================================ */

import dynamic from "next/dynamic";

import { BRAND } from "@/lib/brand";
import { GhostLink, PrimaryLink, Reveal, Shell } from "./primitives";
import Stage from "../webgl/Stage";

const NexusCore = dynamic(() => import("../webgl/NexusCore"), { ssr: false });
const SceneBits = dynamic(
  () => import("../webgl/SceneEnvironment").then((m) => ({ default: m.LightRig })),
  { ssr: false }
);

export default function CTASection({
  eyebrow = "Start the engagement",
  title = "Let's build the autonomous enterprise.",
  body = "Bring us the part of your operation that costs the most attention. We will map it, show you where autonomy is safe to introduce first, and agree what gets measured.",
  primary = { href: "/contact", label: BRAND.cta },
  secondary = { href: "/ai-consultation", label: "Book a consultation" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="grain relative overflow-hidden border-t border-white/[0.07] bg-void py-32 md:py-44">
      <div className="absolute inset-0">
        <Stage
          camera={{ position: [0, 0, 17] }}
          fallback={
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[110px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(77,124,255,0.3) 0%, rgba(226,193,136,0.08) 45%, transparent 70%)",
              }}
            />
          }
        >
          <color attach="background" args={["#05060a"]} />
          <ambientLight intensity={0.24} />
          <SceneBits />
          <NexusCore state="ecosystem" scale={0.95} />
        </Stage>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_50%,rgba(5,6,10,0.55)_0%,rgba(5,6,10,0.78)_42%,rgba(5,6,10,0.94)_78%,#05060a_100%)]"
      />

      <Shell width="wide" className="text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25" />
            <span className="kicker-gold">{eyebrow}</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/25" />
          </div>

          <h2 className="display-xl mx-auto mt-8 max-w-[16ch] text-forge">{title}</h2>

          <p className="lede mx-auto mt-8 text-center">{body}</p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <PrimaryLink href={primary.href} className="uppercase">
              {primary.label}
            </PrimaryLink>
            <GhostLink href={secondary.href}>{secondary.label}</GhostLink>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
