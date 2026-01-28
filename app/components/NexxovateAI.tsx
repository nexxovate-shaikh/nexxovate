"use client";

import { useState } from "react";
import Image from "next/image";

export default function NexxovateAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[999] w-14 h-14 rounded-full bg-white border shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        <Image src="/logo.png" alt="AI" width={32} height={32} />
      </button>

      <div
        className={`fixed bottom-24 left-6 z-[999] w-[360px] bg-white rounded-3xl border shadow-2xl transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-4">
          <h4 className="font-semibold text-lg">Nexxovate Concierge</h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            We help organizations scale IT operations, build secure infrastructure,
            adopt AI, and access world-class talent.
          </p>

          <a
            href="https://wa.me/919916347839"
            target="_blank"
            className="block text-center bg-black text-white py-3 rounded-xl text-sm font-medium"
          >
            Speak with an expert
          </a>
        </div>
      </div>
    </>
  );
}
