"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionPrefs, EASE } from "@/lib/motion";
import NexyraMark from "./visual/NexyraMark";

/* ══════════════════════════════════════════════════════════════
   Ecosystem card.

   A wide dark panel: name and standfirst held left in white, the
   constellation field bleeding in from the right, one quiet link
   at the foot. The whole thing is a single anchor, so the entire
   card is the target rather than just the words "Read more" — a
   4px text link inside a 300px panel is a hit area people miss.

   `shift` slides the background so a row of these does not repeat
   the same patch of sky four times. Same asset, four framings.
   ══════════════════════════════════════════════════════════════ */

export function EcosystemCard({
  name,
  tagline,
  href,
  label = "Read more",
  size = "large",
  shift = 0,
  id,
}: {
  name: string;
  tagline: string;
  href: string;
  label?: string;
  size?: "large" | "small";
  shift?: number;
  id?: string;
}) {
  const reduced = useMotionPrefs();
  const large = size === "large";

  return (
    <motion.div
      id={id}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="scroll-mt-28"
    >
      <Link
        href={href}
        className={`group relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-line transition-colors duration-500 hover:border-line-lit ${
          large
            ? "min-h-[300px] p-8 md:min-h-[340px] md:p-12"
            : "min-h-[260px] p-7 md:p-9"
        }`}
      >
        {/* Field */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.03]"
          style={{
            backgroundImage: "url('/images/nexyra-field.jpg')",
            backgroundPosition: `${58 + shift}% center`,
          }}
        />
        {/* Scrim: heavy left where the type is, open right. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
        />

        <div className="relative">
          {large && (
            <span className="mb-6 inline-flex">
              <NexyraMark size={52} animate />
            </span>
          )}
          <h3
            className={`font-display font-semibold ${
              large
                ? "text-[clamp(1.9rem,3.4vw,2.9rem)]"
                : "text-[clamp(1.5rem,2.2vw,2rem)]"
            }`}
          >
            {name}
          </h3>
          <p
            className={`mt-4 leading-relaxed text-mute ${
              large ? "max-w-[34ch] text-[length:var(--text-lead)]" : "max-w-[36ch] text-[15px]"
            }`}
          >
            {tagline}
          </p>
        </div>

        <span className="relative mt-10 inline-flex items-center gap-3 text-[14.5px] font-medium text-text">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-400 ease-out group-hover:translate-x-1.5"
          >
            <path
              d="M1 6h15M11 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
