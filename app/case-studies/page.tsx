// app/case-studies/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Case Studies | Nexxovate",
  description:
    "Explore real-world technology transformation case studies delivered by Nexxovate across AI, cloud infrastructure and enterprise operations.",
};

const cases = [
  {
    title: "AI Customer Support Assistant",
    result: "Reduced support workload by 45%",
    desc: "An AI-powered assistant deployed to automate customer support interactions and improve response times.",
  },
  {
    title: "Business Workflow Automation Platform",
    result: "Saved 20+ hours per week",
    desc: "Automated document processing and data extraction workflows for enterprise operations.",
  },
  {
    title: "AI Analytics Dashboard",
    result: "Improved operational insights",
    desc: "Centralized analytics platform transforming operational data into real-time insights.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-32">

          <p className="uppercase tracking-widest text-pink-400 text-sm mb-6">
            Case Studies
          </p>

          <h1 className="text-5xl md:text-6xl font-bold max-w-4xl">
            Real transformation stories
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              powered by Nexxovate
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl">
            Explore how organizations leverage Nexxovate expertise to modernize
            systems, automate operations and unlock intelligent insights.
          </p>

        </div>
      </section>

      {/* CASE GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-3 gap-12">

          {cases.map((item) => (
            <div
              key={item.title}
              className="border rounded-3xl p-10 hover:shadow-2xl transition"
            >

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-purple-600 font-medium">
                {item.result}
              </p>

              <p className="mt-6 text-gray-600">
                {item.desc}
              </p>

              <Link
                href="/contact"
                className="inline-block mt-8 text-sm font-medium text-indigo-600 hover:underline"
              >
                Discuss a similar project →
              </Link>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Let’s build your success story
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Partner with Nexxovate to design and implement intelligent
            technology solutions for your organization.
          </p>

          <Link
            href="/ai-consultation"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Start your AI consultation
          </Link>

        </div>
      </section>

    </div>
  );
}