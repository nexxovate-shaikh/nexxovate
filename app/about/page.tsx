// app/about/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About | Nexxovate",
  description:
    "Learn about Nexxovate’s mission, leadership and enterprise-first approach to IT, AI, cybersecurity, staffing and digital transformation.",
};

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO (MATCHES TRAINING STYLE) */}
      <section className="relative min-h-[75vh] flex items-center text-white">
        <Image
          src="/images/about-hero.jpg"
          alt="About Nexxovate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/70 to-pink-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
            Building intelligent enterprises for  
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              the next decade
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg text-gray-200">
            Nexxovate is a technology and talent partner helping organizations modernize,
            secure and scale with confidence across IT, AI, cybersecurity and workforce solutions.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Partner with Nexxovate
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              Who we are
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Nexxovate was founded to help organizations navigate complexity across
              technology, security, operations and talent.
              We combine execution excellence with strategic thinking to deliver
              measurable, long-term outcomes.
            </p>
          </div>

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-team.jpg"
              alt="Nexxovate team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {[
            {
              title: "Our Mission",
              text:
                "To empower organizations with intelligent technology, strong operational foundations and future-ready talent that drives sustainable business value.",
            },
            {
              title: "Our Vision",
              text:
                "To be a globally trusted enterprise partner across IT services, AI innovation, cybersecurity excellence and workforce transformation.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-14 shadow-xl hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP & TEAM (NEW) */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight">
              Leadership & core team
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              A team of experienced technology leaders, delivery experts and
              transformation specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              {
                name: "Shaikh Arif",
                role: "Founder & Managing Director",
                img: "/images/team/arif.jpg",
                bio: "Leads enterprise IT operations, service delivery and digital transformation initiatives.",
              },
              {
                name: "Technology Lead",
                role: "Head of Engineering & AI",
                img: "/images/team/tech-lead.jpg",
                bio: "Drives cloud architecture, AI automation and scalable engineering solutions.",
              },
              {
                name: "Operations Lead",
                role: "Head of Delivery & Staffing",
                img: "/images/team/ops-lead.jpg",
                bio: "Ensures execution excellence across managed services and workforce solutions.",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-[320px]">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-purple-600 mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA (MATCHES TRAINING CTA) */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Let’s build the future together
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Partner with Nexxovate for intelligent technology, trusted delivery and scalable growth.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
