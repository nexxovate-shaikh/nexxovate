"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = {
  role: "bot" | "user";
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate. We help organizations scale IT, adopt AI, strengthen security, and access elite talent.",
    },
  ]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply: Msg = {
        role: "bot",
        text:
          "Great question. Would you like help with services, staffing, AI, cybersecurity, or transformation?",
      };
      setMessages((m) => [...m, botReply]);
    }, 700);
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

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm">
          {/* Panel */}
          <div
            className="fixed bottom-0 right-0 left-0 sm:left-auto
            sm:bottom-6 sm:right-6
            sm:w-[380px] h-[75vh] sm:h-[520px]
            bg-white rounded-t-3xl sm:rounded-3xl
            shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Nexxovate"
                  width={36}
                  height={36}
                  className="rounded"
                />
                <div>
                  <p className="font-semibold text-sm">Nexxovate Concierge</p>
                  <p className="text-xs text-gray-500">
                    Intelligent business assistant
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <Image
                      src="/logo.png"
                      alt="N"
                      width={28}
                      height={28}
                      className="mr-2 rounded"
                    />
                  )}

                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
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
                className="block text-center text-xs text-gray-500 mt-3"
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
