"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionPrefs } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   The Nexyra mark — your artwork.

   This used to draw a four-node diamond in SVG, on the reasoning
   that Nexyra had no identity of its own. It has one now, so the
   drawing is gone and the real emblem is here in its place.

   The component API did not change: size, animate, className, same
   as before. That is the whole reason this swap is one file rather
   than three — every placement already went through this component,
   so the ask bar, the ecosystem card and the Nexyra page hero all
   pick up the real mark without being touched.

   The asset is matted out of the presentation mock-up you sent —
   the wall, its vignette and the generator watermark are all gone
   (tools/make_nexyra_logo.py). It is a straight-alpha PNG, so it
   composites correctly on the white bands as well as the charcoal
   ones; I checked it at 19px, 38px, 56px and 150px on both grounds
   before wiring it in.

   Two things the drawing did that a raster cannot, and how each is
   handled:

   · It was crisp at any size. A 512px PNG is not, so `sizes` is
     pinned to the rendered size and the intrinsic file is roughly
     3x the largest placement (56px) — enough for a 3x display
     without shipping a 512px image to a 19px slot.
   · It inherited the palette tokens, so it re-tuned per zone. The
     emblem has its own fixed colours now, which is correct for a
     logo: a mark that changes colour per section is not a mark.
     The `animate` pulse is kept as a glow behind the artwork, so
     the ask bar still has the small sign of life it had before.
   ══════════════════════════════════════════════════════════════ */

export default function NexyraMark({
  size = 28,
  animate = false,
  className = "",
}: {
  size?: number;
  /** Slow glow behind the mark. Off by default — most placements want it still. */
  animate?: boolean;
  className?: string;
}) {
  const reduced = useMotionPrefs();
  const live = animate && !reduced;

  return (
    <span
      className={`relative inline-block shrink-0 align-middle ${className}`}
      style={{ width: size, height: size }}
    >
      {live && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(96,190,255,0.45), transparent 68%)",
            filter: `blur(${Math.max(4, size * 0.18)}px)`,
          }}
          animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.92, 1.06, 0.92] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <Image
        src="/nexyra-mark.png"
        alt="Nexyra"
        width={size}
        height={size}
        sizes={`${size}px`}
        className="relative h-full w-full object-contain"
      />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   The full lockup — emblem, wordmark and tagline.

   Separate from the mark because they are not the same picture: at
   19px the wordmark is unreadable mush, and at hero size the mark
   alone under-uses the space.

   ONE CONSTRAINT, and it is inherent to the artwork rather than to
   the cut: the wordmark is light silver. On the charcoal bands it
   reads beautifully; on the white bands it is pale grey on white
   and the tagline all but disappears. So this component paints its
   own dark plate by default. Pass `bare` only where you already
   know the ground is dark.
   ══════════════════════════════════════════════════════════════ */

export function NexyraLockup({
  width = 260,
  bare = false,
  className = "",
}: {
  width?: number;
  /** Skip the dark plate. Only safe on a dark ground. */
  bare?: boolean;
  className?: string;
}) {
  const img = (
    <Image
      src="/nexyra-lockup.png"
      alt="Nexyra — the next intelligence layer"
      width={900}
      height={761}
      sizes={`${width}px`}
      className="h-auto w-full"
    />
  );

  if (bare) {
    return (
      <span className={`inline-block ${className}`} style={{ width }}>
        {img}
      </span>
    );
  }

  return (
    <span
      className={`inline-block rounded-[20px] p-6 ${className}`}
      style={{ width: width + 48, background: "#0A0B0D" }}
    >
      {img}
    </span>
  );
}
