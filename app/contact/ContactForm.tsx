"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      setStatus("error");
    }
  }

  return (
    <div className="bg-white border rounded-3xl shadow-xl p-6 sm:p-10 md:p-12">
      <h2 className="text-3xl font-bold">Send us a message</h2>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          type="email"
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          required
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:scale-[1.02] transition"
        >
          {status === "loading" ? "Sending..." : "Submit Inquiry"}
        </button>

        {status === "success" && (
          <p className="text-green-600 font-medium mt-4">
            ✅ Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 font-medium mt-4">
            ❌ Something went wrong. Try again.
          </p>
        )}
      </form>
    </div>
  );
}
