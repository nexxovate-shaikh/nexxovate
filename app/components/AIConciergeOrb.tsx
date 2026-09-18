"use client";

/* ============================================================
   NEXXOVATE AI ENTITY

   An original humanoid presence in dark chrome — helm, visor
   aperture, shoulder plate, neck strut — lit by an electric key
   from the upper left and a restrained warm rim on the right.
   No face, no cartoon: this reads as engineered hardware.

   Used as the concierge launcher and, at small size, as the
   avatar inside the conversation.
   ============================================================ */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function NexxovateEntity({
  size = 72,
  talking = false,
  idOffset = "a",
}: {
  size?: number;
  talking?: boolean;
  idOffset?: string;
}) {
  const calm = useReducedMotion();
  const id = (name: string) => `${name}-${idOffset}`;

  return (
    <div style={{ width: size, height: size }} className="relative">
      {/* contact shadow, breathing against the float */}
      <motion.div
        className="absolute left-1/2 top-[90%] h-[10%] w-[52%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-md"
        animate={calm ? {} : { scaleX: [1, 0.82, 1], opacity: [0.5, 0.28, 0.5] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="relative"
        animate={calm ? {} : { y: [0, -3.5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        role="img"
        aria-label="Nexxovate AI"
      >
        <defs>
          {/* dark chrome body */}
          <linearGradient id={id("chrome")} x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#39435c" />
            <stop offset="28%" stopColor="#1a2130" />
            <stop offset="55%" stopColor="#0c111b" />
            <stop offset="78%" stopColor="#222b3d" />
            <stop offset="100%" stopColor="#0a0e17" />
          </linearGradient>

          {/* helm — brighter top facet catching the key light */}
          <linearGradient id={id("helm")} x1="0.15" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#5d6d8f" />
            <stop offset="22%" stopColor="#2a3348" />
            <stop offset="60%" stopColor="#111725" />
            <stop offset="100%" stopColor="#080b12" />
          </linearGradient>

          {/* visor cavity */}
          <linearGradient id={id("cavity")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05070c" />
            <stop offset="100%" stopColor="#0b1120" />
          </linearGradient>

          {/* the light inside the visor */}
          <linearGradient id={id("core")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d7cff" stopOpacity="0" />
            <stop offset="30%" stopColor="#7fa0ff" />
            <stop offset="52%" stopColor="#e8f0ff" />
            <stop offset="74%" stopColor="#7a5cff" />
            <stop offset="100%" stopColor="#7a5cff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={id("bloom")}>
            <stop offset="0%" stopColor="#9db8ff" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#4d7cff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4d7cff" stopOpacity="0" />
          </radialGradient>

          <clipPath id={id("visorClip")}>
            <rect x="41" y="40" width="38" height="11" rx="5.5" />
          </clipPath>
        </defs>

        {/* ambient bloom behind the entity */}
        <ellipse cx="60" cy="52" rx="40" ry="34" fill={`url(#${id("bloom")})`} opacity="0.55" />

        {/* ---- shoulder plate ---- */}
        <path
          d="M28 112 C28 92 41 82 60 82 C79 82 92 92 92 112 Z"
          fill={`url(#${id("chrome")})`}
        />
        {/* plate seam + lit top edge */}
        <path
          d="M28 112 C28 92 41 82 60 82 C79 82 92 92 92 112"
          fill="none"
          stroke="#8fa8d8"
          strokeOpacity="0.42"
          strokeWidth="1.1"
        />
        <path
          d="M45 96 L75 96"
          stroke="#4d7cff"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* chest indicator */}
        <motion.circle
          cx="60"
          cy="103"
          r="2.4"
          fill="#4d7cff"
          animate={calm ? {} : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ---- neck strut ---- */}
        <rect x="55" y="70" width="10" height="14" rx="3" fill="#0d121d" />
        <rect x="55" y="70" width="10" height="14" rx="3" fill="none" stroke="#4a5674" strokeOpacity="0.5" strokeWidth="0.8" />
        <path d="M57.5 73 h5 M57.5 77 h5" stroke="#8fa8d8" strokeOpacity="0.35" strokeWidth="0.7" />

        {/* ---- helm ---- */}
        <motion.g
          animate={calm ? {} : { rotate: [0, -1.6, 0, 1.6, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 62px" }}
        >
          <path
            d="M60 20 C76 20 86 31 86 47 C86 60 79 71 60 71 C41 71 34 60 34 47 C34 31 44 20 60 20 Z"
            fill={`url(#${id("helm")})`}
          />

          {/* crown ridge — the machined seam down the helm */}
          <path
            d="M60 20 C64 27 65 34 65 40"
            fill="none"
            stroke="#8fa8d8"
            strokeOpacity="0.3"
            strokeWidth="0.9"
          />
          {/* key-light edge */}
          <path
            d="M60 20 C46 20 36 30 35 44"
            fill="none"
            stroke="#a8c0f0"
            strokeOpacity="0.6"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          {/* warm rim, restrained */}
          <path
            d="M84 42 C85 55 79 66 66 69.5"
            fill="none"
            stroke="#e2c188"
            strokeOpacity="0.4"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* ---- visor aperture ---- */}
          <rect x="41" y="40" width="38" height="11" rx="5.5" fill={`url(#${id("cavity")})`} />

          <g clipPath={`url(#${id("visorClip")})`}>
            {/* the light bar */}
            <motion.rect
              x="41"
              y="43.4"
              width="38"
              height="4.2"
              fill={`url(#${id("core")})`}
              animate={
                calm
                  ? {}
                  : talking
                    ? { scaleY: [1, 0.35, 1, 0.6, 1], opacity: [1, 0.85, 1] }
                    : { scaleY: [1, 1, 0.12, 1, 1], opacity: [0.9, 1, 0.9] }
              }
              transition={{
                duration: talking ? 0.85 : 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "60px 45.5px" }}
            />

            {/* scan sweep travelling across the aperture */}
            <motion.rect
              x="-14"
              y="40"
              width="14"
              height="11"
              fill="#e8f0ff"
              opacity="0.55"
              animate={calm ? {} : { x: [-14, 80] }}
              transition={{
                duration: talking ? 1.4 : 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: talking ? 0.2 : 2.4,
              }}
            />
          </g>

          {/* aperture bezel */}
          <rect
            x="41"
            y="40"
            width="38"
            height="11"
            rx="5.5"
            fill="none"
            stroke="#5f6f92"
            strokeOpacity="0.65"
            strokeWidth="0.9"
          />

          {/* side vents — machined detail */}
          <path d="M37 55 h7 M37 59 h5" stroke="#8fa8d8" strokeOpacity="0.28" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M83 55 h-7 M83 59 h-5" stroke="#8fa8d8" strokeOpacity="0.28" strokeWidth="0.8" strokeLinecap="round" />

          {/* specular highlight on the crown */}
          <ellipse cx="50" cy="29" rx="9" ry="4" fill="#ffffff" opacity="0.09" transform="rotate(-22 50 29)" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

/* ------------------------------------------------------------
   The launcher
------------------------------------------------------------ */

export default function AIConciergeOrb({ onOpen }: { onOpen: () => void }) {
  const calm = useReducedMotion();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setHint(true), 6000);
    const hide = setTimeout(() => setHint(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-[9999] flex items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-deep mb-3 hidden max-w-[230px] rounded-2xl px-4 py-3 sm:block"
          >
            <p className="font-mono-ui text-[0.56rem] tracking-[0.2em] text-electric-soft">
              NEXXOVATE CONCIERGE
            </p>
            <p className="mt-1.5 text-[0.8rem] leading-snug text-paper/85">
              Tell me what you&apos;re trying to change. I&apos;ll route it to the
              right team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onOpen}
        aria-label="Open the Nexxovate concierge"
        className="group relative flex h-[64px] w-[64px] items-center justify-center sm:h-[86px] sm:w-[86px]"
      >
        {/* orbit rings — the Nexus language, compressed */}
        <motion.span
          className="absolute inset-0 rounded-full border border-electric/30"
          animate={calm ? {} : { rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-[7px] rounded-full border border-white/10"
          animate={calm ? {} : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 42px -6px rgba(77,124,255,0.55)" }}
          animate={calm ? {} : { opacity: [0.5, 0.95, 0.5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <span className="absolute inset-[6px] rounded-full bg-[radial-gradient(circle_at_35%_28%,#1a2233,#05070c_72%)] ring-1 ring-white/[0.09] transition-transform duration-500 group-hover:scale-[1.04]" />

        <span className="relative">
          <NexxovateEntity size={46} idOffset="launcher" />
        </span>
      </button>
    </div>
  );
}
