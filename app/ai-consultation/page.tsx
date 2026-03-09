// app/ai-consultation/page.tsx

import Link from "next/link";

export const metadata = {
  title: "AI Consultation | Nexxovate",
  description:
    "Schedule an AI consultation with Nexxovate experts to explore automation, AI platforms and enterprise transformation opportunities.",
};

export default function AIConsultationPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-32">

          <p className="uppercase tracking-widest text-pink-400 text-sm mb-6">
            AI Consultation
          </p>

          <h1 className="text-5xl md:text-6xl font-bold max-w-4xl">
            Discover how AI can transform
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              your organization
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl">
            Work with Nexxovate advisors to identify automation opportunities,
            modernize infrastructure and design intelligent enterprise systems.
          </p>

        </div>
      </section>

      {/* CONSULTATION BENEFITS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">
              What you’ll gain from this consultation
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Our experts will assess your organization’s technology landscape
              and recommend practical AI adoption strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-16">

            <div className="bg-gray-50 rounded-3xl p-10">
              <h3 className="text-xl font-semibold">AI Opportunity Mapping</h3>
              <p className="mt-4 text-gray-600">
                Identify workflows and business processes where AI automation
                can deliver measurable impact.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-10">
              <h3 className="text-xl font-semibold">Technology Strategy</h3>
              <p className="mt-4 text-gray-600">
                Evaluate infrastructure, cloud platforms and data systems
                required to support intelligent applications.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-10">
              <h3 className="text-xl font-semibold">Implementation Roadmap</h3>
              <p className="mt-4 text-gray-600">
                Receive a practical roadmap for building and deploying AI
                solutions inside your organization.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Request an AI consultation
          </h2>

          <form className="mt-12 grid gap-6">

            <input
              type="text"
              placeholder="Full name"
              className="border rounded-xl px-5 py-4"
            />

            <input
              type="email"
              placeholder="Work email"
              className="border rounded-xl px-5 py-4"
            />

            <input
              type="text"
              placeholder="Company name"
              className="border rounded-xl px-5 py-4"
            />

            <select className="border rounded-xl px-5 py-4">
              <option>Company size</option>
              <option>1-10</option>
              <option>10-50</option>
              <option>50-200</option>
              <option>200+</option>
            </select>

            <textarea
              rows={4}
              placeholder="Describe your challenge or AI initiative"
              className="border rounded-xl px-5 py-4"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Request Consultation
            </button>

          </form>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Ready to build intelligent systems?
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Nexxovate partners with organizations to design, build and scale
            AI-driven technology platforms.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Speak to an expert
          </Link>

        </div>
      </section>

    </div>
  );
}