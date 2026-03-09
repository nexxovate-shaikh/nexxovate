"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TypingText from "./TypingText";

export default function AIDemoModal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function runDemo() {
    if (!input.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();

    setResponse(data.answer);
    setLoading(false);
  }

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
      >
        Try AI Demo
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold">
              Nexxovate AI Demo
            </h2>

            <p className="text-gray-600 mt-2">
              Ask how AI could improve your business.
            </p>

            {/* INPUT */}
            <div className="mt-6 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: automate customer support"
                className="flex-1 border rounded-full px-5 py-3 text-sm"
              />

              <button
                onClick={runDemo}
                className="bg-black text-white px-6 py-3 rounded-full text-sm"
              >
                Ask AI
              </button>
            </div>

            {/* LOADING */}
            {loading && (
              <p className="mt-6 text-purple-600 animate-pulse">
                AI analyzing your request...
              </p>
            )}

            {/* RESPONSE */}
            {response && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <TypingText text={response} />
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}