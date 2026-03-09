"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function AIWebsiteAnalyzer() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeWebsite() {
    if (!url.trim()) return;

    setLoading(true);

    const res = await fetch("/api/website-analyzer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    setAnalysis(data.result);
    setLoading(false);
  }

  return (
    <Reveal>
      <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            AI Website Analyzer
          </h2>

          <p className="mt-4 text-gray-600">
            Enter your website and our AI will identify automation,
            performance and growth opportunities.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website (example.com)"
              className="flex-1 border rounded-full px-6 py-4 text-sm shadow-sm"
            />

            <button
              onClick={analyzeWebsite}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Analyze Website
            </button>
          </div>

          {loading && (
            <p className="mt-6 text-gray-500">
              AI analyzing your website...
            </p>
          )}

          {analysis && (
            <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 text-left">
              <h3 className="text-lg font-semibold mb-4">
                AI Analysis Results
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {analysis}
              </p>

              <a
                href="/ai-consultation"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full text-sm"
              >
                Get Expert AI Strategy
              </a>
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}