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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nWe help startups and enterprises scale IT operations, AI adoption, cybersecurity, digital growth, and staffing.\n\nWhat would you like to improve today?",
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
    u.rate = 0.95;
    u.lang = navigator.language || "en-US";
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
    const lower = text.toLowerCase();

    /* 1️⃣ INTEREST */
    if (step === "interest") {
      setLead({ interest: text, page });
      setStep("business");

      bot(
        "Great. What stage is your organization currently in?",
        ["Startup", "Growing Business", "Enterprise"]
      );
      return;
    }

    /* 2️⃣ BUSINESS */
    if (step === "business") {
      setLead((l: any) => ({ ...l, businessType: text }));
      setStep("challenge");

      bot(
        "Understood. What is the main goal or challenge you’re focused on right now?",
        [
          "Scaling Faster",
          "Reducing Costs",
          "Improving Security",
          "Hiring Talent",
          "Increasing Revenue",
        ]
      );
      return;
    }

    /* 3️⃣ CHALLENGE */
    if (step === "challenge") {
      setLead((l: any) => ({ ...l, challenge: text }));
      setStep("name");

      bot(
        "That’s a common challenge we solve for clients.\n\nMay I know your name?"
      );
      return;
    }

    /* 4️⃣ NAME */
    if (step === "name") {
      setLead((l: any) => ({ ...l, name: text }));
      setStep("email");

      bot(
        `Nice to meet you, ${text}.\n\nWhat’s the best email to share next steps or a tailored recommendation?`
      );
      return;
    }

    /* 5️⃣ EMAIL */
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
        `Thank you, ${finalLead.name}.\n\nOur team will review your requirement and reach out shortly.\n\nIf helpful, we can also schedule a focused strategy discussion.`
      );
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
      {/* 🟣 ULTRA NEO PULSE CHAT BUBBLE (FIXED) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Nexxovate Concierge"
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full
          flex items-center justify-center
          bg-black/80 backdrop-blur-xl
          shadow-[0_0_45px_rgba(168,85,247,0.6)]
          hover:scale-110 transition"
        >
          {/* spinning ring */}
          <span className="absolute inset-0 rounded-full animate-spin-slow
            bg-[conic-gradient(from_0deg,#22d3ee,#6366f1,#a855f7,#22d3ee)]
            blur-[2px]" />

          {/* inner glass */}
          <span className="relative z-10 w-12 h-12 rounded-full
            bg-black/90 flex items-center justify-center">
            <span className="w-3 h-3 rounded-full
              bg-gradient-to-r from-cyan-400 to-purple-500
              animate-pulse" />
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
                <p className="text-xs text-gray-500">
                  Enterprise Growth Advisor
                </p>
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
                  <div
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

                  {/* QUICK OPTIONS */}
                  {m.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.options.map((o) => (
                        <button
                          key={o}
                          onClick={() => send(o)}
                          className="px-3 py-1.5 rounded-full text-xs
                          bg-gradient-to-r from-blue-600 to-purple-600
                          text-white hover:opacity-90"
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
