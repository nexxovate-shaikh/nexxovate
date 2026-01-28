"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Orb Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full 
        bg-gradient-to-br from-black to-gray-800 text-white 
        flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.4)]
        hover:scale-105 transition-all duration-500"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-28 right-6 z-[9999] w-[400px]
        transition-all duration-700 ease-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <div className="rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 
        shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-hidden">

          {/* Header */}
          <div className="px-7 py-6 flex items-center justify-between border-b bg-white/60 backdrop-blur-xl">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Nexxovate Concierge</h3>
              <p className="text-xs text-gray-500 mt-0.5">Your intelligent business assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-black transition">
              <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="px-6 py-6 space-y-5">

            {/* Assistant bubble */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                N
              </div>
              <div className="bg-white rounded-2xl px-5 py-4 shadow-sm max-w-[260px] text-sm text-gray-700 leading-relaxed">
                👋 Welcome to Nexxovate.  
                We help organizations scale IT, adopt AI, strengthen security and access elite talent.
              </div>
            </div>

            {/* User placeholder bubble */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl px-5 py-3 text-sm shadow-md">
                I’d like to know more.
              </div>
            </div>

            {/* Assistant response */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                N
              </div>
              <div className="bg-white rounded-2xl px-5 py-4 shadow-sm max-w-[260px] text-sm text-gray-700 leading-relaxed">
                Great — would you like help with services, staffing, AI, cybersecurity, or transformation?
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 bg-white rounded-2xl border px-4 py-3 focus-within:ring-2 focus-within:ring-black/10">
              <input
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition">
                <Send size={16} />
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919916347839"
              target="_blank"
              className="block text-center mt-4 text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Prefer instant response? → Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
