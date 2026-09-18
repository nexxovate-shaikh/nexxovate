"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { OPEN_CHAT_EVENT } from "@/lib/content/site";

/* ══════════════════════════════════════════════════════════════
   Shared primitives.

   Everything is token-driven — no arbitrary colour values. The
   old site had every hex inline, which is why three visual
   systems were able to drift apart without anyone noticing.
   ══════════════════════════════════════════════════════════════ */

/* ── Section ────────────────────────────────────────────────── */

/**
 * `zone` sets --zone on the section, and every accent inside reads
 * from it. That is how scroll position becomes legible as colour
 * temperature across Infrastructure → AI → Security → Transformation.
 */
export function Section({
  children,
  zone,
  band = "dark",
  tone,
  className = "",
  id,
  ref,
}: {
  children: ReactNode;
  zone?: "infrastructure" | "ai" | "security" | "transformation";
  /**
   * The band decides the ground AND every token inside it — see the
   * BANDS block in globals.css. Setting it here is the only place a
   * section's brightness is decided, which is what stops the page
   * from drifting back to one flat charcoal.
   */
  band?: "dark" | "deep" | "light";
  /** @deprecated Superseded by `band`. "raised" maps to "deep". */
  tone?: "ink" | "raised";
  className?: string;
  id?: string;
  /**
   * Sections are used as scroll targets by useScroll, so this has
   * to reach the real <section> element. React 19 passes ref as an
   * ordinary prop to function components — no forwardRef needed.
   */
  ref?: React.Ref<HTMLElement>;
}) {
  const resolved = tone === "raised" && band === "dark" ? "deep" : band;

  return (
    <section
      ref={ref}
      id={id}
      data-zone={zone}
      data-band={resolved}
      /* py here, not at every call site: uniform section height is
         half of what makes the reference page feel composed, and it
         only stays uniform if there is one place to change it.

         48/56, down from 64/80. Two adjacent bands each contribute
         their own padding, so 80 was putting 160px of nothing at
         every seam — bigger than most of the gaps inside a section,
         which is what made the page read as a series of islands.
         The reference site runs 48 and never more. */
      className={["relative overflow-hidden py-12 md:py-14", className].join(" ")}
    >
      {children}
    </section>
  );
}

/**
 * 1360px, up from 1280. Measured against the reference site, whose
 * contained rows run 1330–1345px and whose full-bleed rows run 1425
 * at a 1440 viewport. The old 7xl container plus 40px gutters left
 * 1200px of content — narrow enough that every grid felt one column
 * short and every headline wrapped a word early.
 */
export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** For full-bleed rows: carousels, marquees, bento grids. */
  wide?: boolean;
}) {
  return (
    <div
      className={`relative z-10 mx-auto w-full px-6 md:px-8 ${
        wide ? "max-w-[1460px]" : "max-w-[1360px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Zone seam ──────────────────────────────────────────────── */

/**
 * The transition between themed zones: a shallow diagonal that
 * carries the ground from one tone to the next, with a hairline
 * accent rule along the seam.
 *
 * Kept shallow on mobile — a steep angle eats vertical space that
 * small screens cannot spare.
 */
export function ZoneSeam({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-16 md:h-24" aria-hidden="true">
      <div
        className="absolute inset-0 bg-ink-2"
        style={{
          clipPath: flip
            ? "polygon(0 0, 100% 100%, 100% 0)"
            : "polygon(0 100%, 0 0, 100% 0)",
        }}
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--zone), transparent)",
        }}
      />
    </div>
  );
}

/* ── Labels ─────────────────────────────────────────────────── */

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono-label flex items-center gap-3 text-faint">
      <span className="inline-block h-px w-6 bg-line-lit" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono-label text-mute">{children}</p>
  );
}

/** A word or phrase carrying the zone gradient. */
export function Accent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(100deg, var(--zone) 5%, var(--zone-2) 55%, var(--color-gilt) 105%)",
      }}
    >
      {children}
    </span>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "quiet";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  /* One flat fill, no gradient. The reference site's primary is a
     single saturated colour on a pill, and a gradient button beside
     a gradient headline beside a gradient rule is how a page starts
     to look decorated rather than designed. --btn-bg comes from the
     band: champagne on charcoal, ink on paper — a champagne fill on
     white is 2:1 and fails the 3:1 floor for UI components. */
  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-[filter,transform] duration-300 hover:brightness-110 ${className}`}
        style={{ background: "var(--btn-bg)", color: "var(--btn-fg)" }}
      >
        {children}
        <Arrow />
      </Link>
    );
  }

  /* 2px, not a hairline. Measured off the reference: their outline
     button carries a 2px border, and it is the difference between a
     secondary action that looks deliberate and one that looks like
     a disabled state. */
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2.5 rounded-full border-2 px-7 py-3 text-[15px] font-semibold text-text transition-colors duration-300 ${className}`}
        style={{ borderColor: "var(--color-line-lit)" }}
      >
        {children}
        <Arrow />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[15px] text-mute transition-colors hover:text-text ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

/**
 * Opens the concierge in place rather than routing to a page.
 *
 * The brief asked for a quick-chat entry point as an alternative to
 * the form; sending someone to a different page to start a chat
 * defeats the point of it being quick.
 */
export function ChatTrigger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))}
      className={`group inline-flex items-center gap-2.5 rounded-full border-2 px-7 py-3 text-[15px] font-semibold text-text transition-colors duration-300 ${className}`}
      style={{ borderColor: "var(--color-line-lit)" }}
    >
      {children}
      <Arrow />
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

/**
 * Reads the spotlight position published by <Spotlight> on an
 * ancestor. --spot-on gates the glow so it fades out cleanly when
 * the pointer leaves the grid rather than sticking at its last
 * position.
 */
export function SpotCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass group relative h-full overflow-hidden p-7 transition-colors duration-500 hover:border-[color:var(--color-line-lit)] ${className}`}
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

/* ── Status pill ────────────────────────────────────────────── */

export function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-mute">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
      </span>
      {label}
    </span>
  );
}
