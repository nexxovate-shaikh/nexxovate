"use client";

import { useEffect, useRef, useState } from "react";

export default function AIConciergeOrb({ onOpen }: { onOpen: () => void }) {
  const orbRef = useRef<HTMLDivElement>(null);

  const [scrollDir, setScrollDir] = useState<"left" | "right" | "idle">("idle");
  const lastScroll = useRef(0);

  /* ---------------- SCROLL BEHAVIOR ---------------- */
  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY;

      if (current > lastScroll.current) {
        setScrollDir("left");
      } else if (current < lastScroll.current) {
        setScrollDir("right");
      }

      lastScroll.current = current;

      clearTimeout((window as any).scrollTimeout);

      (window as any).scrollTimeout = setTimeout(() => {
        setScrollDir("idle");
      }, 300);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- CURSOR REACTION ---------------- */
  useEffect(() => {
    function move(e: MouseEvent) {
      if (!orbRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <button
      onClick={onOpen}
      aria-label="Open Nexxovate AI Concierge"
      className={`fixed bottom-6 right-6 z-[9999]
      w-20 h-20 rounded-full
      flex items-center justify-center
      overflow-hidden
      transition-all duration-500

      ${scrollDir === "left" ? "-translate-x-8 rotate-[-8deg]" : ""}
      ${scrollDir === "right" ? "translate-x-8 rotate-[8deg]" : ""}
      ${scrollDir === "idle" ? "animate-pulse" : ""}

      hover:scale-110`}
    >
      {/* ENERGY FIELD */}
      <span
        className="absolute inset-0 rounded-full
        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
        opacity-30 blur-xl animate-ping"
      />

      {/* ROTATING CORE */}
      <span
        className="absolute inset-0 rounded-full
        bg-[conic-gradient(from_0deg,#22d3ee,#6366f1,#a855f7,#22d3ee)]
        animate-[spin_8s_linear_infinite]"
      />

      {/* GLASS CORE */}
      <div
        ref={orbRef}
        className="relative z-10 w-14 h-14 rounded-full
        bg-white/20 backdrop-blur-xl
        border border-white/30
        flex items-center justify-center
        shadow-[0_0_40px_rgba(99,102,241,0.8)]"
      >
        <span className="text-white font-bold">AI</span>
      </div>
    </button>
  );
}