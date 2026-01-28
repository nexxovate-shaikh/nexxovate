"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);

  return (
    <div className="bg-white border rounded-3xl shadow-xl p-6 sm:p-10 md:p-12">
      <h2 className="text-3xl font-bold">Send us a message</h2>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={() => setStatus("loading")}
        className="mt-10 space-y-6"
      >
        {/* Required hidden input for Netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <input
          name="email"
          placeholder="Email"
          required
          type="email"
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <input
          name="company"
          placeholder="Company"
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          className="w-full border px-5 py-4 rounded-xl focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:scale-[1.02] transition"
        >
          Submit Inquiry
        </button>

        {status === "loading" && (
          <p className="text-gray-600 font-medium mt-4">Sending...</p>
        )}
      </form>
    </div>
  );
}
