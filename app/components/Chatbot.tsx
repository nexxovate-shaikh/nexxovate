"use client";

import { useEffect, useRef, useState } from "react";
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
  }, [messages, open]);

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
    setTimeout(() => {
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
        `Verification complete.\n\nThank you ${finalLead.name}. Would you like to schedule a consultation with our AI strategist?`,
        ["Schedule Call", "Later"]
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

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40">
          <div
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6
            w-full sm:w-[400px] h-[80vh] sm:h-[600px]
            bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
          >
            {/* HEADER */}

            <div className="flex items-center gap-3 px-4 py-3 border-b">

              <img src="/logo.png" className="h-7" />

              <div className="flex-1">
                <p className="text-sm font-semibold">
                  Nexxovate Concierge
                </p>
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
                      m.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm max-w-[75%]
                      ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white text-gray-900 shadow"
                      }`}
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