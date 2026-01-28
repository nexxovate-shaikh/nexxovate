// app/about/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About nexxovate",
  description:
    "Learn about nexxovate’s mission, vision and approach to delivering enterprise IT, AI, cybersecurity, staffing and digital transformation solutions.",
};

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center text-white overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="About nexxovate"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-32">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-5xl">
            Engineering the future of
            <span className="block text-white/70 mt-6">
              intelligent enterprises
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg text-white/60">
            Nexxovate is a next-generation technology and talent partner helping organizations modernize
            operations, strengthen security, accelerate digital maturity and scale with confidence.
          </p>

          <div className="mt-14">
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-12 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Connect with nexxovate
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Who we are
            </h2>
            <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
              nexxovate was founded with a clear mission — to help organizations navigate complexity
              across technology, security, operations and talent. We combine deep execution capability
              with strategic thinking to deliver sustainable outcomes, not just short-term solutions.
            </p>
          </div>

          <div className="relative h-[480px] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/about-team.jpg"
              alt="nexxovate Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* subtle separator */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* MISSION & VISION */}
      <section className="py-24 md:py-32 bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {[
            {
              title: "Our Mission",
              text: "To empower organizations with intelligent technology solutions, strong operational foundations and future-ready talent that drives long-term business value.",
            },
            {
              title: "Our Vision",
              text: "To become a globally trusted enterprise partner in IT services, AI innovation, cybersecurity excellence and workforce transformation.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[28px] p-14 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition"
            >
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* subtle separator */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* DIFFERENTIATORS */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              What differentiates nexxovate
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              ["Execution-first mindset", "We focus on real outcomes, measurable impact and sustainable delivery."],
              ["Enterprise operating discipline", "Governance, accountability, security and scalable systems."],
              ["Technology & domain depth", "Modern engineering informed by business context."],
              ["Client partnership approach", "We act as an extension of your internal teams."],
              ["Future-ready thinking", "Designed for rapidly evolving digital and AI ecosystems."],
              ["Talent & capability ecosystem", "We invest in long-term skills and organizational maturity."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white rounded-[28px] p-12 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all"
              >
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="mt-6 text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* subtle separator */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* VALUES */}
      <section className="py-24 md:py-32 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Our values
          </h2>

          <div className="grid md:grid-cols-4 gap-12 mt-20">
            {[
              "Integrity in everything we do",
              "Ownership and accountability",
              "Client-first thinking",
              "Continuous improvement mindset",
            ].map((value) => (
              <div
                key={value}
                className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition"
              >
                <p className="text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Partner with nexxovate to shape your future
          </h2>

          <p className="mt-10 text-lg text-white/70 max-w-2xl mx-auto">
            Let’s build a roadmap for stronger technology, smarter operations and scalable growth.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-14 bg-white text-black px-14 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
