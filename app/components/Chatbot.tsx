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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nWe help businesses scale Digital Marketing, IT Services, AI and Staffing.\n\nWhat would you like to improve today?",
    },
  ]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* ---------------- VOICE ---------------- */
  function speak(text: string) {
    if (!voiceOn) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function bot(text: string) {
    setMessages((m) => [...m, { role: "bot", text }]);
    speak(text);
  }

  /* ---------------- MIC ---------------- */
  function startListening() {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const r = new SR();
    r.lang = "en-US";
    setListening(true);
    r.start();

    r.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };

    r.onend = () => setListening(false);
  }

  /* ---------------- SALES FLOW ---------------- */
  async function handleUser(text: string) {
    const v = text.trim();
    const l = v.toLowerCase();

    if (step === "interest") {
      setLead({ interest: v, page });
      setStep("business");

      if (l.includes("marketing"))
        bot("Excellent. Is this for a Startup, Growing Business or Enterprise?");
      else if (l.includes("staff"))
        bot("Great. What best describes your organization size?");
      else if (l.includes("ai"))
        bot("Are you exploring AI for internal operations or customer-facing use?");
      else
        bot("Understood. What type of business are you representing?");
      return;
    }

    if (step === "business") {
      setLead((p) => ({ ...p, businessType: v }));
      setStep("name");
      bot("Perfect. May I know your name?");
      return;
    }

    if (step === "name") {
      setLead((p) => ({ ...p, name: v }));
      setStep("email");
      bot(`Nice to meet you, ${v}. What’s the best email to reach you?`);
      return;
    }

    if (step === "email") {
      const finalLead = { ...lead, email: v };
      setLead(finalLead);
      setStep("done");

      // ✅ REAL CRM SUBMISSION
      await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...finalLead,
          source: "Nexxovate Website Chatbot",
          timestamp: new Date().toISOString(),
        }),
      });

      bot(
        `Thank you, ${finalLead.name}.\n\nOur team will contact you shortly.`
      );
      return;
    }

    bot("Thank you for connecting with Nexxovate.");
  }

  function send() {
    if (!input.trim()) return;
    const t = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: t }]);
    setTimeout(() => handleUser(t), 300);
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* 🟦 RESTORED NEO ANIMATED CHAT BUBBLE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full
          flex items-center justify-center
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          shadow-[0_0_40px_rgba(59,130,246,0.6)]
          hover:scale-110 transition-transform
          overflow-hidden"
        >
          <span className="absolute inset-0 animate-pulse rounded-full
          bg-gradient-to-r from-cyan-300/40 via-blue-400/40 to-purple-400/40" />
          <span className="relative w-11 h-11 rounded-full bg-white/90
          backdrop-blur-xl flex items-center justify-center shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r
            from-blue-500 to-purple-600 animate-ping" />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md">
          <div className="fixed bottom-0 right-0 sm:right-6 sm:bottom-6
          sm:w-[400px] h-[78vh] sm:h-[600px]
          bg-white/95 rounded-t-3xl sm:rounded-3xl shadow-2xl
          flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
              <img src="/logo.png" className="h-7 object-contain" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Nexxovate Concierge</p>
                <p className="text-xs text-gray-500">Enterprise Growth Advisor</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm max-w-[78%]
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
              <button onClick={startListening} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Mic size={16} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 border rounded-full px-4 py-2 text-sm"
                placeholder="Type or speak…"
              />
              <button onClick={send} className="w-10 h-10 rounded-full
              bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
