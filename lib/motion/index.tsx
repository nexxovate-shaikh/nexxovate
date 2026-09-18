"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useMotionPrefs } from "./provider";

export { MotionProvider, useMotionPrefs, useScrollSubscription } from "./provider";

/* ══════════════════════════════════════════════════════════════
   Motion primitives.

   Every component here checks useMotionPrefs() and degrades to a
   visible resting state — never to nothing. Under reduced motion
   the page must still look designed, not stripped.
   ══════════════════════════════════════════════════════════════ */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── useMediaQuery ──────────────────────────────────────────── */

/**
 * Starts false on the server and on first client render, then
 * upgrades after mount.
 *
 * That default is deliberate: every component using this treats
 * false as "small screen / no fine pointer", which is the simpler,
 * more accessible layout. If hydration and the real answer ever
 * disagree, the fallback is what renders — never the pinned,
 * pointer-dependent version.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [query]);

  return matches;
}

/* ── Reveal ─────────────────────────────────────────────────── */

/**
 * Scale + opacity + lift.
 *
 * THE BLUR IS GONE, and it is the single biggest scroll win on the
 * page. filter: blur() cannot be animated on the compositor — the
 * browser has to re-rasterize the element's whole subtree at a new
 * radius on every frame of the transition. There are sixteen
 * Reveals and roughly twenty-five staggered children on the home
 * page, several firing at once as each band arrives, and some of
 * them wrap video plates: blurring a playing <video> frame by frame
 * is about the most expensive thing you can ask a four-core machine
 * to do while it is also scrolling.
 *
 * What is left — opacity, translate and scale — are the two
 * properties the compositor can animate on its own, at
 * effectively no main-thread cost. The motion reads almost
 * identically; the `blur` prop is kept so call sites do not break,
 * but it no longer switches on a filter.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}) {
  const reduced = useMotionPrefs();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        /* A touch more travel than before, to carry the depth the
           blur used to give it without costing a rasterization. */
        y: blur ? y + 4 : y,
        scale: 0.985,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  gap = 0.07,
  className = "",
}: {
  children: ReactNode;
  gap?: number;
  className?: string;
}) {
  const reduced = useMotionPrefs();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  /**
   * Passed straight through to the element. Added for the Problems
   * cards, which need a color-mix() background that Tailwind cannot
   * express as a utility — without this the caller has to wrap every
   * item in an extra div, which puts a non-animating element between
   * the stagger and the content and quietly breaks the y offset.
   */
  style?: CSSProperties;
}) {
  const reduced = useMotionPrefs();

  if (reduced)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        /* No filter here either — see the note on Reveal. A Stagger
           fires its children in sequence, so a blurred variant meant
           several subtree rasterizations overlapping mid-scroll. */
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── MaskText ───────────────────────────────────────────────── */

/**
 * Headline reveal: each line is clipped and slides up from 110%.
 * This is the hero's signature move, not a fade.
 *
 * Lines are passed as an array rather than split from a string so
 * the break points are a design decision, not a measurement
 * accident.
 */
export function MaskText({
  lines,
  className = "",
  delay = 0,
  stagger = 0.09,
  as: Tag = "h1",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "div";
}) {
  const reduced = useMotionPrefs();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          {reduced ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.05,
                delay: delay + i * stagger,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}

/* ── Parallax ───────────────────────────────────────────────── */

export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPrefs();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -50}%`, `${speed * 50}%`]);

  /* The ref is attached in both branches. useScroll has already run
     by this point, and a target ref that never reaches a DOM node
     throws "defined but not hydrated" — so the reduced-motion path
     cannot simply drop the wrapper. */
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ── CountUp ────────────────────────────────────────────────── */

/**
 * Scroll-linked, not fire-and-forget.
 *
 * Bound to scroll progress across the band, so scrubbing back up
 * counts back down. That reversibility is the thing that makes it
 * feel connected to the scroll rather than merely triggered by it.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMotionPrefs();
  const [value, setValue] = useState(reduced ? to : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.62"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    const t = Math.min(1, Math.max(0, p));
    // Snap the last sliver. Scroll progress approaches 1 without
    // reliably arriving, which is how a "250+" stat ships as "249+".
    setValue(t > 0.97 ? to : Math.round(to * t));
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {reduced ? to : value}
      {suffix}
    </span>
  );
}

/* ── Magnetic ───────────────────────────────────────────────── */

export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPrefs();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 16, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Tilt ───────────────────────────────────────────────────── */

/**
 * 3D tilt capped at 6°. The old site used 3°, which is below the
 * threshold where anyone notices it happening.
 */
export function Tilt({
  children,
  max = 6,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPrefs();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * max * 2);
        ry.set(px * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Spotlight ──────────────────────────────────────────────── */

/**
 * A radial light that follows the cursor across a whole grid.
 *
 * One listener on the container writes two CSS custom properties;
 * N children read them. The naive version attaches a listener per
 * card, which is how a six-card grid ends up with six rAF loops.
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const reduced = useMotionPrefs();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        cancelAnimationFrame(raf.current);
        const { clientX, clientY } = e;
        raf.current = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--spot-x", `${clientX - r.left}px`);
          el.style.setProperty("--spot-y", `${clientY - r.top}px`);
          el.style.setProperty("--spot-on", "1");
        });
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--spot-on", "0");
      }}
    >
      {children}
    </div>
  );
}

/* ── DrawPath ───────────────────────────────────────────────── */

/**
 * An SVG path that draws itself against scroll progress.
 *
 * A real path, not four borders faked to look like one — which
 * matters because the process section's connector has to bend.
 */
export function DrawPath({
  d,
  progress,
  className = "",
  strokeWidth = 1.5,
}: {
  d: string;
  progress: MotionValue<number>;
  className?: string;
  strokeWidth?: number;
}) {
  const reduced = useMotionPrefs();
  const pathLength = useSpring(progress, { stiffness: 60, damping: 22 });

  return (
    <motion.path
      d={d}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={reduced ? { pathLength: 1 } : { pathLength }}
    />
  );
}
