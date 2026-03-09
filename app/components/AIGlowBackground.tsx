"use client";

export default function AIGlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[150px] animate-pulse" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-pink-600 opacity-30 blur-[150px] animate-pulse" />

      <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-[150px] animate-pulse" />

    </div>
  );
}