"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Volume2, VolumeX } from "lucide-react";

type Role = "bot" | "user";
type Stage =
  | "welcome"
  | "intent"
  | "services"
  | "staffing"
  | "ai"
  | "cyber"
  | "contact";

type Message = {
  role: Role;
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("welcome");
  const [voiceOn, setVoiceOn] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate Concierge. How can I assist you today?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function speak(text: string) {
    if (!voiceOn) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }

  function botReply(text: string, nextStage?: Stage) {
    const reply = { role: "bot" as Role, text };
    setMessages((m) => [...m, reply]);
    speak(text);
    if (nextStage) setStage(nextStage);
  }

  function handleIntent(userText: string) {
    const text = userText.toLowerCase();

    if (text.includes("service")) {
      botReply(
        "We provide IT Managed Services, Cloud, AI Automation, Cybersecurity, and Digital Transformation. Which area would you like to explore?",
        "services"
      );
      return;
    }

    if (text.includes("staff")) {
      botReply(
        "We support contract staffing, permanent hiring, and enterprise workforce strategy. Are you hiring or planning capacity?",
        "staffing"
      );
      return;
    }

    if (text.includes("ai")) {
      botReply(
        "We help organizations implement AI safely through automation, analytics, and intelligent operations.",
        "ai"
      );
      return;
    }

    if (text.includes("cyber")) {
      botReply(
        "Cybersecurity is central to Nexxovate — from assessments to SOC, compliance, and architecture.",
        "cyber"
      );
      return;
    }

    if (text.includes("contact") || text.includes("talk")) {
      botReply(
        "You can reach us via the Contact page or continue instantly on WhatsApp.",
        "contact"
      );
      return;
    }

    botReply(
      "I can help with Services, Staffing, AI, Cybersecurity, or connecting you with our team. What would you like to explore?",
      "intent"
    );
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");

    setTimeout(() => {
      handleIntent(userMessage.text);
    }, 400);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999]
        w-14 h-14 rounded-full
        bg-black text-white
        flex items-center justify-center
        shadow-2xl hover:scale-105 transition"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm">
          {/* Chat Panel */}
          <div
            className="
            fixed bottom-0 left-0 right-0
            sm:left-auto sm:right-6 sm:bottom-6
            sm:w-[380px]
            h-[75vh] sm:h-[540px]
            bg-white/80 backdrop-blur-2xl
            rounded-t-3xl sm:rounded-3xl
            shadow-[0_30px_120px_rgba(0,0,0,0.35)]
            flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white/60">
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.ico"
                  alt="Nexxovate"
                  className="w-7 h-7"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Nexxovate Concierge
                  </p>
                  <p className="text-xs text-gray-500">
                    Intelligent business assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceOn(!voiceOn)}
                  className="text-gray-600 hover:text-black"
                >
                  {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <img
                      src="/favicon.ico"
                      className="w-5 h-5 mr-2 mt-1"
                      alt="N"
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-black text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t bg-white">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage()
                  }
                  placeholder="Type your message…"
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
                <button
                  onClick={sendMessage}
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
