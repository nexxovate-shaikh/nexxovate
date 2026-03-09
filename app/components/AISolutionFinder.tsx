"use client";

import { useState } from "react";

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
    <section className="py-24 bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Explore AI opportunities for your business
        </h2>

        <p className="mt-4 text-gray-600">
          Describe your challenge and Nexxovate AI will suggest a potential solution.
        </p>

        <div className="mt-10 flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: automate customer support"
            className="flex-1 border rounded-xl px-5 py-4"
          />

          <button
            onClick={analyzeProblem}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 rounded-xl"
          >
            Analyze
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-white border rounded-2xl p-6 text-left shadow">
            <p className="whitespace-pre-line text-gray-700">{result}</p>
          </div>
        )}

      </div>

    </section>
  );
}