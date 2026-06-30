"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, Volume2, VolumeX } from "lucide-react";
import AIConciergeOrb from "./AIConciergeOrb";

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

/* ---------------- HEADER AVATAR ---------------- */

function HeaderAvatar({ talking }: { talking: boolean }) {
  return (
    <motion.div
      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/15 bg-[#0a0a12]/60 p-0.5"
      animate={{ scale: talking ? [1, 1.06, 1] : 1 }}
      transition={{ duration: 0.7, repeat: talking ? Infinity : 0, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 120 130" className="h-full w-full">
        <defs>
          <linearGradient id="hdrBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f3ff" />
            <stop offset="100%" stopColor="#ddd6fe" />
          </linearGradient>
          <linearGradient id="hdrVisorGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <rect x="30" y="22" width="60" height="46" rx="23" fill="url(#hdrBodyGrad)" stroke="#a78bfa" strokeWidth="2" />
        <rect x="40" y="36" width="40" height="20" rx="10" fill="#1e1033" />
        <motion.g
          animate={{ scaleY: talking ? [1, 0.3, 1, 0.3, 1] : [1, 1, 0.1, 1, 1] }}
          transition={{ duration: talking ? 0.8 : 4.5, repeat: Infinity }}
          style={{ transformOrigin: "60px 46px" }}
        >
          <circle cx="50" cy="46" r="4.2" fill="url(#hdrVisorGrad)" />
          <circle cx="70" cy="46" r="4.2" fill="url(#hdrVisorGrad)" />
        </motion.g>
        <rect x="35" y="68" width="50" height="42" rx="18" fill="url(#hdrBodyGrad)" stroke="#a78bfa" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<any>({});
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const page =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const locale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nI'm your AI concierge.\n\nI can help you explore AI solutions, discuss your business challenges, and connect you with our experts.\n\nWhat would you like to improve today?",
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
  }, [messages, open, botTyping]);

  /* ---------------- VOICE ---------------- */

  function speak(text: string) {
    if (!voiceOn || typeof window === "undefined") return;

    const u = new SpeechSynthesisUtterance(text);
    u.lang = locale;
    u.rate = 0.95;

    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function bot(text: string, options?: string[]) {
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages((m) => [...m, { role: "bot", text, options }]);
      speak(text);
    }, 600);
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

  /* ---------------- OTP ---------------- */

  async function sendOTP(email: string) {
    await fetch("/api/otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }

  async function verifyOTP(code: string) {
    const res = await fetch("/api/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: lead.email,
        code,
      }),
    });

    const data = await res.json();
    return data.valid;
  }

  /* ---------------- MAIN LOGIC ---------------- */

  async function handleUser(text: string) {
    const value = text.trim();

    /* INTEREST */

    if (step === "interest") {
      setLead({ interest: value, page });
      setStep("business");

      bot(
        "Great choice. What stage is your organization currently in?",
        ["Startup", "Growing Business", "Enterprise"]
      );
      return;
    }

    /* BUSINESS */

    if (step === "business") {
      setLead((l: any) => ({ ...l, businessType: value }));
      setStep("challenge");

      bot(
        "Please describe the main challenge or goal you're currently dealing with."
      );
      return;
    }

    /* CHALLENGE */

    if (step === "challenge") {
      if (value.length < 10) {
        bot(
          "Please describe your challenge with a bit more detail so we can understand properly."
        );
        return;
      }

      setLead((l: any) => ({ ...l, challenge: value }));
      setStep("name");

      bot("May I know your name?");
      return;
    }

    /* NAME */

    if (step === "name") {
      setLead((l: any) => ({ ...l, name: value }));
      setStep("email");

      bot(
        `Nice to meet you ${value}. What’s the best work email to share insights or next steps?`
      );
      return;
    }

    /* EMAIL */

    if (step === "email") {
      if (!isValidEmail(value)) {
        bot("Please enter a valid work email.");
        return;
      }

      setLead((l: any) => ({ ...l, email: value }));
      setStep("otp");

      await sendOTP(value);

      bot(
        "We sent a 6 digit verification code to your email. Please enter the OTP."
      );

      return;
    }

    /* OTP */

    if (step === "otp") {
      const valid = await verifyOTP(value);

      if (!valid) {
        bot("Invalid OTP. Please try again.");
        return;
      }

      const finalLead = {
        ...lead,
        source: "Website Chatbot",
        timestamp: new Date().toISOString(),
      };

      await fetch("/api/contact/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalLead),
      });

      setLead(finalLead);
      setStep("done");

      bot(
        `Verification complete.\n\nThank you ${finalLead.name}. Our team will reach out shortly.\n\nMeanwhile, you can explore our company profile or schedule a consultation.`,
        ["Download Company Profile", "Schedule Call", "Later"]
      );

      return;
    }

    /* DONE / MEETING */

    if (step === "done") {
      if (value === "Schedule Call") {
        bot(
          "Please choose a time slot.",
          ["Today 11:30 AM", "Today 2:00 PM", "Tomorrow"]
        );
        return;
      }

      if (
        value === "Today 11:30 AM" ||
        value === "Today 2:00 PM" ||
        value === "Tomorrow"
      ) {
        await fetch("/api/contact/meeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...lead,
            meetingSlot: value,
          }),
        });

        bot(
          `Perfect. Your consultation has been scheduled for ${value}.`
        );

        return;
      }

      if (value === "Later") {
        bot("No problem. Our team will reach out shortly.");
        return;
      }
    }
  }

  /* ---------------- SEND ---------------- */

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
      {!open && <AIConciergeOrb onOpen={() => setOpen(true)} />}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6
              w-full sm:w-[400px] h-[80vh] sm:h-[600px]
              flex flex-col overflow-hidden rounded-t-3xl sm:rounded-[28px]
              border border-white/10 bg-[#0a0a12]/95 backdrop-blur-2xl
              shadow-[0_30px_80px_rgba(124,58,237,.4)]"
            >
              {/* ambient glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-[90px]" />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-violet-600/20 blur-[90px]" />

              {/* HEADER */}
              <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-3.5">
                <HeaderAvatar talking={botTyping} />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    Nexxovate Concierge
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Enterprise Growth Advisor
                  </p>
                </div>

                <button
                  onClick={() => setVoiceOn(!voiceOn)}
                  className="text-zinc-400 transition hover:text-white"
                  aria-label="Toggle voice"
                >
                  {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="text-zinc-400 transition hover:text-white"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>

              {/* MESSAGES */}
              <div className="relative flex-1 space-y-4 overflow-y-auto px-4 py-5">
                {messages.map((m, i) => (
                  <div key={i}>
                    <div
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`whitespace-pre-line px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                          m.role === "user"
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                            : "border border-white/10 bg-white/[0.06] text-zinc-200"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>

                    {m.options && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.options.map((o) => (
                          <motion.button
                            key={o}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => send(o)}
                            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(168,85,247,.35)]"
                          >
                            {o}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {botTyping && (
                  <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-zinc-300"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* INPUT */}
              <div className="relative flex items-center gap-2 border-t border-white/10 p-3">
                <button
                  onClick={startListening}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                    listening
                      ? "bg-red-500 text-white"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:text-white"
                  }`}
                  aria-label="Speak"
                >
                  <Mic size={16} />
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type or speak…"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-400"
                />

                <button
                  onClick={() => send()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white transition hover:scale-105"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
