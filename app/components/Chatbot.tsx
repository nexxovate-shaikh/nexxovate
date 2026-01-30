"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";

type Role = "bot" | "user";

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

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);

  const [lead, setLead] = useState<Lead>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate. We help organizations scale Digital Marketing, IT Services, AI, and Staffing with enterprise-grade execution.\n\nWhich area are you exploring today?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* =========================
     TEXT TO SPEECH
  ========================= */
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

  /* =========================
     SPEECH TO TEXT
  ========================= */
  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  }

  /* =========================
     SALES LOGIC (NO LOOPING)
  ========================= */
  function handleUser(text: string) {
    const t = text.toLowerCase();

    // 1️⃣ Interest
    if (!lead.interest) {
      setLead({ ...lead, interest: text });

      if (t.includes("marketing")) {
        bot(
          "Excellent choice. We drive growth through SEO, performance marketing, branding, and lead generation.\n\nIs this for your own business or for a client?"
        );
      } else if (t.includes("staff")) {
        bot(
          "Great. We provide contract staffing, permanent hiring, and dedicated tech teams.\n\nIs this for your company or a client?"
        );
      } else if (t.includes("ai")) {
        bot(
          "AI is a major focus for us — automation, internal copilots, analytics, and intelligent operations.\n\nIs this for your business or a client engagement?"
        );
      } else {
        bot(
          "We specialize in Managed IT, Cloud, Security, and enterprise support.\n\nIs this for your business or a client?"
        );
      }
      return;
    }

    // 2️⃣ Business type
    if (!lead.businessType) {
      setLead({ ...lead, businessType: text });
      bot("Perfect. May I have your name?");
      return;
    }

    // 3️⃣ Name
    if (!lead.name) {
      setLead({ ...lead, name: text });
      bot(`Nice to meet you, ${text} 👋\n\nWhat’s the best email to reach you?`);
      return;
    }

    // 4️⃣ Email
    if (!lead.email) {
      const updatedLead = { ...lead, email: text };
      setLead(updatedLead);

      // 🔐 CRM / LOGGING POINT
      console.log("📩 NEW LEAD CAPTURED:", {
        ...updatedLead,
        source: "Nexxovate Website Chatbot",
        timestamp: new Date().toISOString(),
      });

      bot(
        `Thank you, ${lead.name}. Our team will get back to you shortly.\n\nFor urgent discussions, you can also connect with us instantly on WhatsApp below.`
      );
      return;
    }

    bot(
      "If you need immediate assistance, please use WhatsApp below and our team will respond quickly."
    );
  }

  function send() {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(() => handleUser(text), 400);
  }

  /* =========================
     UI
  ========================= */
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999]
        w-14 h-14 rounded-full bg-black text-white
        flex items-center justify-center shadow-2xl
        transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md">
          <div
            className="fixed bottom-0 left-0 right-0
            sm:left-auto sm:right-6 sm:bottom-6
            sm:w-[380px]
            h-[75vh] sm:h-[560px]
            bg-white/85 backdrop-blur-2xl
            rounded-t-3xl sm:rounded-3xl
            shadow-[0_40px_140px_rgba(0,0,0,0.4)]
            flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white/70">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Nexxovate"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Nexxovate Concierge
                  </p>
                  <p className="text-xs text-gray-500">
                    Business Growth Advisor
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
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm
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
                  className={`w-10 h-10 rounded-full
                  flex items-center justify-center
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
                  className="w-10 h-10 rounded-full bg-black text-white
                  flex items-center justify-center shrink-0"
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
