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

  /* ---------------- SALES LOGIC ---------------- */
  async function handleUser(text: string) {
    const value = text.trim();
    const lower = value.toLowerCase();

    // 1️⃣ INTEREST
    if (step === "interest") {
      setLead({ interest: value, page });
      setStep("business");

      if (lower.includes("marketing")) {
        bot(
          "Excellent. We scale digital growth using SEO, performance marketing, branding and conversion optimization.\n\nIs this for a Startup, Growing Business, or Enterprise?"
        );
      } else if (lower.includes("staff")) {
        bot(
          "We help companies hire faster with contract staffing, permanent hiring and dedicated teams.\n\nWhat best describes your organization size?"
        );
      } else if (lower.includes("ai")) {
        bot(
          "AI adoption is accelerating across enterprises.\n\nAre you exploring AI for internal efficiency or customer-facing solutions?"
        );
      } else {
        bot(
          "We deliver Managed IT, Cloud, Security and enterprise operations at scale.\n\nWhat type of organization are you representing?"
        );
      }
      return;
    }

    // 2️⃣ BUSINESS TYPE
    if (step === "business") {
      setLead((l) => ({ ...l, businessType: value }));
      setStep("name");
      bot("Perfect. May I know your name?");
      return;
    }

    // 3️⃣ NAME
    if (step === "name") {
      setLead((l) => ({ ...l, name: value }));
      setStep("email");
      bot(
        `Nice to meet you, ${value}.\n\nWhat’s the best email to share a tailored proposal or next steps?`
      );
      return;
    }

    // 4️⃣ EMAIL (FINAL SUBMIT)
    if (step === "email") {
      const finalLead = { ...lead, email: value };
      setLead(finalLead);
      setStep("done");

      // 🔥 REAL LEAD SUBMISSION
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...finalLead,
            source: "Nexxovate Website Concierge",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error("Lead submission failed", e);
      }

      bot(
        `Thank you, ${finalLead.name}.\n\nOur team will review your requirement and reach out shortly.\n\nIf needed, we can also schedule a strategy discussion.`
      );
      return;
    }

    bot("Thank you for connecting with Nexxovate.");
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
      {/* 🟦 NEO-TECH CHAT BUBBLE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Nexxovate Concierge"
          className="fixed bottom-6 right-6 z-[9999]
          w-16 h-16 rounded-full
          flex items-center justify-center
          bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600
          shadow-[0_0_40px_rgba(59,130,246,0.6)]
          hover:scale-110 transition-transform duration-300
          overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full animate-pulse
            bg-gradient-to-r from-cyan-300/40 via-blue-400/40 to-purple-400/40" />

          <span className="relative z-10 w-11 h-11 rounded-full
            bg-white/90 backdrop-blur-xl
            flex items-center justify-center
            shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full
              bg-gradient-to-r from-blue-500 to-purple-600
              animate-ping" />
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md">
          <div
            className="fixed bottom-0 left-0 right-0
            sm:left-auto sm:right-6 sm:bottom-6
            sm:w-[400px]
            h-[78vh] sm:h-[600px]
            bg-white/95 backdrop-blur-2xl
            rounded-t-3xl sm:rounded-3xl
            shadow-[0_40px_160px_rgba(0,0,0,0.45)]
            flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white/90">
              <div>
                <p className="text-sm font-semibold">
                  Nexxovate Business Concierge
                </p>
                <p className="text-xs text-gray-500">
                  Enterprise Growth Advisor
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setVoiceOn(!voiceOn)}>
                  {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white text-gray-800 shadow"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t bg-white">
              <div className="flex items-center gap-2">
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
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />

                <button
                  onClick={send}
                  className="w-10 h-10 rounded-full
                  bg-gradient-to-r from-blue-600 to-purple-600
                  text-white flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
