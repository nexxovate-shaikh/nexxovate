"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Mic, Volume2, VolumeX } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Role = "bot" | "user";
type Step = "interest" | "business" | "name" | "email" | "done";

type Message = {
  role: Role;
  text: string;
};

type Lead = {
  interest?: string;
  businessType?: string;
  name?: string;
  email?: string;
  page?: string;
};

/* ---------------- CONFIG ---------------- */
const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbygM38Rztf-R_CyivX9XtARIWoOLHoZQl1QAhzreAu52tzwyuXzqMUMpWBqnSTAUsA/exec";

/* ---------------- COMPONENT ---------------- */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<Lead>({});

  const bottomRef = useRef<HTMLDivElement>(null);

  const page =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const initialMessage =
    page.includes("training")
      ? "You’re exploring Nexxovate Training. Are you looking for corporate training or individual upskilling?"
      : page.includes("services")
      ? "Looking for IT, AI, Cybersecurity, or Staffing services? Tell me your priority."
      : page.includes("about")
      ? "Want to understand how Nexxovate helps enterprises scale with confidence?"
      : "Welcome to Nexxovate. How can we help your business grow today?";

  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: initialMessage },
  ]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* ---------------- VOICE ---------------- */
  function speak(text: string) {
    if (!voiceOn || typeof window === "undefined") return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function bot(text: string) {
    setMessages((m) => [...m, { role: "bot", text }]);
    speak(text);
  }

  /* ---------------- VOICE INPUT ---------------- */
  function startListening() {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = navigator.language || "en-US";
    rec.start();
    setListening(true);

    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onend = () => setListening(false);
  }

  /* ---------------- LOGIC ---------------- */
  async function handleUser(text: string) {
    const value = text.trim().toLowerCase();

    if (step === "interest") {
      setLead({ interest: text, page });
      setStep("business");

      bot(
        value.includes("marketing")
          ? "Great choice. Is this for a Startup, Growing Business, or Enterprise?"
          : value.includes("staff")
          ? "Understood. What best describes your organization size?"
          : value.includes("ai")
          ? "Are you exploring AI for internal efficiency or customer-facing solutions?"
          : "What type of organization are you representing?"
      );
      return;
    }

    if (step === "business") {
      setLead((l) => ({ ...l, businessType: text }));
      setStep("name");
      bot("Perfect. May I know your name?");
      return;
    }

    if (step === "name") {
      setLead((l) => ({ ...l, name: text }));
      setStep("email");
      bot(`Nice to meet you, ${text}. What’s the best email to reach you?`);
      return;
    }

    if (step === "email") {
      const finalLead = { ...lead, email: text };
      setStep("done");

      try {
        await fetch(GOOGLE_SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...finalLead,
            source: "Website Chatbot",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error("Lead submission failed", e);
      }

      bot(
        `Thank you, ${finalLead.name}. Our team will contact you shortly.`
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

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* 🔵 PREMIUM ANIMATED CHAT BUBBLE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          shadow-[0_0_50px_rgba(59,130,246,0.7)]
          hover:scale-110 transition overflow-hidden"
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
              <button onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm max-w-[75%]
                  ${m.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white shadow"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2">
              <button onClick={startListening} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Mic size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type or speak…"
                className="flex-1 border rounded-full px-4 py-2 text-sm"
              />
              <button onClick={send} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
