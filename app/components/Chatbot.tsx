"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

type Role = "bot" | "user";

type Message = {
  role: Role;
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate. I can help with Services, Staffing, AI, Cybersecurity, or Digital Transformation.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function getBotReply(userText: string): string {
    const text = userText.toLowerCase();

    if (text.includes("service")) {
      return "Our Services include IT Managed Services, Cloud, AI Automation, Cybersecurity, and Digital Transformation. Would you like details on any one?";
    }

    if (text.includes("staff")) {
      return "We provide contract staffing, permanent hiring, and enterprise workforce solutions. Are you hiring or exploring talent strategy?";
    }

    if (text.includes("ai")) {
      return "We help organizations adopt AI responsibly — automation, analytics, and intelligent operations. Would you like a use-case discussion?";
    }

    if (text.includes("cyber")) {
      return "Cybersecurity is core to Nexxovate. We cover risk assessment, SOC, compliance, and security architecture.";
    }

    if (text.includes("contact") || text.includes("talk")) {
      return "Perfect. You can reach us via the Contact page or WhatsApp for immediate assistance.";
    }

    return "Got it. Could you tell me whether this is related to Services, Staffing, AI, Cybersecurity, or Transformation?";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const reply: Message = {
        role: "bot",
        text: getBotReply(userMessage.text),
      };
      setMessages((prev) => [...prev, reply]);
    }, 500);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full
        bg-black text-white flex items-center justify-center shadow-xl"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm">
          <div
            className="fixed bottom-0 left-0 right-0
            sm:left-auto sm:right-6 sm:bottom-6
            sm:w-[380px]
            h-[75vh] sm:h-[520px]
            bg-white rounded-t-3xl sm:rounded-3xl
            shadow-2xl flex flex-col overflow-hidden"
          >
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
                      alt="N"
                      width={22}
                      height={22}
                      className="mr-2 mt-1"
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm
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
