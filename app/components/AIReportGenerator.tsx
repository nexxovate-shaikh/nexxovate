"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function AIReportGenerator() {
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    await fetch("/api/ai-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem, email }),
    });

    setLoading(false);
    alert("Your AI report has been emailed!");
  }

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

      {/* background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-4 h-4" />
          AI STRATEGY GENERATOR
        </div>

        {/* title */}
        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Generate Your
          <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            AI Automation Strategy
          </span>
        </h2>

        {/* description */}
        <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Describe your operational challenge and Nexxovate AI will generate a
          tailored automation strategy outlining potential AI solutions,
          platform architecture and transformation opportunities.
        </p>

        {/* form card */}
        <div className="mt-12 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10 text-left">

          {/* textarea */}
          <textarea
            placeholder="Example: We want to automate customer support and reduce operational workload."
            className="w-full border border-gray-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          {/* email */}
          <input
            placeholder="Your email address"
            className="w-full border border-gray-200 rounded-xl p-4 mt-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* button */}
          <button
            onClick={generate}
            className="mt-6 w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-[1.02] transition shadow-md"
          >
            {loading ? "Generating AI Strategy..." : "Generate AI Strategy Report"}
          </button>

        </div>

      </div>
    </section>
  );
}