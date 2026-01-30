"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from "lucide-react";

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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nWe help businesses grow through Digital Marketing, IT Services, AI solutions, and Staffing.\n\nWhat would you like to improve today?",
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
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  }

  /* ---------------- SALES LOGIC ---------------- */
  function handleUser(text: string) {
    const value = text.trim();
    const lower = value.toLowerCase();

    // 1️⃣ Interest
    if (step === "interest") {
      setLead({ interest: value });
      setStep("business");

      if (lower.includes("marketing")) {
        bot(
          "Great choice. We help companies generate qualified leads, improve brand visibility, and increase conversions.\n\nIs this for a Startup, Growing Business, or Enterprise?"
        );
      } else if (lower.includes("staff")) {
        bot(
          "Understood. We provide contract staffing, permanent hiring, and dedicated tech teams.\n\nWhat best describes your organization size?"
        );
      } else if (lower.includes("ai")) {
        bot(
          "AI can dramatically improve efficiency and decision-making.\n\nAre you exploring AI for internal operations or customer-facing solutions?"
        );
      } else {
        bot(
          "We support Managed IT, Cloud, Security, and enterprise operations.\n\nWhat type of business are you representing?"
        );
      }
      return;
    }

    // 2️⃣ Business type
    if (step === "business") {
      setLead((l) => ({ ...l, businessType: value }));
      setStep("name");
      bot("Perfect. May I know your name?");
      return;
    }

    // 3️⃣ Name
    if (step === "name") {
      setLead((l) => ({ ...l, name: value }));
      setStep("email");
      bot(
        `Nice to meet you, ${value}.\n\nWhat’s the best email to share a tailored solution or proposal?`
      );
      return;
    }

    // 4️⃣ Email
    if (step === "email") {
      const finalLead = { ...lead, email: value };
      setLead(finalLead);
      setStep("done");

      // 👉 Replace this later with API / Email / Google Sheet
      console.log("📩 NEW LEAD:", {
        ...finalLead,
        source: "Nexxovate Website Chatbot",
        timestamp: new Date().toISOString(),
      });

      bot(
        `Thank you, ${lead.name}.\n\nOur team will review your requirement and contact you shortly.\n\nFor urgent discussions, WhatsApp is the fastest option below.`
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
      {!open && (
  <button
    onClick={() => setOpen(true)}
    className="fixed bottom-6 right-6 z-[9999]
    w-16 h-16 rounded-full
    bg-black
    shadow-2xl
    flex items-center justify-center
    hover:scale-105 transition-transform"
  >
    <img
      src="/logo1.png"
      alt="Nexxovate"
      className="w-[85%] h-[85%] object-contain"
    />
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
              <div className="flex items-center gap-3">
                <img src="/logo.png" className="h-7 object-contain" />
                <div>
                  <p className="text-sm font-semibold">Nexxovate</p>
                  <p className="text-xs text-gray-500">
                    Powering Intelligent IT Operations
                  </p>
                </div>
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
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm
                    ${
                      m.role === "user"
                        ? "bg-black text-white"
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
                  ${listening ? "bg-red-600" : "bg-gray-200"}`}
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
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>

              <a
                href="https://wa.me/919916347839"
                target="_blank"
                className="block text-center text-[11px] text-gray-500 mt-2"
              >
                Prefer instant response? → Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
