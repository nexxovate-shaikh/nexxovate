"use client";

/* ============================================================
   ASK NEXAF
   The enterprise answer interface. Grounded in Nexxovate's own
   material — every response carries the sources it came from, and
   when NEXAF doesn't know, it says so and routes to a human.
   ============================================================ */

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { NEXAF_PROMPTS } from "@/lib/brand";
import { EASE, Kicker, Reveal, Section, Shell } from "./primitives";

type Answer = {
  answer: string;
  sources: { label: string; href: string }[];
  grounded: boolean;
  phrasedByModel: boolean;
};

export default function AskNexaf() {
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Answer | null>(null);
  const [asked, setAsked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);

  async function ask(value: string) {
    const q = value.trim();
    if (!q || pending) return;

    controller.current?.abort();
    const ac = new AbortController();
    controller.current = ac;

    setPending(true);
    setError(null);
    setAsked(q);
    setResult(null);

    try {
      const res = await fetch("/api/nexaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
        signal: ac.signal,
      });

      const data = (await res.json()) as Answer & { error?: string };

      if (data.error && !data.answer) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("NEXAF couldn't be reached. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Section id="nexaf" tone="ink" className="border-y border-white/[0.06]">
      {/* the interface sits inside its own pocket of light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(77,124,255,0.16) 0%, rgba(122,92,255,0.07) 45%, transparent 70%)",
        }}
      />
      <div className="blueprint pointer-events-none absolute inset-0" />

      <Shell width="wide">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Kicker>Enterprise answer interface</Kicker>
            </div>

            <h2 className="display-xl mt-7">
              Ask <span className="text-spine">NEXAF</span>
            </h2>

            <p className="lede mx-auto mt-6 text-center">
              What would you like to explore?
            </p>
          </div>
        </Reveal>

        {/* ---- the console ---- */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-3xl">
            {/* the halo reacts to state — thinking is visible */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[28px] opacity-70"
              animate={{
                boxShadow: pending
                  ? [
                      "0 0 0 1px rgba(77,124,255,0.35), 0 0 60px -10px rgba(77,124,255,0.45)",
                      "0 0 0 1px rgba(122,92,255,0.45), 0 0 90px -10px rgba(122,92,255,0.55)",
                      "0 0 0 1px rgba(77,124,255,0.35), 0 0 60px -10px rgba(77,124,255,0.45)",
                    ]
                  : "0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -20px rgba(77,124,255,0.35)",
              }}
              transition={{ duration: 1.6, repeat: pending ? Infinity : 0, ease: "easeInOut" }}
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void ask(query);
              }}
              className="glass-deep relative flex items-center gap-3 rounded-[28px] px-4 py-3 sm:px-6 sm:py-4"
            >
              {/* NEXAF sigil — a compressed Nexus, not an icon set glyph */}
              <span className="relative hidden h-11 w-11 shrink-0 items-center justify-center sm:flex">
                <motion.span
                  className="absolute inset-0 rounded-full border border-electric/35"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="absolute inset-[6px] rounded-full border border-white/12"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="h-2 w-2 rounded-full bg-electric"
                  animate={{ scale: pending ? [1, 1.7, 1] : [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: pending ? 0.9 : 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about AMS, Nexyra OS, security, transformation…"
                aria-label="Ask NEXAF"
                className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-paper outline-none placeholder:text-white/28"
              />

              <button
                type="submit"
                disabled={pending || !query.trim()}
                className="group relative shrink-0 overflow-hidden rounded-full bg-paper px-5 py-2.5 text-[0.76rem] font-semibold uppercase tracking-wide text-void transition-all duration-400 disabled:cursor-not-allowed disabled:opacity-35 sm:px-6"
              >
                {pending ? "Thinking" : "Ask"}
              </button>
            </form>

            {/* ---- suggested prompts ---- */}
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {NEXAF_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setQuery(prompt);
                    void ask(prompt);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.76rem] text-mute transition-all duration-400 hover:border-electric/40 hover:bg-electric/[0.06] hover:text-paper"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* ---- response ---- */}
            <AnimatePresence mode="wait">
              {(pending || result || error) && (
                <motion.div
                  key={asked ?? "state"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="panel mt-8 rounded-3xl p-7 sm:p-9"
                >
                  <div className="relative z-10">
                    {asked && (
                      <p className="font-mono-ui text-[0.66rem] tracking-[0.18em] text-white/30">
                        QUERY — {asked.toUpperCase()}
                      </p>
                    )}

                    {pending && (
                      <div className="mt-5 space-y-3" aria-live="polite">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-3 rounded-full bg-white/[0.06]"
                            style={{ width: `${[92, 78, 54][i]}%` }}
                            animate={{ opacity: [0.3, 0.75, 0.3] }}
                            transition={{
                              duration: 1.3,
                              repeat: Infinity,
                              delay: i * 0.14,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {error && !pending && (
                      <p className="mt-5 text-[0.92rem] leading-relaxed text-mute">{error}</p>
                    )}

                    {result && !pending && (
                      <>
                        <p className="mt-5 whitespace-pre-line text-[0.95rem] leading-[1.72] text-paper/90">
                          {result.answer}
                        </p>

                        {result.sources.length > 0 && (
                          <div className="mt-7 border-t border-white/[0.07] pt-5">
                            <p className="font-mono-ui text-[0.62rem] tracking-[0.18em] text-white/28">
                              {result.grounded ? "SOURCES" : "NEXT STEP"}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2.5">
                              {result.sources.map((source) => (
                                <Link
                                  key={source.href + source.label}
                                  href={source.href}
                                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[0.76rem] text-electric-soft transition-colors duration-400 hover:border-electric/40 hover:bg-electric/[0.06]"
                                >
                                  {source.label}
                                  <span className="transition-transform duration-400 group-hover:translate-x-0.5" aria-hidden>
                                    →
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="mt-5 text-[0.7rem] leading-relaxed text-white/25">
                          NEXAF answers from Nexxovate&apos;s own published material.
                          {result.phrasedByModel
                            ? " Phrasing assisted by a language model; the substance comes from the sources above."
                            : ""}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Shell>
    </Section>
  );
}
