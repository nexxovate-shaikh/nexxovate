"use client";

import Image from "next/image";
import { StatusDot } from "@/app/components/ui";

/* ══════════════════════════════════════════════════════════════
   PRODUCT SHOWCASE — a real screenshot, framed.

   The Nexyra and Services pages currently describe four products in
   prose and show none of them. For software that a buyer has never
   seen, that is the weakest possible case: "AI Service Desk Agent —
   autonomous IT support" is a claim, whereas a picture of the
   console with an incident open on it is evidence. Every enterprise
   software page that converts does this, and the reason is not
   fashion — it is that a screenshot answers "what will my team
   actually be looking at" in one glance, and no paragraph can.

   ── WHY IT IS FRAMED AND NOT DROPPED IN FLAT ──────────────────
   A bare screenshot on a dark band reads as a bug: a bright
   rectangle with a hard edge, floating. The frame does three jobs:

     · it declares "this is a product, not a photograph", which is
       what the chrome bar communicates before you read anything
     · it gives the bright panel a dark surround to sit in, so the
       contrast step at its edge is a designed one
     · it carries the product's own name and mark, so a visitor
       scrolling fast still learns which product they are seeing

   ── THE GLASS IS REAL HERE ────────────────────────────────────
   This uses .glass-media, the opt-in class, not .glass. Everywhere
   else on the site .glass sits on a flat band colour, where a
   backdrop blur costs a full rasterization to produce the identical
   flat colour — which is why the blur was stripped out of .glass.
   Here the chrome bar genuinely overlays the screenshot beneath it,
   so there is something to blur and the cost buys something.

   ── SHARPNESS ─────────────────────────────────────────────────
   The supplied captures are 1363x606 and 1366x551. Rendered at
   `sizes` below they land at roughly 1.2x on a 1x display and
   slightly soft on a 2x one. That is the honest ceiling of the
   source material — upscaling would only add blur. If you can
   re-capture at 2x (a 2560-wide browser window, or macOS Cmd-Shift-4
   on a retina panel) drop the new file in at the same path and it
   sharpens with no code change.
   ══════════════════════════════════════════════════════════════ */

export type ShowcaseProps = {
  /** Product name, shown in the chrome bar. */
  name: string;
  /** Path under /public — the screenshot itself. */
  src: string;
  /** Natural pixel size of `src`, so Next can reserve the box. */
  width: number;
  height: number;
  /**
   * What a reader who cannot see the image needs to know. Not
   * "screenshot of the dashboard" — that tells them nothing. Say
   * what is ON it.
   */
  alt: string;
  /** Optional product mark shown at the left of the chrome bar. */
  mark?: string;
  /** Shown under the frame. One line, factual. */
  caption?: string;
  /** Right of the chrome bar. Omit for a product with no live state. */
  status?: string;
  /** Set on the first showcase above the fold so it is not lazy. */
  priority?: boolean;
  className?: string;
};

export default function ProductShowcase({
  name,
  src,
  width,
  height,
  alt,
  mark,
  caption,
  status,
  priority = false,
  className = "",
}: ShowcaseProps) {
  return (
    <figure className={`group relative ${className}`}>
      {/* The lift. A champagne wash under the panel rather than a
          border around it — a gold outline on a screenshot looks
          like a selection state, a gold glow underneath looks like
          the panel is raised off the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -bottom-6 top-8 rounded-[28px] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(217,174,99,0.16), transparent 70%)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[16px] md:rounded-[20px]"
        style={{
          /* A 1px gradient edge, brightest at the top, done as a
             padding-box/border-box mask rather than a border so it
             can fade. A flat border cannot. */
          background:
            "linear-gradient(160deg, rgba(217,174,99,0.45), rgba(126,147,172,0.18) 34%, rgba(255,255,255,0.05) 70%)",
          padding: "1px",
          boxShadow:
            "0 2px 6px rgba(4,8,18,0.35), 0 24px 60px rgba(4,8,18,0.55)",
        }}
      >
        {/* data-band="dark" is load-bearing. This frame is dropped
            onto whichever band the page puts it on, including the
            light one, where bg-ink resolves to #FFFFFF and the chrome
            bar would come out white with white text on it. Declaring
            the frame its own dark band pins every token inside it —
            ground, hairline, type — so a product frame looks like a
            product frame wherever it lands. */}
        <div
          data-band="dark"
          className="overflow-hidden rounded-[15px] md:rounded-[19px]"
        >
          {/* ── Chrome bar ── */}
          <div className="glass-media relative z-10 flex items-center gap-3 border-b border-line px-4 py-3 md:px-5">
            {mark && (
              <Image
                src={mark}
                alt=""
                width={26}
                height={26}
                className="h-[20px] w-[20px] shrink-0 md:h-[22px] md:w-[22px]"
              />
            )}
            <span className="font-display truncate text-[13.5px] font-semibold text-text md:text-[14.5px]">
              {name}
            </span>
            {status && (
              <span className="ml-auto hidden shrink-0 sm:block">
                <StatusDot label={status} />
              </span>
            )}
          </div>

          {/* ── The product ── */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            /* The frame is never wider than the container, and on a
               phone it is the full width minus the page gutter. */
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 620px, 700px"
            className="h-auto w-full"
          />
        </div>
      </div>

      {caption && (
        <figcaption className="mt-4 text-[13.5px] leading-relaxed text-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
