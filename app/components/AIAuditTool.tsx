"use client";

import { useState } from "react";

export default function AIAuditTool() {

  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeWebsite() {

    if (!website) return;

    setLoading(true);

    const res = await fetch("/api/ai-audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website }),
    });

    const data = await res.json();

    setAnalysis(data.analysis);
    setLoading(false);
  }

  async function captureLead() {

    await fetch("/api/audit-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website, email }),
    });

    alert("Your AI audit report will be sent to your email.");
  }

  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Get a Free AI Automation Audit
        </h2>

        <p className="mt-4 text-purple-200">
          Discover how AI and automation can improve efficiency,
          reduce costs and accelerate growth in your organization.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4">

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter your company website"
            className="flex-1 px-6 py-4 rounded-full text-black"
          />

          <button
            onClick={analyzeWebsite}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Generate AI Audit
          </button>

        </div>

        {loading && (
          <p className="mt-6 text-purple-200">
            AI analyzing automation opportunities...
          </p>
        )}

        {analysis && (

          <div className="mt-10 bg-white text-black rounded-2xl p-8 text-left">

            <h3 className="text-xl font-semibold mb-4">
              AI Audit Preview
            </h3>

            <p className="text-gray-700">
              {analysis}
            </p>

            <div className="mt-6 flex gap-3">

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to receive full report"
                className="flex-1 border px-4 py-3 rounded-full"
              />

              <button
                onClick={captureLead}
                className="bg-purple-700 text-white px-6 py-3 rounded-full"
              >
                Send Report
              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}