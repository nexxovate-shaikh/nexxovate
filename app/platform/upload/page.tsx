"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Kicker, Section, Shell } from "../../components/site/primitives";

type Result = { ok: boolean; message?: string; error?: string };

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload() {
    if (!file || pending) return;

    setPending(true);
    setResult(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/platform/knowledge", {
        method: "POST",
        body: form,
      });

      const data = (await res.json()) as Result;
      setResult(data);
      if (data.ok) setFile(null);
    } catch {
      setResult({ ok: false, error: "Intake failed. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <Section tone="void" className="min-h-[100svh] !pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(122,92,255,0.18) 0%, transparent 66%)",
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
          <Kicker>Knowledge intake</Kicker>
          <h1 className="display-xl mt-6 max-w-[17ch] text-forge">
            Add to the estate an agent reasons over.
          </h1>
          <p className="lede mt-7">
            Text formats are extracted on intake. Richer formats are stored and
            processed as part of a provisioned engagement — the workspace will
            tell you which happened rather than reporting success either way.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) setFile(dropped);
          }}
          className={`panel mt-12 rounded-3xl p-10 text-center transition-colors duration-400 md:p-16 ${
            dragging ? "border-electric/50 bg-electric/[0.04]" : ""
          }`}
        >
          <div className="relative z-10">
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/12"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl text-electric-soft" aria-hidden>
                ↑
              </span>
            </motion.div>

            <p className="mt-6 text-[0.95rem] text-paper">
              {file ? file.name : "Drop a document here, or choose a file"}
            </p>
            <p className="mt-2 font-mono-ui text-[0.62rem] tracking-[0.14em] text-white/28">
              {file
                ? `${(file.size / 1024).toFixed(0)} KB`
                : "TXT · MD · CSV · JSON EXTRACTED · 8 MB LIMIT"}
            </p>

            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              onChange={(e) => {
                const picked = e.target.files?.[0];
                if (picked) setFile(picked);
              }}
            />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-white/14 px-6 py-3 text-[0.8rem] font-medium text-paper/85 transition-colors duration-400 hover:border-white/30"
              >
                Choose file
              </button>
              <button
                onClick={upload}
                disabled={!file || pending}
                className="rounded-full bg-paper px-7 py-3 text-[0.8rem] font-semibold uppercase tracking-wide text-void transition disabled:opacity-30"
              >
                {pending ? "Uploading…" : "Add to estate"}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={`mt-6 rounded-2xl border px-5 py-4 text-[0.86rem] leading-relaxed ${
                result.ok
                  ? "border-electric/25 bg-electric/[0.07] text-electric-soft"
                  : "border-magenta-core/30 bg-magenta-core/[0.07] text-paper/85"
              }`}
            >
              {result.ok ? result.message : result.error}
            </motion.p>
          )}
        </AnimatePresence>
      </Shell>
    </Section>
  );
}
