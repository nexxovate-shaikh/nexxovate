"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NexyraMark from "./visual/NexyraMark";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, Volume2, VolumeX } from "lucide-react";
import { useMotionPrefs, EASE } from "@/lib/motion";
import { OPEN_CHAT_EVENT } from "@/lib/content/site";
import ConciergeBot from "./visual/ConciergeBot";

/* ══════════════════════════════════════════════════════════════
   Nexyra concierge.

   The conversation logic is carried over from the previous
   Chatbot.tsx unchanged — same steps, same validation, same OTP
   handshake, same lead payload. Only the surface is rebuilt on
   Ion, and the accessibility gaps are closed.

   Two behavioural fixes:
   - The "Schedule Call" step posted to /api/contact/meeting, which
     did not exist. Every booked slot 404'd silently. That route
     now exists.
   - The panel is a real dialog: Escape closes it, focus moves into
     it and is trapped, and new messages are announced.

   One thing left alone deliberately: voice is still on by default,
   because that was the existing behaviour and it is your product
   decision, not mine. Worth reconsidering — speech starting
   unprompted surprises people, and some browsers block it anyway.
   Flip `useState(true)` to `false` on voiceOn if you want it off.
   ══════════════════════════════════════════════════════════════ */

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

type Lead = {
  interest?: string;
  page?: string;
  businessType?: string;
  challenge?: string;
  name?: string;
  email?: string;
  source?: string;
  timestamp?: string;
};

/* ── Panel ──────────────────────────────────────────────────── */

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("interest");
  const [lead, setLead] = useState<Lead>({});
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const reduced = useMotionPrefs();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text:
        "Welcome to Nexxovate.\n\nI'm the Nexyra concierge.\n\nI can help you explore AI solutions, discuss your business challenges, and connect you with our experts.\n\nWhat would you like to improve today?",
      options: ["Digital Marketing", "AI & Automation", "IT Services", "Staffing"],
    },
  ]);

  /* ── Open / close plumbing ── */

  const openChat = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    if (typeof window !== "undefined") speechSynthesis.cancel();
    // Return focus where it came from — otherwise a keyboard user
    // is dumped at the top of the document.
    openerRef.current?.focus?.();
  }, []);

  /* Any component can open this: the home page's "Ask Nexyra
     instead" button dispatches the event rather than routing. */
  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, [openChat]);

  /* Escape closes, Tab is trapped inside the panel. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeChat();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, closeChat]);

  /* Lock the page behind the panel. Lenis reads body overflow, so
     this stops the background scrolling under the dialog. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 260);
    return () => {
      document.body.style.overflow = previous;
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }, [messages, open, botTyping, reduced]);

  /* ── Voice ── */

  const page = typeof window !== "undefined" ? window.location.pathname : "/";
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";

  function speak(text: string) {
    if (!voiceOn || typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

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

  function startListening() {
    const w = window as unknown as Record<string, unknown>;
    const SR = (w.SpeechRecognition || w.webkitSpeechRecognition) as
      | (new () => {
          lang: string;
          start: () => void;
          onresult: ((e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void) | null;
          onend: (() => void) | null;
        })
      | undefined;

    if (!SR) {
      bot("Voice input is not supported in this browser. Please type instead.");
      return;
    }

    const rec = new SR();
    rec.lang = locale;
    rec.start();
    setListening(true);

    rec.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onend = () => setListening(false);
  }

  /* ── Helpers ── */

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  async function sendOTP(email: string) {
    await fetch("/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  async function verifyOTP(code: string) {
    const res = await fetch("/api/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: lead.email, code }),
    });
    const data = await res.json();
    return data.valid;
  }

  /* ── Conversation — logic unchanged from the previous build ── */

  async function handleUser(text: string) {
    const value = text.trim();

    if (step === "interest") {
      setLead({ interest: value, page });
      setStep("business");
      bot("Great choice. What stage is your organization currently in?", [
        "Startup",
        "Growing Business",
        "Enterprise",
      ]);
      return;
    }

    if (step === "business") {
      setLead((l) => ({ ...l, businessType: value }));
      setStep("challenge");
      bot("Please describe the main challenge or goal you're currently dealing with.");
      return;
    }

    if (step === "challenge") {
      if (value.length < 10) {
        bot("Please describe your challenge with a bit more detail so we can understand properly.");
        return;
      }
      setLead((l) => ({ ...l, challenge: value }));
      setStep("name");
      bot("May I know your name?");
      return;
    }

    if (step === "name") {
      setLead((l) => ({ ...l, name: value }));
      setStep("email");
      bot(`Nice to meet you ${value}. What's the best work email to share insights or next steps?`);
      return;
    }

    if (step === "email") {
      if (!isValidEmail(value)) {
        bot("Please enter a valid work email.");
        return;
      }
      setLead((l) => ({ ...l, email: value }));
      setStep("otp");
      await sendOTP(value);
      bot("We sent a 6 digit verification code to your email. Please enter the OTP.");
      return;
    }

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
        headers: { "Content-Type": "application/json" },
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

    if (step === "done") {
      if (value === "Download Company Profile") {
        window.open("/nexxovate-company-profile.pdf", "_blank", "noopener");
        bot("Opening the company profile now. Anything else I can help with?", [
          "Schedule Call",
          "Later",
        ]);
        return;
      }

      if (value === "Schedule Call") {
        bot("Please choose a time slot.", ["Today 11:30 AM", "Today 2:00 PM", "Tomorrow"]);
        return;
      }

      if (
        value === "Today 11:30 AM" ||
        value === "Today 2:00 PM" ||
        value === "Tomorrow"
      ) {
        try {
          const res = await fetch("/api/contact/meeting", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...lead, meetingSlot: value }),
          });

          if (!res.ok) throw new Error("Booking failed");

          bot(`Perfect. Your consultation has been scheduled for ${value}.`);
        } catch {
          // Previously this failed silently and still told the user
          // they were booked.
          bot(
            "I could not confirm that slot just now. Our team has your details and will reach out to schedule directly."
          );
        }
        return;
      }

      if (value === "Later") {
        bot("No problem. Our team will reach out shortly.");
        return;
      }
    }
  }

  function send(text?: string) {
    const value = text ?? input;
    if (!value.trim()) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text: value }]);
    setTimeout(() => handleUser(value), 300);
  }

  /* ── Render ── */

  return (
    <>
      {/* The launcher owns its own fixed position. Nesting a fixed
          panel inside a fixed wrapper made the two fight over the
          containing block. */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-[9990]">
          <ConciergeBot onOpen={openChat} />
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[9995] bg-ink/70 backdrop-blur-sm"
            onClick={closeChat}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Nexyra concierge"
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.32, ease: EASE }}
              /* Height is capped against the viewport, not fixed.
                 A hard 620px panel had its header — and therefore
                 its close button — pushed off the top of any window
                 shorter than about 650px. */
              className="glass fixed inset-x-0 bottom-0 z-[9996] flex h-[76dvh] w-full flex-col overflow-hidden rounded-t-[20px] border-white/10 bg-ink/95 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(520px,calc(100dvh-2.5rem))] sm:w-[356px] sm:rounded-[20px]"
              style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.9)" }}
            >
              {/* Ambient — the same field as the hero, at low volume. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 blur-[80px]"
                style={{ background: "var(--color-platinum)" }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -left-20 h-56 w-56 rounded-full opacity-25 blur-[80px]"
                style={{ background: "var(--color-champagne)" }}
              />

              {/* Header — shrink-0 so it can never be squeezed out
                  of the panel by the message list. */}
              <div className="relative flex shrink-0 items-center gap-3 border-b border-line px-4 py-3">
                {/* The real Nexyra mark, not the conic-gradient ring
                    that stood in for it. The ring survives as a
                    rotating halo behind the emblem while the agent is
                    typing — it was carrying the "thinking" signal, and
                    that was the one job worth keeping. */}
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  {botTyping && !reduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full opacity-70"
                      style={{
                        background:
                          "conic-gradient(from 140deg, transparent, var(--color-champagne), transparent 65%)",
                        maskImage:
                          "radial-gradient(circle, transparent 58%, #000 62%)",
                        WebkitMaskImage:
                          "radial-gradient(circle, transparent 58%, #000 62%)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <NexyraMark size={28} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-text">Nexyra concierge</p>
                  <p className="flex items-center gap-1.5 text-[12px] text-mute">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    {botTyping ? "Typing…" : "Enterprise growth advisor"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setVoiceOn((v) => !v);
                    if (voiceOn) speechSynthesis.cancel();
                  }}
                  className="rounded p-1.5 text-faint transition-colors hover:text-text"
                  aria-label={voiceOn ? "Turn voice off" : "Turn voice on"}
                  aria-pressed={voiceOn}
                >
                  {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  onClick={closeChat}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-lit text-mute transition-colors hover:border-[color:var(--color-champagne)] hover:text-text"
                  aria-label="Close the concierge"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                className="relative min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-4 py-4"
                aria-live="polite"
                aria-atomic="false"
              >
                {messages.map((m, i) => (
                  <div key={i}>
                    <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={
                          m.role === "user"
                            ? "max-w-[84%] whitespace-pre-line rounded-[13px] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink"
                            : "max-w-[84%] whitespace-pre-line rounded-[13px] border border-line-lit bg-surface-2 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-mute"
                        }
                        style={
                          m.role === "user"
                            ? {
                                background:
                                  "linear-gradient(120deg, var(--color-platinum), var(--color-champagne))",
                              }
                            : undefined
                        }
                      >
                        {m.text}
                      </div>
                    </div>

                    {m.options && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.options.map((o) => (
                          <button
                            key={o}
                            onClick={() => send(o)}
                            className="rounded-full border border-line-lit px-3.5 py-1.5 text-[12.5px] font-medium text-mute transition-colors hover:border-[color:var(--color-champagne)] hover:text-text"
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {botTyping && (
                  <div className="flex w-fit items-center gap-1.5 rounded-[14px] border border-line-lit bg-surface-2 px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-faint"
                        animate={reduced ? {} : { y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                    <span className="sr-only">Nexyra is typing</span>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="relative flex shrink-0 items-center gap-2 border-t border-line p-2.5">
                <button
                  onClick={startListening}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    listening
                      ? "bg-crit text-ink"
                      : "border border-line-lit text-faint hover:text-text"
                  }`}
                  aria-label={listening ? "Listening" : "Speak your answer"}
                >
                  <Mic size={16} />
                </button>

                <label htmlFor="nexyra-input" className="sr-only">
                  Your message
                </label>
                <input
                  id="nexyra-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type or speak…"
                  className="min-w-0 flex-1 rounded-full border border-line-lit bg-surface px-3.5 py-2 text-[13.5px] text-text outline-none transition-colors placeholder:text-faint focus:border-[color:var(--color-champagne)]"
                />

                <button
                  onClick={() => send()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(120deg, var(--color-platinum), var(--color-champagne))",
                  }}
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
