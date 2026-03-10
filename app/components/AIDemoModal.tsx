"use client";

import { useState } from "react";

export default function AIDemoModal({ onClose }: { onClose: () => void }) {

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {

    if (!question) return;

    setLoading(true);
    setResponse("");

    const res = await fetch("/api/ai-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setResponse(data.answer);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[500px] max-w-[90%] relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4">
          Ask Nexxovate AI
        </h3>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask how AI could improve your business..."
          className="w-full px-6 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="mt-4 flex justify-end">

          <button
            onClick={askAI}
            className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition"
          >
            Ask AI
          </button>

        </div>

        {loading && (
          <p className="mt-4 text-gray-500">
            AI is thinking...
          </p>
        )}

        {response && (
          <div className="mt-6 bg-gray-100 p-6 rounded-xl">
            <p className="text-gray-800">{response}</p>
          </div>
        )}

      </div>

    </div>
  );
}