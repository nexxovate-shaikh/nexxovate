"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionPrefs, EASE } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   The Nexyra concierge — a humanoid launcher.

   Drawn rather than illustrated, so the whole character is a few
   SVG paths that inherit the brand tokens: platinum shell,
   champagne visor, charcoal ground. No image to re-export when
   the palette moves.

   It has four states, and they exist for a reason:

     idle      breathing, blinking, occasional glance
     noticing  after a while it looks at you and raises a hand,
               with a speech bubble. This is the "please click me"
               moment, and it fires ONCE. A mascot that keeps
               waving is a mascot people close.
     hover     eyes arch into a smile, leans in slightly
     pressed   a quick squash on click

   Everything stops under prefers-reduced-motion: the character
   still renders, at rest, with a static prompt beside it.
   ══════════════════════════════════════════════════════════════ */

type Mood = "idle" | "noticing" | "hover";

export default function ConciergeBot({
  onOpen,
  prompt = "Need a hand? Ask me anything.",
}: {
  onOpen: () => void;
  prompt?: string;
}) {
  const reduced = useMotionPrefs();

  const [mood, setMood] = useState<Mood>("idle");
  const [blink, setBlink] = useState(false);
  const [glance, setGlance] = useState(0); // -1 | 0 | 1
  const [bubble, setBubble] = useState(false);
  const [noticed, setNoticed] = useState(false);

  /* ── Blinking. Irregular on purpose: a metronome blink reads as
        a loading spinner, not a face. ── */
  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        schedule();
      }, 2600 + Math.random() * 3600);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [reduced]);

  /* ── Occasional glance left or right, so it reads as alive
        rather than staring. ── */
  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timer = setTimeout(() => {
        setGlance(Math.random() > 0.5 ? 1 : -1);
        setTimeout(() => setGlance(0), 1100);
        schedule();
      }, 5000 + Math.random() * 6000);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [reduced]);

  /* ── The invitation. Once, after eight seconds. ── */
  useEffect(() => {
    if (noticed) return;

    const t = setTimeout(() => {
      setBubble(true);
      setNoticed(true);
      if (!reduced) {
        setMood("noticing");
        setTimeout(() => setMood((m) => (m === "noticing" ? "idle" : m)), 2600);
      }
      // The bubble outlives the wave — it is the part that carries
      // the actual message.
      setTimeout(() => setBubble(false), 9000);
    }, 8000);

    return () => clearTimeout(t);
  }, [noticed, reduced]);

  const active = mood === "hover";
  const waving = mood === "noticing" && !reduced;

  return (
    <div className="flex items-end gap-3">
      {/* ── Speech bubble ── */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="glass mb-3 hidden max-w-[15rem] rounded-[14px] rounded-br-[4px] px-4 py-3 sm:block"
          >
            <p className="text-[13px] leading-snug text-text">{prompt}</p>
            <p className="mt-1 text-[11.5px] text-faint">Click to start</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── The character ── */}
      <motion.button
        type="button"
        onClick={onOpen}
        onHoverStart={() => setMood("hover")}
        onHoverEnd={() => setMood("idle")}
        onFocus={() => setMood("hover")}
        onBlur={() => setMood("idle")}
        whileTap={reduced ? undefined : { scale: 0.93 }}
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
        aria-label="Open the Nexyra concierge"
        className="relative grid h-[74px] w-[74px] place-items-center rounded-full"
      >
        {/* Halo — one slow ring, not a strobe. */}
        {!reduced && (
          <motion.span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "var(--color-champagne)" }}
            animate={{ scale: [1, 1.32], opacity: [0.4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}

        {/* Plinth */}
        <span
          className="absolute inset-0 rounded-full border border-line-lit"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 15%, var(--color-surface-2), var(--color-ink) 70%)",
            boxShadow: active
              ? "0 10px 34px -12px rgba(217,174,99,0.55)"
              : "0 8px 26px -14px rgba(0,0,0,0.9)",
            transition: "box-shadow 400ms ease",
          }}
          aria-hidden="true"
        />

        <motion.svg
          viewBox="0 0 120 120"
          className="relative h-[58px] w-[58px]"
          animate={
            reduced
              ? {}
              : {
                  y: active ? -3 : [0, -2.5, 0],
                  rotate: waving ? [0, -3, 3, -2, 0] : 0,
                }
          }
          transition={{
            y: active
              ? { duration: 0.3, ease: EASE }
              : { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 1.5, ease: "easeInOut" },
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cb-shell" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#EEF2F6" />
              <stop offset="45%" stopColor="var(--color-platinum)" />
              <stop offset="100%" stopColor="#7C868F" />
            </linearGradient>
            <linearGradient id="cb-visor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#141821" />
              <stop offset="100%" stopColor="#242B36" />
            </linearGradient>
            <linearGradient id="cb-eye" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-gilt)" />
              <stop offset="100%" stopColor="var(--color-champagne)" />
            </linearGradient>
          </defs>

          {/* Shoulders */}
          <path
            d="M30 108c0-14 13-24 30-24s30 10 30 24z"
            fill="url(#cb-shell)"
            opacity="0.92"
          />
          {/* Collar light */}
          <rect x="52" y="86" width="16" height="3" rx="1.5" fill="url(#cb-eye)" opacity="0.85" />

          {/* Antenna */}
          <line x1="60" y1="16" x2="60" y2="26" stroke="var(--color-platinum)" strokeWidth="2.5" strokeLinecap="round" />
          {reduced ? (
            <circle cx="60" cy="13" r="4" fill="url(#cb-eye)" />
          ) : (
            <motion.circle
              cx="60" cy="13" r="4" fill="url(#cb-eye)"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Head */}
          <rect x="26" y="26" width="68" height="58" rx="24" fill="url(#cb-shell)" />
          <rect x="26" y="26" width="68" height="58" rx="24" fill="none" stroke="#5E666F" strokeWidth="1" opacity="0.5" />

          {/* Ears */}
          <rect x="20" y="46" width="6" height="16" rx="3" fill="#8C959E" />
          <rect x="94" y="46" width="6" height="16" rx="3" fill="#8C959E" />

          {/* Visor */}
          <rect x="34" y="38" width="52" height="32" rx="16" fill="url(#cb-visor)" />

          {/* Eyes — the whole expression lives in these two shapes.
              Open: rounded rect. Blink: a flat line. Happy: an arc. */}
          <motion.g
            animate={reduced ? {} : { x: glance * 4 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {active ? (
              <>
                <path d="M43 56q6-8 12 0" stroke="url(#cb-eye)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M65 56q6-8 12 0" stroke="url(#cb-eye)" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : blink ? (
              <>
                <rect x="43" y="52" width="12" height="3" rx="1.5" fill="url(#cb-eye)" />
                <rect x="65" y="52" width="12" height="3" rx="1.5" fill="url(#cb-eye)" />
              </>
            ) : (
              <>
                <rect x="44" y="46" width="10" height="14" rx="5" fill="url(#cb-eye)" />
                <rect x="66" y="46" width="10" height="14" rx="5" fill="url(#cb-eye)" />
                {/* Catchlights — the detail that turns two lozenges
                    into eyes. */}
                <circle cx="47" cy="49.5" r="1.6" fill="#FFFDF7" opacity="0.9" />
                <circle cx="69" cy="49.5" r="1.6" fill="#FFFDF7" opacity="0.9" />
              </>
            )}
          </motion.g>

          {/* Mouth — a small arc that widens on hover. */}
          <motion.path
            fill="none"
            stroke="var(--color-platinum)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            animate={{ d: active ? "M52 66q8 7 16 0" : "M55 66q5 3 10 0" }}
            transition={{ duration: 0.28, ease: EASE }}
          />

          {/* Waving hand — only during the invitation. */}
          <AnimatePresence>
            {waving && (
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 22, -8, 20, 0] }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ originX: "94px", originY: "84px" }}
              >
                <circle cx="98" cy="76" r="8" fill="url(#cb-shell)" />
                <rect x="90" y="80" width="7" height="14" rx="3.5" fill="#8C959E" />
              </motion.g>
            )}
          </AnimatePresence>
        </motion.svg>
      </motion.button>
    </div>
  );
}
