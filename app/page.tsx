// app/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Home | Nexxovate",
  description:
    "Nexxovate powers intelligent IT operations, AI innovation, cybersecurity, digital transformation, staffing and enterprise growth.",
};

export default function HomePage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[75svh] md:min-h-[100svh] flex items-center text-white">
        <Image
          src="/images/hero-tech.jpg"
          alt="Enterprise Technology"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/75 to-pink-900/60" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-14 md:pb-24 text-center md:text-left">

            <p className="uppercase tracking-[0.25em] text-pink-300 text-[11px] sm:text-sm mb-4">
              Powering Intelligent IT Operations
            </p>

            <h1 className="text-[2rem] sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto md:mx-0">
              Engineering future-ready enterprises
              <span className="block mt-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
                with intelligence, security & scale
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Nexxovate partners with organizations to modernize IT operations,
              embed AI-driven efficiency, strengthen cybersecurity, and build
              resilient enterprise talent ecosystems.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition"
              >
                Talk to an Expert
              </Link>

              <Link
                href="/services"
                className="border border-white/40 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition"
              >
                Explore Services
              </Link>
            </div>

            {/* Advisor micro-copy */}
            <p className="mt-6 text-xs sm:text-sm text-gray-300">
              Prefer a quick discussion? Our business growth advisor is available in chat.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="max-w-3xl mb-12 md:mb-18">
            <h2 className="text-2xl md:text-4xl font-bold">
              Integrated services for the digital enterprise
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600">
              Technology, security, transformation and talent — delivered with enterprise rigor and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
            {[
              { title: "IT & Managed Services", img: "/images/cloud.jpg" },
              { title: "AI & Automation", img: "/images/ai.jpg" },
              { title: "Cybersecurity & Risk", img: "/images/cyber.jpg" },
              { title: "Digital Transformation", img: "/images/office.jpg" },
              { title: "Staffing Solutions", img: "/images/team.jpg" },
              { title: "Training & Capability", img: "/images/training.jpg" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative h-[210px] sm:h-[250px] md:h-[310px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <Image src={item.img} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="text-base md:text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-gray-200">
                    Enterprise-grade delivery at scale.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-16 md:py-28 bg-gradient-to-br from-white via-purple-50/60 to-pink-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-5xl font-bold">
              Our Expertise
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600">
              Platforms and technologies powering enterprise-grade delivery.
            </p>
          </div>

          <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {["AWS","Azure","Google Cloud","React","Node.js","Python","Kubernetes","Docker"].map(
              (name) => (
                <div
                  key={name}
                  className="bg-white rounded-xl p-5 md:p-8 shadow-md text-center hover:shadow-lg transition"
                >
                  <div className="h-1 w-10 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3" />
                  <h3 className="text-sm md:text-lg font-semibold">{name}</h3>
                  <p className="mt-1 text-xs md:text-sm text-gray-500">
                    Enterprise-ready capability
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CLIENTS / TRUST */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
            Trusted by growing teams
          </h3>

          <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with startups, SMEs, and enterprises to build secure,
            scalable, future-ready foundations.
          </p>

          {/* Desktop logos */}
          <div className="hidden md:block mt-16 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl px-10 py-12 shadow-xl">
            <Image
              src="/images/clients.png"
              alt="Nexxovate clients"
              width={1000}
              height={200}
              className="mx-auto opacity-90"
            />
          </div>

          {/* Mobile: industries instead of fake client names */}
          <div className="md:hidden mt-12">
            <h4 className="text-xs font-semibold text-gray-900 tracking-widest uppercase mb-6">
              Industries we serve
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Technology & SaaS",
                "E-commerce",
                "Healthcare",
                "Finance & FinTech",
                "Manufacturing",
                "Startups & Scaleups",
              ].map((industry) => (
                <div
                  key={industry}
                  className="bg-white border border-gray-100 rounded-2xl px-4 py-5 text-center shadow-sm"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {industry}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile trust metrics */}
          <div className="md:hidden mt-14 grid grid-cols-3 gap-4">
            {[
              { value: "50+", label: "Organizations supported" },
              { value: "10+ yrs", label: "Ops leadership experience" },
              { value: "24/7", label: "Enterprise coverage" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-2xl py-5 text-center"
              >
                <p className="text-xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <p className="md:hidden mt-8 text-sm text-gray-600 text-center leading-relaxed">
            Long-term partnership across IT operations, security,
            digital growth, AI adoption and talent strategy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-18 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Ready to elevate your enterprise foundation?
          </h2>

          <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-200">
            Let’s design a roadmap that strengthens technology, security and workforce capabilities.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 md:mt-12 bg-white text-black px-9 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
