"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPrefs } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   Hero media — a two-stage title sequence.

   Stage 1: the brand sting (your Google Flow logo film). It plays
   ONCE per browser session, then cross-fades out.
   Stage 2: the cinematic enterprise loop, running underneath.

   Why once per session and not every navigation: a logo film is a
   pleasure the first time and an obstacle the fourth. sessionStorage
   is the right granularity — it resets when they come back tomorrow,
   which is when it is a pleasure again.

   The sting is skipped entirely on reduced motion, Save-Data, and
   narrow screens, where the loop starts immediately. It is never
   the LCP element: the poster and the painted ground beneath it
   render first, both videos are preload="none", and the headline
   is not gated on either of them.
   ══════════════════════════════════════════════════════════════ */

const SEEN_KEY = "nexyra.sting.seen";

export default function HeroVideo({ className = "" }: { className?: string }) {
  const loopRef = useRef<HTMLVideoElement>(null);
  const stingRef = useRef<HTMLVideoElement>(null);
  const reduced = useMotionPrefs();

  const [allowed, setAllowed] = useState(false);
  const [showSting, setShowSting] = useState(false);
  const [stingDone, setStingDone] = useState(true);
  const [loopReady, setLoopReady] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    setAllowed(true);

    // Small screens skip the sting: it is a 16:9 centred lockup and
    // it crops badly in a portrait panel.
    if (window.matchMedia("(min-width: 768px)").matches) {
      let seen = true;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        // Private mode or blocked storage — treat as seen and skip
        // straight to the loop rather than replaying every time.
      }

      if (!seen) {
        setShowSting(true);
        setStingDone(false);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* nothing to do */
        }
      }
    }
  }, [reduced]);

  useEffect(() => {
    if (!allowed) return;
    loopRef.current?.play().catch(() => {});
  }, [allowed]);

  useEffect(() => {
    if (!showSting) return;
    stingRef.current?.play().catch(() => {
      // If autoplay is refused there is nothing to wait for.
      setStingDone(true);
      setShowSting(false);
    });
  }, [showSting]);

  const endSting = () => {
    setStingDone(true);
    // Unmount after the cross-fade so the element is not holding a
    // decoded frame buffer for a video nobody will watch again.
    setTimeout(() => setShowSting(false), 1000);
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Always-painted poster: there is never an empty frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/video/hero-cinematic-poster.jpg')" }}
      />

      {/* ── Stage 2: ambient loop ── */}
      {allowed && (
        <video
          ref={loopRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: loopReady ? 1 : 0 }}
          poster="/video/hero-cinematic-poster.jpg"
          preload="none"
          muted
          loop
          playsInline
          disablePictureInPicture
          onCanPlayThrough={() => setLoopReady(true)}
        >
          <source src="/video/hero-cinematic.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Stage 1: brand sting ── */}
      {showSting && (
        <>
          <video
            ref={stingRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
            style={{ opacity: stingDone ? 0 : 1 }}
            preload="none"
            muted
            playsInline
            disablePictureInPicture
            onEnded={endSting}
          >
            <source src="/video/brand-sting.mp4" type="video/mp4" />
          </video>

          {!stingDone && (
            <button
              type="button"
              onClick={endSting}
              className="font-mono-label absolute bottom-5 right-5 z-20 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
            >
              Skip
            </button>
          )}
        </>
      )}
    </div>
  );
}
