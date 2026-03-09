"use client";

import { useEffect, useState } from "react";

export default function AIScrollAnalyzer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      const scrolled = (scrollPosition / totalHeight) * 100;
      setProgress(scrolled);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top AI progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999]">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 transition-all duration-150"
        />
      </div>

      {/* Vertical scanning line */}
      <div
        style={{ top: `${progress}%` }}
        className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-400/60 to-purple-500/0 pointer-events-none transition-all duration-150"
      />
    </>
  );
}