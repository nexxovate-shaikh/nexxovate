"use client";

import { useEffect } from "react";

export default function CursorGlow() {

  useEffect(() => {
    const glow = document.getElementById("cursor-glow");

    window.addEventListener("mousemove", (e) => {
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    });
  }, []);

  return (
    <div
      id="cursor-glow"
      className="fixed w-[400px] h-[400px] pointer-events-none rounded-full blur-[120px] bg-purple-500/20 -translate-x-1/2 -translate-y-1/2 z-0"
    />
  );
}