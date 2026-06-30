"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Fixed, viewport-relative cursor glow.
 *
 * Bug fix: the previous version attached onMouseMove to a div that also
 * had `pointer-events-none`, so the browser never delivered it any mouse
 * events — the effect was dead code. This version listens on `window`
 * instead, so the glow actually tracks the cursor, while the visual layer
 * stays pointer-events-none so it never blocks clicks underneath it.
 */
export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        style={{ left: sx, top: sy }}
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-[radial-gradient(circle,rgba(168,85,247,.30)_0%,rgba(236,72,153,.18)_35%,transparent_72%)]
        blur-3xl"
      />
      <motion.div
        style={{ left: sx, top: sy }}
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}
