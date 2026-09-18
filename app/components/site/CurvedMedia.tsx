"use client";

/* ============================================================
   CURVED MEDIA SURFACE

   A holographic display, not a rectangle with rounded corners. The
   panel is clipped to a barrel shape, its edges fall off in light
   the way a curved screen does, and it carries a real perspective
   tilt that answers to the pointer.

   Video is optional by design: the poster is the permanent fallback,
   the clip is fetched only when the panel is on screen and the
   device is willing, and it pauses the moment it leaves the viewport.
   ============================================================ */

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useCapability, useNearViewport } from "../webgl/useCapability";

export default function CurvedMedia({
  poster,
  video,
  accent = "#4d7cff",
  label,
  caption,
  flip = false,
  height = "clamp(260px, 34vw, 460px)",
}: {
  poster: string;
  video?: string;
  accent?: string;
  label?: string;
  caption?: string;
  flip?: boolean;
  height?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const near = useNearViewport(host, "160px");
  const cap = useCapability();
  const calm = useReducedMotion();

  const uid = useId().replace(/[:]/g, "");
  const clipId = `barrel-${uid}`;

  const wantsVideo = Boolean(video) && cap.cinematic && !cap.compact;

  /* play only while visible; never block first paint */
  useEffect(() => {
    const el = videoEl.current;
    if (!el) return;

    if (near && wantsVideo) {
      void el.play().catch(() => {
        /* autoplay declined — poster remains, nothing breaks */
      });
    } else {
      el.pause();
    }
  }, [near, wantsVideo]);

  /* pointer tilt — small, damped, and off entirely for calm users */
  useEffect(() => {
    if (calm || cap.compact) return;
    const node = host.current;
    if (!node) return;

    let frame: number | null = null;

    const onMove = (e: PointerEvent) => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = node.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: -py * 5.5, y: px * 8 });
      });
    };

    const onLeave = () => setTilt({ x: 0, y: 0 });

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [calm, cap.compact]);

  return (
    <div ref={host} style={{ perspective: "1400px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y + (flip ? -4 : 4),
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* the screen's own light spilling onto the page behind it */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -bottom-10 top-8 rounded-[50%] opacity-60 blur-[70px]"
          style={{ background: `radial-gradient(ellipse, ${accent}33, transparent 68%)` }}
        />

        <div
          className="relative w-full overflow-hidden"
          style={{ height, clipPath: `url(#${clipId})` }}
        >
          {/* barrel clip — the actual curvature */}
          <svg className="absolute h-0 w-0" aria-hidden focusable="false">
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                {/* top and bottom edges bow outward; sides pull in slightly */}
                <path d="M0.012,0.055 C0.25,0.005 0.75,0.005 0.988,0.055 C0.998,0.30 0.998,0.70 0.988,0.945 C0.75,0.995 0.25,0.995 0.012,0.945 C0.002,0.70 0.002,0.30 0.012,0.055 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* media */}
          <Image
            src={poster}
            alt={label ? `${label} — Nexxovate` : "Nexxovate"}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          {wantsVideo && video && (
            <video
              ref={videoEl}
              src={near ? video : undefined}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                // no clip authored yet — fall back silently to the poster
                (e.currentTarget as HTMLVideoElement).style.display = "none";
              }}
            />
          )}

          {/* grade: cool the footage into the Nexxovate palette */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-color"
            style={{ background: `linear-gradient(120deg, ${accent}, #0a1020)` }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,6,10,0.92) 0%, rgba(5,6,10,0.25) 42%, rgba(5,6,10,0.05) 70%, rgba(5,6,10,0.4) 100%)",
            }}
          />

          {/* curvature falloff — the edges of a curved panel lose light */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,6,10,0.85) 0%, transparent 16%, transparent 84%, rgba(5,6,10,0.85) 100%)",
            }}
          />

          {/* specular sheen travelling across the glass */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(100deg, transparent, rgba(255,255,255,0.09), transparent)",
            }}
            animate={calm ? { x: "0%" } : { x: ["-60%", "260%"] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3.5 }}
          />

          {/* display structure — one pixel of scanline, no more */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* readout */}
          {(label || caption) && (
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
                />
                <span className="font-mono-ui text-[0.6rem] tracking-[0.2em] text-white/55">
                  {(label ?? "").toUpperCase()}
                </span>
              </div>
              {caption && (
                <p className="mt-2 max-w-[46ch] text-[0.85rem] leading-relaxed text-paper/75">
                  {caption}
                </p>
              )}
            </div>
          )}
        </div>

        {/* machined rails follow the curve of the panel */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M1.2,5.5 C25,0.5 75,0.5 98.8,5.5"
            fill="none"
            stroke={accent}
            strokeWidth="0.35"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1.2,94.5 C25,99.5 75,99.5 98.8,94.5"
            fill="none"
            stroke={accent}
            strokeWidth="0.35"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.div>
    </div>
  );
}
