"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Faint circuit-board grid + traveling "data pulse" lines.
 * Drop this into any section to extend the technical/AI motif
 * from the Hero throughout the rest of the page.
 */
export default function CircuitLines({
  className = "",
  opacity = 0.06,
  pulses = 2,
}: {
  className?: string;
  opacity?: number;
  pulses?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.5)_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{ opacity }}
      />

      {!reduce &&
        Array.from({ length: pulses }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent"
            style={{ top: `${22 + i * 30}%`, left: "-8rem" }}
            animate={{ x: ["0vw", "115vw"] }}
            transition={{
              duration: 9 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}
