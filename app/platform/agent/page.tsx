"use client";

import { useState } from "react";

export default function AgentPage() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askAI() {

    const res = await fetch("/api/ai-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setAnswer(data.answer);
  }

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-2xl font-bold">
        Nexxovate AI Agent
      </h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="mt-6 border px-4 py-3 w-full rounded"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-purple-600 text-white px-6 py-3 rounded"
      >
        Ask AI
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 p-6 rounded">
          {answer}
        </div>
      )}

    </div>
  );
}