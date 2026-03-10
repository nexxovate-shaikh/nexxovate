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
    desc: "An AI-powered assistant deployed to automate customer support interactions, improve response times and enhance service quality.",
  },
  {
    title: "Business Workflow Automation Platform",
    result: "Saved 20+ hours per week",
    desc: "Automated document processing and operational workflows using intelligent automation and AI-driven data extraction.",
  },
  {
    title: "AI Analytics Dashboard",
    result: "Improved operational insights",
    desc: "Centralized analytics platform transforming operational data into real-time insights and predictive intelligence.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white overflow-hidden">

        {/* background glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1000px] h-[1000px] bg-purple-500/20 blur-[160px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-pink-300 text-xs font-semibold tracking-wide">
            REAL CLIENT TRANSFORMATIONS
          </div>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
            Real transformation stories
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              powered by Nexxovate
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl leading-relaxed">
            Explore how organizations partner with Nexxovate to modernize
            platforms, automate complex workflows and unlock intelligent
            insights that accelerate business growth.
          </p>

        </div>
      </section>

      {/* CASE GRID */}
      <section className="relative max-w-7xl mx-auto px-6 py-28">

        <div className="text-center max-w-3xl mx-auto mb-20">

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technology transformations
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              delivered by Nexxovate
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            A selection of intelligent automation and enterprise platform
            implementations designed to deliver measurable business impact.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {cases.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              {/* hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

              <div className="relative z-10">

                <h3 className="text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                {/* result badge */}
                <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  {item.result}
                </div>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

                <Link
                  href="/contact"
                  className="inline-block mt-8 font-medium text-indigo-600 hover:text-indigo-800 transition"
                >
                  Discuss a similar project →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-28 overflow-hidden">

        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-pink-500/20 blur-[150px] rounded-full"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Let’s build your
            <span className="block bg-gradient-to-r from-pink-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
              next success story
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            Partner with Nexxovate to design and implement AI-driven
            platforms, intelligent automation systems and secure
            enterprise technology solutions.
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