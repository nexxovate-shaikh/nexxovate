"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Kicker, Section, Shell } from "../../components/site/primitives";

type Answer = {
  answer: string;
  sources: { label: string; href: string }[];
  grounded: boolean;
  phrasedByModel: boolean;
};

export default function AgentPage() {
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || pending) return;

    setPending(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/nexaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = (await res.json()) as Answer & { error?: string };
      if (data.error && !data.answer) setError(data.error);
      else setResult(data);
    } catch {
      setError("The agent could not be reached. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Section tone="void" className="min-h-[100svh] !pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full opacity-45 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(77,124,255,0.2) 0%, transparent 66%)",
        }}
      />
      <div className="blueprint pointer-events-none absolute inset-0" />

      <Shell width="wide">
        <Link
          href="/platform"
          className="group inline-flex items-center gap-2 font-mono-ui text-[0.62rem] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-paper"
        >
          <span className="transition-transform duration-500 group-hover:-translate-x-1" aria-hidden>
            ←
          </span>
          Agent platform
        </Link>

        <div className="mt-10">
          <Kicker>Nexxovate agent</Kicker>
          <h1 className="display-xl mt-6 max-w-[16ch] text-forge">
            Ask the estate a question.
          </h1>
          <p className="lede mt-7">
            This agent answers from Nexxovate&apos;s published material and returns
            the sources behind every answer. In a provisioned deployment it reasons
            over your own knowledge estate under the same rules.
          </p>
        </div>

        <form onSubmit={ask} className="glass-deep mt-12 flex items-center gap-3 rounded-[26px] px-4 py-3 sm:px-6 sm:py-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know?"
            aria-label="Ask the agent"
            className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-paper outline-none placeholder:text-white/28"
          />
          <button
            type="submit"
            disabled={pending || !question.trim()}
            className="shrink-0 rounded-full bg-paper px-6 py-2.5 text-[0.76rem] font-semibold uppercase tracking-wide text-void transition disabled:opacity-35"
          >
            {pending ? "Thinking" : "Ask"}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {(pending || result || error) && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="panel mt-8 rounded-3xl p-7 sm:p-9"
            >
              <div className="relative z-10">
                {pending && (
                  <div className="space-y-3" aria-live="polite">
                    {[92, 78, 54].map((w, i) => (
                      <motion.div
                        key={w}
                        className="h-3 rounded-full bg-white/[0.06]"
                        style={{ width: `${w}%` }}
                        animate={{ opacity: [0.3, 0.75, 0.3] }}
                        transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.14 }}
                      />
                    ))}
                  </div>
                )}

                {error && !pending && (
                  <p className="text-[0.92rem] leading-relaxed text-mute">{error}</p>
                )}

                {result && !pending && (
                  <>
                    <p className="whitespace-pre-line text-[0.95rem] leading-[1.72] text-paper/90">
                      {result.answer}
                    </p>

                    {result.sources.length > 0 && (
                      <div className="mt-7 border-t border-white/[0.07] pt-5">
                        <p className="font-mono-ui text-[0.62rem] tracking-[0.18em] text-white/28">
                          {result.grounded ? "SOURCES" : "NEXT STEP"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {result.sources.map((s) => (
                            <Link
                              key={s.href + s.label}
                              href={s.href}
                              className="rounded-full border border-white/10 px-4 py-2 text-[0.76rem] text-electric-soft transition-colors hover:border-electric/40"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Shell>
    </Section>
  );
}
