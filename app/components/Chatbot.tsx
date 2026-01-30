"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  role: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate.\nHow can I help you today?\n\n• Services\n• Staffing\n• AI\n• Cybersecurity\n• Contact",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function getBotReply(text: string): string {
    const msg = text.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
      return "Hello 👋 How can I help you today?\n\nYou can ask about Services, Staffing, AI, or Cybersecurity.";
    }

    if (msg.includes("service")) {
      return "💼 Our Services include:\n• IT & Managed Services\n• Digital Transformation\n• Consulting\n\nWould you like to talk to an expert?";
    }

    if (msg.includes("staff")) {
      return "👥 We provide enterprise staffing for IT, NOC, SOC, Cloud, and AI roles.\n\nNeed help hiring?";
    }

    if (msg.includes("ai")) {
      return "🤖 We help organizations adopt AI through automation, analytics, and intelligent operations.";
    }

    if (msg.includes("cyber")) {
      return "🔐 Our cybersecurity services cover risk management, SOC, compliance, and security operations.";
    }

    if (msg.includes("contact")) {
      return "📩 You can reach us via the Contact page or chat instantly on WhatsApp.";
    }

    return "Thanks for reaching out 🙂 Please tell me whether you're interested in Services, Staffing, AI, or Cybersecurity.";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");

    setTimeout(() => {
      const reply = getBotReply(userText);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    }, 500);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999]
        w-14 h-14 rounded-full bg-black text-white
        flex items-center justify-center shadow-xl"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm">
          {/* Chat Panel */}
          <div className="fixed bottom-0 left-0 right-0
            sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px]
            h-[70vh] sm:h-[520px]
            bg-white rounded-t-3xl sm:rounded-3xl
            shadow-2xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Image
                  src="/favicon.ico"
                  alt="Nexxovate"
                  width={28}
                  height={28}
                />
                <div>
                  <p className="text-sm font-semibold">Nexxovate Concierge</p>
                  <p className="text-xs text-gray-500">
                    Intelligent business assistant
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <Image
                      src="/favicon.ico"
                      alt="Bot"
                      width={22}
                      height={22}
                      className="mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line
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
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message…"
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
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
