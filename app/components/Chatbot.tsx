"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from "lucide-react";

type Role = "bot" | "user";

type Message = {
  role: Role;
  text: string;
};

type Lead = {
  name?: string;
  email?: string;
  interest?: string;
  service?: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);

  const [step, setStep] = useState<
    "welcome" | "interest" | "name" | "email" | "service" | "done"
  >("welcome");

  const [lead, setLead] = useState<Lead>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "👋 Welcome to Nexxovate Concierge.\n\nWe offer:\n• IT Managed Services\n• Cloud & Infrastructure\n• AI & Automation\n• Cybersecurity\n• Digital Transformation\n\nIs this inquiry for **Business / Managed Services**?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  /* ======================
     SPEAK
  ====================== */
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

  /* ======================
     HANDLE FLOW
  ====================== */
  function handleUser(text: string) {
    if (step === "welcome") {
      setLead({ interest: text });
      bot("Great. May I know your name?");
      setStep("name");
      return;
    }

    if (step === "name") {
      setLead((l) => ({ ...l, name: text }));
      bot(`Nice to meet you, ${text}! 😊\n\nCould you share your email address?`);
      setStep("email");
      return;
    }

    if (step === "email") {
      setLead((l) => ({ ...l, email: text }));
      bot(
        "Thanks! Which service would you like to know more about?\n\n• IT Managed Services\n• Cloud\n• AI\n• Cybersecurity\n• Digital Transformation"
      );
      setStep("service");
      return;
    }

    if (step === "service") {
      const finalLead = {
        ...lead,
        service: text,
        source: "Nexxovate Website Chatbot",
        time: new Date().toISOString(),
      };

      console.log("📩 NEW LEAD:", finalLead);

      bot(
        "Thank you for the details. Our team will get back to you shortly.\n\nFor immediate assistance, you can also continue on WhatsApp below."
      );

      setStep("done");
      return;
    }

    bot("For faster assistance, please use WhatsApp below.");
  }

  function send() {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTimeout(() => handleUser(text), 400);
  }

  /* ======================
     UI
  ====================== */
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[9999]
          w-14 h-14 rounded-full bg-black
          flex items-center justify-center shadow-2xl"
        >
          <img src="/favicon.ico" className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md">
          <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px]
            h-[78vh] sm:h-[560px] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex justify-between px-4 py-3 border-b">
              <div>
                <p className="text-sm font-semibold">Nexxovate Concierge</p>
                <p className="text-xs text-gray-500">Business assistant</p>
              </div>
              <div className="flex gap-2">
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
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm
                    ${m.role === "user" ? "bg-black text-white" : "bg-white shadow"}`}>
                    {m.text}
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
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type here…"
                  className="flex-1 border rounded-full px-4 py-2 text-sm"
                />
                <button onClick={send} className="w-10 h-10 bg-black text-white rounded-full">
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
