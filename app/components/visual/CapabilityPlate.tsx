"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionPrefs } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   Capability plates — your four films.

   These are the clips you supplied, cropped to the plate's 2.4:1,
   graded to the charcoal/steel/champagne palette, and with the
   burnt-in caption band cut off the top (the card sets the ordinal
   and the title in the site's own type — two headlines in two
   typefaces on one card is what made the earlier version look like
   a stock slide). See tools/make_capability_clips.sh.

   Four autoplaying videos in one section is the kind of thing that
   quietly ruins a page. It is why this component shipped stills for
   a while. Now that it is video again, none of it is left to
   chance:

   · The clips were re-encoded from 3.8 MB to ~300 KB each. All four
     together cost less than one of the originals.
   · Nothing is fetched until the card is near the viewport. The
     <video> has no src at all until then — preload="none" alone
     still lets some browsers reach for metadata.
   · Playback pauses the moment the card leaves the viewport. Four
     clips decoding while someone reads the footer is four cores
     doing nothing useful.
   · The poster is painted underneath at all times, and it is frame
     one of the graded clip, so the hand-off is invisible rather
     than a jump in colour.
   · Reduced motion or Save-Data gets the poster and nothing else —
     a sharp, correctly graded photograph, which is a legitimate
     design rather than a degraded one.

   The 3D tilt stays. On footage it reads as a screen being angled
   rather than a diagram being rotated, which suits the material.
   ══════════════════════════════════════════════════════════════ */

export default function CapabilityPlate({
  index,
  src,
  poster,
  alt,
}: {
  index: number;
  /** The clip. */
  src: string;
  /** Frame one of the same clip, already graded. */
  poster: string;
  alt: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useMotionPrefs();

  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;
    setAllowed(true);
  }, [reduced]);

  /* Two thresholds from one observer: load when the card is within
     a screen's reach, play only while it is actually on screen. */
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !allowed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);

        const v = videoRef.current;
        if (!v) return;
        if (entry.intersectionRatio > 0.15) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: [0, 0.15, 0.5] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [allowed]);

  return (
    <div
      ref={boxRef}
      className="relative aspect-[2.4/1] overflow-hidden border-b border-line bg-ink"
      style={{ perspective: 900 }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const el = boxRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        // 9° cap — past ~10° the card's type starts to shear and it
        // stops reading as precision.
        rx.set(-py * 9);
        ry.set(px * 9);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d", scale: 1.06 }
        }
      >
        {/* Poster, always painted. It is frame one of the clip, so
            nothing shifts when the video takes over. */}
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${poster}')` }}
        />

        {allowed && near && (
          <video
            ref={videoRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: ready ? 1 : 0 }}
            poster={poster}
            preload="none"
            muted
            loop
            playsInline
            disablePictureInPicture
            onCanPlay={() => setReady(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Grade: settle the footage into the charcoal page and darken
          the foot of the plate, where the title sits below. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,11,13,0.88), rgba(10,11,13,0.06) 58%), radial-gradient(120% 90% at 70% 20%, rgba(217,174,99,0.10), transparent 60%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-luminosity"
        /* Literal, not var(--color-ink): this plate sits on the white
           band, where that token IS white, and a white luminosity
           layer bleaches the footage rather than settling it. */
        style={{ background: "#0A0B0D" }}
      />

      {/* Sheen — one pass on hover, light crossing a screen. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation-name:plate-sheen] group-hover:[animation-duration:1.15s] group-hover:[animation-timing-function:cubic-bezier(0.4,0,0.2,1)]"
      />
    </div>
  );
}
