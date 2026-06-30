"use client";

import { motion, useReducedMotion } from "framer-motion";

type Sparkle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

const PALETTE = ["#c084fc", "#f472b6", "#fbbf24"];

function buildSparkles(count: number): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 5) % 96}%`,
    top: `${(i * 53 + 9) % 92}%`,
    size: 5 + (i % 4) * 3,
    delay: (i % 7) * 0.35,
    duration: 2.6 + (i % 5) * 0.7,
    color: PALETTE[i % PALETTE.length],
  }));
}

/**
 * Twinkling glitter layer for card grids.
 * Positions are deterministic (index-based, no Math.random) so SSR/CSR
 * output always matches and there's no hydration warning.
 */
export default function SparkleField({
  count = 14,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const sparkles = buildSparkles(count);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute block"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1.2, 0.3],
            rotate: [0, 90],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" width={s.size} height={s.size}>
            <path
              d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z"
              fill={s.color}
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
