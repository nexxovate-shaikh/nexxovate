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
        "Now the important part.\n\nPlease describe the main challenge, bottleneck, or goal you’re dealing with right now.\n\nFeel free to be specific — the more context you share, the better solution we can design."
      );
      return;
    }

    /* 3️⃣ CHALLENGE (FREE TEXT) */
    if (step === "challenge") {
      setLead((l: any) => ({ ...l, challenge: value }));
      setStep("name");

      bot(
        "Thank you for sharing that — this is exactly the kind of problem we help solve.\n\nMay I know your name?"
      );
      return;
    }

    /* 4️⃣ NAME */
    if (step === "name") {
      setLead((l: any) => ({ ...l, name: value }));
      setStep("email");

      bot(
        `Nice to meet you, ${value}.\n\nWhat’s the best work email to share insights or next steps?`
      );
      return;
    }

    /* 5️⃣ EMAIL (VALIDATED) */
    if (step === "email") {
      if (!isValidEmail(value)) {
        bot(
          "That email doesn’t look valid.\n\nPlease enter a correct work email (example: name@company.com)."
        );
        return;
      }

      const finalLead = {
        ...lead,
        email: value,
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
        `Thank you, ${finalLead.name}.\n\nOur team will review your challenge and get back with a thoughtful, solution-oriented response.\n\nYou’re in good hands.`
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
      {/* 🔵 NEO PULSE CHAT BUBBLE (UNCHANGED) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full flex items-center justify-center
          overflow-hidden hover:scale-110 transition"
        >
          <span className="absolute inset-0 rounded-full animate-ping
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-40" />
          <span className="absolute inset-0 rounded-full animate-spin
          bg-[conic-gradient(#22d3ee,#6366f1,#a855f7,#22d3ee)] opacity-90" />
          <span className="relative z-10 w-12 h-12 rounded-full
          bg-white/85 backdrop-blur flex items-center justify-center">
            <span className="w-3 h-3 rounded-full
            bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40">
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
              <button onClick={() => setVoiceOn(!voiceOn)}>
                {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i}>
                  <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm max-w-[75%]
                      ${m.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white text-gray-900 shadow"}`}
                    >
                      {m.text}
                    </div>
                  </div>

                  {m.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.options.map((o) => (
                        <button
                          key={o}
                          onClick={() => send(o)}
                          className="px-3 py-1.5 rounded-full text-xs
                          bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2">
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
                onClick={() => send()}
                className="w-10 h-10 rounded-full
                bg-gradient-to-r from-blue-600 to-purple-600
                text-white flex items-center justify-center"
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
