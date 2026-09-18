"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Unchanged contract: POST /api/contact { name, email, company, message }.
 * Only the presentation has moved to the Nexxovate system.
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<null | "loading" | "success" | "error">(
    null
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-white/[0.09] bg-white/[0.025] px-5 py-4 text-[0.92rem] text-paper outline-none transition-colors duration-400 placeholder:text-white/25 focus:border-electric/55 focus:bg-white/[0.04]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className={field}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Work email"
            required
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="sr-only">
          Organization
        </label>
        <input
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Organization"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          What are you trying to change?
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What are you trying to change? The more specific, the more useful our first reply will be."
          rows={6}
          required
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full overflow-hidden rounded-full bg-paper px-8 py-4 text-[0.82rem] font-semibold uppercase tracking-wide text-void transition-transform duration-500 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <span
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.8),transparent)] transition-transform duration-[900ms] group-hover:translate-x-full"
          aria-hidden
        />
        <span className="relative">
          {status === "loading" ? "Sending…" : "Send enquiry"}
        </span>
      </button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-electric/25 bg-electric/[0.07] px-5 py-4 text-[0.86rem] text-electric-soft"
            role="status"
          >
            Received. Our leadership team reviews every enquiry — expect a reply
            from a person, not an autoresponder.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-magenta-core/30 bg-magenta-core/[0.07] px-5 py-4 text-[0.86rem] text-paper/85"
            role="alert"
          >
            That didn&apos;t send. Please try again, or email us directly at
            nexxovate@gmail.com.
          </motion.p>
        )}
      </AnimatePresence>

      <p className="pt-1 text-[0.72rem] leading-relaxed text-white/25">
        We use what you send here to respond to your enquiry. Nothing more.
      </p>
    </form>
  );
}
