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

/* ---------------- COMPONENT ---------------- */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<Lead>({});

  const bottomRef = useRef<HTMLDivElement>(null);

  /* 🌍 PAGE CONTEXT */
  const page =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const initialMessage = (() => {
    if (page.includes("training"))
      return "You’re exploring Nexxovate Training. Are you looking for corporate training or individual upskilling?";
    if (page.includes("services"))
      return "Looking for IT, AI, Cybersecurity, or Staffing services? Tell me your priority.";
    if (page.includes("about"))
      return "Want to understand how Nexxovate helps enterprises scale with confidence?";
    return "Welcome to Nexxovate. How can we help your business grow today?";
  })();

  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: initialMessage },
  ]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* ---------------- VOICE (TTS) ---------------- */
  function speak(text: string) {
    if (!voiceOn || typeof window === "undefined") return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = navigator.language || "en-US";
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
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  }

  /* ---------------- SALES + GOOGLE CRM ---------------- */
  async function handleUser(text: string) {
    const value = text.trim().toLowerCase();

    if (step === "interest") {
      setLead({ interest: text, page });
      setStep("business");
      bot("Got it. Is this for a Startup, Growing Business, or Enterprise?");
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
      setLead(finalLead);
      setStep("done");

      /* 🔥 GOOGLE SHEETS CRM SUBMIT */
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbygM38Rztf-R_CyivX9XtARIWoOLHoZQl1QAhzreAu52tzwyuXzqMUMpWBqnSTAUsA/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalLead),
          }
        );
      } catch (err) {
        console.error("Google CRM error", err);
      }

      bot(
        `Thank you, ${finalLead.name}.\n\nYour request has been received. Our team will contact you shortly with next steps.`
      );
      return;
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
      {/* 🟦 CHAT BUBBLE (UNCHANGED) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          shadow-[0_0_40px_rgba(59,130,246,0.6)]
          hover:scale-110 transition-all"
        />
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md">
          <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 sm:w-[400px]
            h-[78vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col">

            {/* ✅ HEADER WITH LOGO */}
            <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
              <img src="/logo.png" className="h-8 object-contain" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Nexxovate Concierge</p>
                <p className="text-xs text-gray-500">Business Growth Advisor</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm
                    ${m.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white shadow"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t bg-white flex gap-2">
              <button
                onClick={startListening}
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${listening ? "bg-red-500" : "bg-gray-200"}`}
              >
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
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center"
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
