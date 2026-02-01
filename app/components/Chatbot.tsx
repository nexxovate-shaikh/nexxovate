"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Mic, Volume2, VolumeX } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Role = "bot" | "user";
type Step =
  | "interest"
  | "business"
  | "challenge"
  | "name"
  | "email"
  | "otp"
  | "done";

type Message = {
  role: Role;
  text: string;
  options?: string[];
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<any>({});
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const page =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const locale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nWe help startups and enterprises solve complex IT, AI, cybersecurity, digital growth, and staffing challenges.\n\nWhat would you like to improve today?",
      options: [
        "Digital Marketing",
        "AI & Automation",
        "IT Services",
        "Staffing",
      ],
    },
  ]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* ---------------- VOICE (TTS) ---------------- */
  function speak(text: string) {
    if (!voiceOn || typeof window === "undefined") return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = locale;
    u.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function bot(text: string, options?: string[]) {
    setMessages((m) => [...m, { role: "bot", text, options }]);
    speak(text);
  }

  /* ---------------- SPEECH INPUT ---------------- */
  function startListening() {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = locale;
    rec.start();
    setListening(true);

    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onend = () => setListening(false);
  }

  /* ---------------- HELPERS ---------------- */
  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  /* ---------------- LOGIC ---------------- */
  async function handleUser(text: string) {
    const value = text.trim();

    /* 1️⃣ INTEREST */
    if (step === "interest") {
      setLead({ interest: value, page });
      setStep("business");

      bot(
        "Great choice. What stage is your organization currently in?",
        ["Startup", "Growing Business", "Enterprise"]
      );
      return;
    }

    /* 2️⃣ BUSINESS */
    if (step === "business") {
      setLead((l: any) => ({ ...l, businessType: value }));
      setStep("challenge");

      bot(
        "Please describe the main challenge or goal you’re facing.\n\nThe more detail you share, the better solution we design."
      );
      return;
    }

    /* 3️⃣ CHALLENGE */
    if (step === "challenge") {
      setLead((l: any) => ({ ...l, challenge: value }));
      setStep("name");

      bot("Thank you for sharing that.\n\nMay I know your name?");
      return;
    }

    /* 4️⃣ NAME */
    if (step === "name") {
      setLead((l: any) => ({ ...l, name: value }));
      setStep("email");

      bot(
        `Nice to meet you, ${value}.\n\nWhat’s the best work email to continue?`
      );
      return;
    }

    /* 5️⃣ EMAIL */
    if (step === "email") {
      if (!isValidEmail(value)) {
        bot("That email looks invalid. Please enter a real work email.");
        return;
      }

      setLead((l: any) => ({ ...l, email: value }));
      setStep("otp");

      await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      bot("We sent a verification code to your email.\n\nEnter OTP:");
      return;
    }

    /* 6️⃣ OTP */
    if (step === "otp") {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lead.email, otp: value }),
      });

      const data = await res.json();

      if (!data.success) {
        bot("Invalid OTP. Please try again.");
        return;
      }

      setStep("done");

      await fetch("/api/contact/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      bot(
        `Verified ✅\n\nThank you ${lead.name}. Our team will contact you shortly.`
      );
      return;
    }
  }

  function send(text?: string) {
    const value = text ?? input;
    if (!value.trim()) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text: value }]);
    setTimeout(() => handleUser(value), 300);
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* 🔵 NEO N BUBBLE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full flex items-center justify-center
          overflow-hidden hover:scale-110 transition"
        >
          <span className="absolute inset-0 animate-ping bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-40" />
          <span className="absolute inset-0 bg-[conic-gradient(#22d3ee,#6366f1,#a855f7,#22d3ee)] animate-spin" />
          <span className="relative z-10 text-white font-bold text-xl">N</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40">
          <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6
          w-full sm:w-[400px] h-[80vh] bg-white rounded-3xl flex flex-col">

            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <img src="/logo.png" className="h-7" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Nexxovate Concierge</p>
                <p className="text-xs text-gray-500">Enterprise Growth Advisor</p>
              </div>
              <button onClick={() => setVoiceOn(!voiceOn)}>
                {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i}>
                  <div className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                    <div className="bg-white shadow px-4 py-3 rounded-xl text-sm">
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 border rounded-full px-4 py-2 text-sm"
              />
              <button onClick={() => send()}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
