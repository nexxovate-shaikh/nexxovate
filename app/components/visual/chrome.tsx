"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPrefs, useScrollSubscription } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   Page chrome: grain, scroll rail, cursor.

   All three write to the DOM directly from the shared scroll loop
   rather than through React state. The old site re-rendered on
   every scroll event across three separate components.
   ══════════════════════════════════════════════════════════════ */

export function Grain() {
  const reduced = useMotionPrefs();
  if (reduced) return null;
  return <div className="grain" aria-hidden="true" />;
}

/* ── Scroll rail ────────────────────────────────────────────── */

/**
 * The single progress indicator for the site. Replaces the three
 * that were running simultaneously (AIScrollAnalyzer in the root
 * layout, one in Navbar, one in page.tsx).
 */
export function ScrollRail() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollSubscription(({ progress }) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `scaleX(${progress})`;
  });

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px bg-line-soft"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="h-full origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, var(--color-violet), var(--color-magenta))",
        }}
      />
    </div>
  );
}

/* ── Cursor ─────────────────────────────────────────────────── */

/**
 * A trailing ring, not a cursor replacement.
 *
 * The native cursor stays visible on purpose. Hiding it and
 * drawing your own adds a frame of latency to a pointer people
 * have been using all day, and it is consistently the most
 * complained-about element on sites like this. A ring that lags
 * slightly and grows over interactive elements reads as
 * deliberate; a laggy dot where the arrow should be reads as
 * broken.
 *
 * Mouse only, and off entirely under reduced motion.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useMotionPrefs();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    if (!ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="grow"]'
      );
      targetScale = interactive ? 2.1 : 1;
    };

    const onLeave = () => {
      targetScale = 0;
    };

    const tick = () => {
      // Lag is the effect. Match it to Lenis's lerp so the ring and
      // the page feel like one system.
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-6 w-6 rounded-full border border-[color:var(--color-magenta)] opacity-60 mix-blend-difference will-change-transform"
      style={{ transition: "opacity 240ms ease" }}
    />
  );
}
