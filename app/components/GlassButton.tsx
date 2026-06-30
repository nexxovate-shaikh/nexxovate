
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function GlassButton({
  href,
  children,
  className = "",
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block ${className}`}
    >
      <Link
        href={href}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-2xl"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-400 opacity-90" />

        <motion.span
          className="absolute -left-1/3 top-0 h-full w-1/3 skew-x-[-20deg] bg-white/30"
          animate={{ x: ["-140%", "420%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />

        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 25px rgba(168,85,247,.35)",
              "0 0 60px rgba(236,72,153,.55)",
              "0 0 25px rgba(251,191,36,.35)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <span className="relative z-10 flex items-center gap-2">
          {children}
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}
