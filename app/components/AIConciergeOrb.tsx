"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Premium animated robot mascot — layered SVG with gradient shading,
 * specular highlights and soft cast shadows for a polished, dimensional
 * look (not flat shapes). Idle behaviors: floating bob, head tilt,
 * blinking visor, glowing cheek lights, antenna pulse, waving arm,
 * and a soft contact shadow that breathes with the float.
 */
function RobotMascot({ size = 64 }: { size?: number }) {
  const reduce = useReducedMotion();

  return (
    <div style={{ width: size, height: size }} className="relative">
      {/* contact shadow — breathes opposite to the float for grounding */}
      <motion.div
        className="absolute left-1/2 top-[88%] h-[14%] w-[55%] -translate-x-1/2 rounded-full bg-black/30 blur-md"
        animate={reduce ? {} : { scaleX: [1, 0.82, 1], opacity: [0.35, 0.18, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 120 132"
        width={size}
        height={size}
        className="relative drop-shadow-[0_8px_18px_rgba(124,58,237,0.45)]"
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="shellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ede9fe" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="shellShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="visorBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1b1130" />
            <stop offset="100%" stopColor="#0a0717" />
          </linearGradient>
          <linearGradient id="eyeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="45%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="55%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="antennaGlow">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="metalRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
          <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" floodColor="#4c1d95" floodOpacity="0.35" />
          </filter>
        </defs>

        <motion.g
          animate={reduce ? {} : { rotate: [-5, 5, -5] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 26px" }}
        >
          <line x1="60" y1="26" x2="60" y2="8" stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="6" r="9" fill="url(#antennaGlow)" />
          <motion.circle
            cx="60"
            cy="6"
            r="4"
            fill="#fde68a"
            animate={reduce ? {} : { opacity: [0.7, 1, 0.7], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.7, repeat: Infinity }}
          />
        </motion.g>

        <motion.g
          animate={reduce ? {} : { rotate: [-3, 3, -3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 46px" }}
          filter="url(#softShadow)"
        >
          <rect x="27" y="20" width="66" height="50" rx="25" fill="url(#shellGrad)" />
          <rect x="27" y="44" width="66" height="26" rx="20" fill="url(#shellShade)" />
          <ellipse cx="48" cy="30" rx="16" ry="6" fill="#ffffff" opacity="0.55" />
          <rect x="27" y="20" width="66" height="50" rx="25" fill="none" stroke="url(#metalRim)" strokeWidth="1.4" />

          <rect x="39" y="36" width="42" height="21" rx="10.5" fill="url(#visorBg)" />
          <rect x="39" y="36" width="42" height="21" rx="10.5" fill="none" stroke="#a78bfa" strokeOpacity="0.4" strokeWidth="1" />
          <path d="M42 39 Q60 33 78 39 L76 43 Q60 38 44 43 Z" fill="#ffffff" opacity="0.08" />

          <motion.g
            animate={reduce ? {} : { scaleY: [1, 1, 0.08, 1, 1] }}
            transition={{ duration: 4.6, repeat: Infinity, times: [0, 0.86, 0.9, 0.94, 1] }}
            style={{ transformOrigin: "60px 46px" }}
          >
            <circle cx="50" cy="46.5" r="4.4" fill="url(#eyeGrad)" />
            <circle cx="70" cy="46.5" r="4.4" fill="url(#eyeGrad)" />
            <circle cx="48.4" cy="45" r="1.1" fill="#ffffff" />
            <circle cx="68.4" cy="45" r="1.1" fill="#ffffff" />
          </motion.g>

          <motion.circle
            cx="33" cy="50" r="2.2" fill="#e879f9"
            animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <motion.circle
            cx="87" cy="50" r="2.2" fill="#e879f9"
            animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }}
          />
        </motion.g>

        <rect x="54" y="68" width="12" height="6" rx="3" fill="#c4b5fd" />

        <g filter="url(#softShadow)">
          <rect x="32" y="74" width="56" height="46" rx="20" fill="url(#shellGrad)" />
          <rect x="32" y="96" width="56" height="24" rx="16" fill="url(#shellShade)" />
          <ellipse cx="50" cy="82" rx="14" ry="5" fill="#ffffff" opacity="0.5" />
          <rect x="32" y="74" width="56" height="46" rx="20" fill="none" stroke="url(#metalRim)" strokeWidth="1.4" />

          <circle cx="60" cy="96" r="13" fill="url(#coreGlow)" opacity="0.55" />
          <motion.circle
            cx="60" cy="96" r="7.5"
            fill="#fff7ed"
            animate={reduce ? {} : { opacity: [0.75, 1, 0.75], scale: [0.94, 1.08, 0.94] }}
            transition={{ duration: 2.3, repeat: Infinity }}
          />
          <circle cx="60" cy="96" r="7.5" fill="none" stroke="#e879f9" strokeWidth="1" opacity="0.6" />

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={45 + i * 15}
              cy="112"
              r="2.4"
              fill="#c4b5fd"
              animate={reduce ? {} : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </g>

        <g filter="url(#softShadow)">
          <rect x="16" y="80" width="17" height="11" rx="5.5" fill="url(#shellGrad)" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="16" cy="85.5" r="6" fill="url(#shellGrad)" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="1" />
        </g>

        <motion.g
          animate={reduce ? {} : { rotate: [0, -32, -6, -32, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
          style={{ transformOrigin: "92px 82px" }}
          filter="url(#softShadow)"
        >
          <rect x="87" y="74" width="17" height="11" rx="5.5" fill="url(#shellGrad)" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="104" cy="79.5" r="6" fill="url(#shellGrad)" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="1" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

/**
 * Floating launcher for the chatbot. Renders only while the chat panel
 * is closed (parent controls visibility by mounting/unmounting this).
 * Shows an attention bubble a few seconds after first paint, then hides
 * it again so it doesn't nag.
 */
export default function AIConciergeOrb({ onOpen }: { onOpen: () => void }) {
  const [showTip, setShowTip] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTip(true), 4000);
    const hideTimer = setTimeout(() => setShowTip(false), 9500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9997] flex flex-col items-end gap-4">
      <AnimatePresence>
        {showTip && (
          <motion.button
            onClick={onOpen}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="rounded-2xl border border-white/10 bg-[#0a0a12]/95 px-4 py-3 text-left text-sm text-zinc-200 backdrop-blur-2xl shadow-[0_15px_45px_rgba(124,58,237,.35)]"
          >
            👋 Hi! Need help finding the right AI solution?
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-28 w-28 items-center justify-center"
        aria-label="Open Nexxovate AI concierge"
      >
        {/* soft ambient glow behind the character — no hard circle edge */}
        <motion.span
          className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-300 opacity-30 blur-2xl"
          animate={reduce ? {} : { scale: [1, 1.18, 1], opacity: [0.22, 0.4, 0.22] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <span className="relative">
          <RobotMascot size={84} />
        </span>

        <span className="absolute right-3 top-2 h-3.5 w-3.5 rounded-full border-2 border-[#04040A] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      </motion.button>
    </div>
  );
}
