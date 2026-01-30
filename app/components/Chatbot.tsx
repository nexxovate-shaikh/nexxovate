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
        "👋 Welcome to Nexxovate. How can I help you today?\n\nYou can ask about:\n• Services\n• Staffing\n• AI\n• Cybersecurity\n• Digital Transformation",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function getBotReply(userText: string): string {
    const text = userText.toLowerCase();

    if (text.includes("service")) {
      return "🔹 Nexxovate provides IT & Managed Services, AI automation, cybersecurity, and digital transformation.\n\nWould you like to speak to an expert or explore services?";
    }

    if (text.includes("staff")) {
      return "👥 We offer enterprise staffing solutions including contract, full-time, and project-based talent across IT, AI, and cybersecurity.";
    }

    if (text.includes("ai")) {
      return "🤖 Our AI services include intelligent automation, analytics, and AI-driven operational optimization.";
    }

    if (text.includes("cyber")) {
      return "🔐 Nexxovate delivers security-first architecture, risk management, SOC support, and compliance-driven cybersecurity services.";
    }

    if (text.includes("transform")) {
      return "🚀 We help enterprises modernize platforms, processes, and operating models for scalable digital transformation.";
    }

    if (text.includes("hi") || text.includes("hello")) {
      return "Hello 👋 How can I assist you today?";
    }

    return "Thanks for reaching out. Please tell me whether you’re interested in Services, Staffing, AI, Cybersecurity, or Transformation.";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "bot", text: getBotReply(userText) },
      ]);
    }, 400);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm">
          <div className="fixed bottom-0 left-0 right-0 sm:right-6 sm:bottom-6 sm:w-[380px] h-[70vh] sm:h-[520px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Nexxovate" width={30} height={30} />
                <div>
                  <p className="text-sm font-semibold">Nexxovate Concierge</p>
                  <p className="text-xs text-gray-500">Intelligent business assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && (
                    <Image src="/logo.png" alt="N" width={24} height={24} className="mr-2" />
                  )}
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === "user" ? "bg-black text-white" : "bg-white text-gray-800 shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t bg-white">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message…"
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />
                <button onClick={sendMessage} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
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
