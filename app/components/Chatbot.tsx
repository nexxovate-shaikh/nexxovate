"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Mic } from "lucide-react";

type Role = "bot" | "user";
type Step =
  | "interest"
  | "business"
  | "challenge"
  | "name"
  | "email"
  | "done";

type Message = { role: Role; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<any>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nWe help startups and enterprises scale IT operations, AI adoption, cybersecurity, digital growth, and staffing.\n\nWhat area are you looking to improve right now?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const page =
    typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function bot(text: string) {
    setMessages((m) => [...m, { role: "bot", text }]);
  }

  async function handleUser(text: string) {
    const lower = text.toLowerCase();

    /* 1️⃣ SERVICE INTEREST */
    if (step === "interest") {
      setLead({ interest: text, page });
      setStep("business");

      if (lower.includes("marketing")) {
        bot(
          "Got it. We help businesses generate demand through performance marketing, SEO, and conversion optimization.\n\nWhat stage is your business currently in?"
        );
      } else if (lower.includes("ai")) {
        bot(
          "AI can unlock massive efficiency gains when applied correctly.\n\nAre you exploring AI for internal operations or customer-facing solutions?"
        );
      } else if (lower.includes("staff")) {
        bot(
          "Understood. We support fast-growing teams with contract staffing, permanent hiring, and dedicated squads.\n\nWhat best describes your organization?"
        );
      } else {
        bot(
          "We work extensively on IT operations, cloud, security, and enterprise modernization.\n\nWhat stage is your organization in?"
        );
      }
      return;
    }

    /* 2️⃣ BUSINESS STAGE */
    if (step === "business") {
      setLead((l: any) => ({ ...l, businessType: text }));
      setStep("challenge");

      bot(
        "Thanks. What is the **main challenge or goal** you’re trying to solve right now?\n\n(For example: scaling faster, reducing costs, improving security, hiring faster, or increasing revenue.)"
      );
      return;
    }

    /* 3️⃣ PAIN / GOAL */
    if (step === "challenge") {
      setLead((l: any) => ({ ...l, challenge: text }));
      setStep("name");

      bot(
        "That makes sense — this is exactly where Nexxovate helps clients create measurable impact.\n\nMay I know your name?"
      );
      return;
    }

    /* 4️⃣ NAME */
    if (step === "name") {
      setLead((l: any) => ({ ...l, name: text }));
      setStep("email");

      bot(
        `Nice to meet you, ${text}.\n\nWhat’s the best email to share insights or a tailored recommendation?`
      );
      return;
    }

    /* 5️⃣ EMAIL + SUBMIT */
    if (step === "email") {
      const finalLead = {
        ...lead,
        email: text,
        source: "Website Chatbot",
        timestamp: new Date().toISOString(),
      };

      await fetch("/api/contact/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalLead),
      });

      setStep("done");

      bot(
        `Thank you, ${finalLead.name}.\n\nOur team will review your requirement and reach out shortly with next steps.\n\nIf helpful, we can also schedule a focused strategy discussion.`
      );
    }
  }

  function send() {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(() => handleUser(text), 300);
  }

  return (
    <>
      {/* 🔵 NEO ANIMATED CHAT BUBBLE – UNCHANGED */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          shadow-[0_0_50px_rgba(59,130,246,0.7)]
          overflow-hidden hover:scale-110 transition"
        >
          <span className="absolute inset-0 animate-spin
          bg-[conic-gradient(#22d3ee,#6366f1,#a855f7,#22d3ee)] opacity-80" />
          <span className="relative z-10 w-12 h-12 mx-auto mt-2 rounded-full
          bg-white/90 backdrop-blur flex items-center justify-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur">
          <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6
          w-full sm:w-[400px] h-[80vh] sm:h-[600px]
          bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col">

            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <img src="/logo.png" className="h-7" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Nexxovate Concierge</p>
                <p className="text-xs text-gray-500">Enterprise Growth Advisor</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm max-w-[75%]
                    ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white shadow"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Mic size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type or speak…"
                className="flex-1 border rounded-full px-4 py-2 text-sm"
              />
              <button
                onClick={send}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
