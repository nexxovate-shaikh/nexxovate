"use client";

import { useState } from "react";

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
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Get Your AI Automation Strategy
        </h2>

        <p className="mt-6 text-gray-600">
          Describe your business challenge and Nexxovate AI will generate a
          custom automation strategy report.
        </p>

        <textarea
          placeholder="Example: We want to automate customer support and reduce operational workload."
          className="w-full border rounded-xl p-4 mt-10"
          rows={4}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />

        <input
          placeholder="Your email address"
          className="w-full border rounded-xl p-4 mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={generate}
          className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl"
        >
          {loading ? "Generating..." : "Generate AI Report"}
        </button>

      </div>
    </section>
  );
}