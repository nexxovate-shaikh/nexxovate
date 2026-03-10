"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function AISolutionFinder() {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  function analyzeProblem() {

    const text = query.toLowerCase();

    if (text.includes("support") || text.includes("customer")) {
      setResult(
        "Suggested Solution: AI Customer Support Assistant.\n\nImpact: Reduce support workload by 40-60% using automated responses and intelligent routing."
      );
      return;
    }

    if (text.includes("data") || text.includes("analytics")) {
      setResult(
        "Suggested Solution: AI Analytics Dashboard.\n\nImpact: Transform business data into real-time insights and predictive intelligence."
      );
      return;
    }

    if (text.includes("automation") || text.includes("workflow")) {
      setResult(
        "Suggested Solution: Business Workflow Automation.\n\nImpact: Automate repetitive processes and improve operational efficiency."
      );
      return;
    }

    setResult(
      "Suggested Solution: AI Consultation.\n\nOur experts can assess your systems and design a tailored AI implementation roadmap."
    );
  }

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

      {/* background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-4 h-4" />
          AI OPPORTUNITY FINDER
        </div>

        {/* Title */}
        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Discover AI Solutions
          <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            for Your Business
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Describe your operational challenge and Nexxovate AI will recommend
          potential automation strategies and intelligent solutions.
        </p>

        {/* Input Panel */}
        <div className="mt-12 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: automate customer support"
              className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
            />

            <button
              onClick={analyzeProblem}
              className="px-8 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-[1.02] transition shadow-md"
            >
              Analyze Opportunity
            </button>

          </div>

        </div>

        {/* Result Panel */}
        {result && (
          <div className="mt-10 text-left bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl p-8 shadow-xl">

            <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Nexxovate AI Recommendation
            </div>

            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {result}
            </p>

          </div>
        )}

      </div>

    </section>
  );
}