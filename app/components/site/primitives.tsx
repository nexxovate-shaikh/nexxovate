"use client";

/* ============================================================
   Motion + layout primitives.
   One easing curve, one reveal behaviour, one set of editorial
   labels. Everything on the site composes from these so the motion
   language stays coherent from page to page.
   ============================================================ */

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------
   Reveal — the site's single entrance animation.
------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const calm = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={calm ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={calm ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const calm = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: calm ? { opacity: 0 } : { opacity: 0, y: 30 },
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

/* ------------------------------------------------------------
   Parallax — subtle depth on scroll. Never more than a few
   percent of viewport height; the moment it's noticeable as an
   effect it stops feeling expensive.
------------------------------------------------------------ */

export function useParallax(distance = 60): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = calm ? 0 : distance;
  const raw = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.5 });

  return { ref, y };
}

/* ------------------------------------------------------------
   Editorial labels
------------------------------------------------------------ */

export function Kicker({
  children,
  index,
  tone = "spine",
}: {
  children: ReactNode;
  index?: string;
  tone?: "spine" | "gold";
}) {
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span className="font-mono-ui text-[0.688rem] tracking-[0.22em] text-white/28">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-white/15" />
      <span className={tone === "gold" ? "kicker-gold" : "kicker"}>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------
   Section shell — consistent rhythm and gutters everywhere.
------------------------------------------------------------ */

export function Section({
  children,
  className = "",
  id,
  tone = "void",
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "void" | "ink" | "graphite";
  tight?: boolean;
}) {
  const bg =
    tone === "ink" ? "bg-ink" : tone === "graphite" ? "bg-graphite" : "bg-void";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bg} ${
        tight ? "py-20 md:py-24" : "py-28 md:py-40"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Shell({
  children,
  className = "",
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  width?: "wide" | "narrow" | "full";
}) {
  const max =
    width === "narrow"
      ? "max-w-4xl"
      : width === "full"
        ? "max-w-[1600px]"
        : "max-w-7xl";

  return (
    <div className={`relative z-10 mx-auto w-full ${max} px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------
   Links + buttons
------------------------------------------------------------ */

export function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-paper px-7 py-3.5 text-[0.82rem] font-semibold tracking-[0.02em] text-void transition-transform duration-500 hover:-translate-y-0.5 ${className}`}
    >
      <span
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.75),transparent)] transition-transform duration-[900ms] group-hover:translate-x-full"
        aria-hidden
      />
      <span className="relative">{children}</span>
      <svg
        className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border border-white/14 px-7 py-3.5 text-[0.82rem] font-medium text-paper/85 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:bg-white/[0.04] hover:text-paper ${className}`}
    >
      {children}
      <svg
        className="h-3.5 w-3.5 opacity-60 transition-transform duration-500 group-hover:translate-x-1 group-hover:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  tone = "spine",
}: {
  href: string;
  children: ReactNode;
  tone?: "spine" | "paper";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 text-[0.82rem] font-medium ${
        tone === "spine" ? "text-electric-soft" : "text-paper"
      }`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
      </span>
      <svg className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ------------------------------------------------------------
   Atmosphere — reusable background treatments so no section is
   ever a flat black rectangle.
------------------------------------------------------------ */

export function Atmosphere({
  tone = "#4d7cff",
  position = "top",
  intensity = 0.16,
}: {
  tone?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  intensity?: number;
}) {
  const place: Record<string, string> = {
    top: "-top-1/3 left-1/2 -translate-x-1/2",
    bottom: "-bottom-1/3 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-1/4 -translate-y-1/2",
    right: "top-1/2 -right-1/4 -translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${place[position]} h-[70vmax] w-[70vmax] rounded-full blur-[140px]`}
      style={{
        background: `radial-gradient(circle, ${tone}${Math.round(intensity * 255)
          .toString(16)
          .padStart(2, "0")} 0%, transparent 65%)`,
      }}
    />
  );
}

export function Blueprint({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`blueprint pointer-events-none absolute inset-0 opacity-70 ${className}`}
    />
  );
}
