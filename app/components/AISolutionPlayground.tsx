"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import TypingText from "./TypingText";
export default function AISolutionPlayground() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeProblem() {
    if (!problem.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai-solution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem }),
    });

    const data = await res.json();

    setResult(data.solution);
    setLoading(false);
  }

  return (
    <Reveal>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Try our AI Solution Advisor
          </h2>

          <p className="mt-4 text-gray-600">
            Describe a challenge in your business and our AI will suggest a
            possible automation or technology solution.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <input
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Example: Our customer support team spends too much time answering repetitive questions"
              className="flex-1 border rounded-full px-6 py-4 text-sm shadow-sm"
            />

            <button
              onClick={analyzeProblem}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Analyze with AI
            </button>
          </div>

          {loading && (
            <p className="mt-6 text-gray-500 text-sm">
              AI analyzing your challenge...
            </p>
          )}

          {result && (
            <div className="mt-10 bg-white rounded-2xl shadow-xl p-8 text-left">
              <h3 className="text-lg font-semibold mb-3">
                Suggested AI Solution
              </h3>

              <TypingText text={result} />

              <a
                href="/ai-consultation"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full text-sm"
              >
                Discuss with Nexxovate Experts
              </a>
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}