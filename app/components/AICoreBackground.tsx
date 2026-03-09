"use client";

import { motion } from "framer-motion";

export default function AICoreBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">

      {/* Outer pulse */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/40"
      />

      {/* Middle pulse */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-[350px] h-[350px] rounded-full border border-pink-400/40"
      />

      {/* Core glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 blur-3xl opacity-40"
      />

    </div>
  );
}