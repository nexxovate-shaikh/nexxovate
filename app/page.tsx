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
      <section className="relative min-h-[85svh] md:min-h-[100svh] flex items-center text-white overflow-hidden">
        <Image
          src="/images/hero-tech.jpg"
          alt="Enterprise Technology"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-900/70 to-pink-900/60" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 md:pb-20 text-center md:text-left">

            <p className="uppercase tracking-widest text-pink-300 text-xs sm:text-sm mb-4">
              Powering Intelligent IT Operations
            </p>

            <h1 className="text-[2rem] sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto md:mx-0">
              Engineering future-ready enterprises with
              <span className="block mt-2 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
                intelligence, security & execution excellence
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto md:mx-0">
              Nexxovate partners with organizations to modernize IT operations,
              embed AI-driven efficiency, strengthen cybersecurity posture and
              build scalable talent ecosystems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition"
              >
                Talk to an Expert
              </Link>

              <Link
                href="/services"
                className="inline-flex justify-center items-center border border-white/40 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="max-w-3xl mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Integrated services for the digital enterprise
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">
              We operate across technology, security, transformation and talent
              to help organizations scale with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
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
                className="group relative h-[220px] sm:h-[260px] md:h-[320px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
                <div className="absolute bottom-0 p-5 md:p-8 text-white">
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-200">
                    Enterprise-grade delivery models designed for scale.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR EXPERTISE */}
      <section className="relative py-20 md:py-36 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/60 to-pink-50/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Our Expertise
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">
              Core platforms and technologies powering enterprise-grade delivery.
            </p>
          </div>

          <div className="mt-12 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
            {[
              { name: "AWS", gradient: "from-orange-400 to-yellow-500" },
              { name: "Azure", gradient: "from-blue-500 to-cyan-500" },
              { name: "Google Cloud", gradient: "from-red-400 to-blue-500" },
              { name: "React", gradient: "from-cyan-400 to-blue-500" },
              { name: "Node.js", gradient: "from-green-400 to-emerald-500" },
              { name: "Python", gradient: "from-yellow-400 to-indigo-500" },
              { name: "Kubernetes", gradient: "from-indigo-400 to-purple-500" },
              { name: "Docker", gradient: "from-sky-400 to-blue-600" },
            ].map((item) => (
              <div
                key={item.name}
                className="relative bg-white/90 rounded-2xl p-4 md:p-8 shadow-lg text-center"
              >
                <div
                  className={`h-1 w-12 mx-auto bg-gradient-to-r ${item.gradient} rounded-full mb-4`}
                />
                <h3 className="text-sm md:text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-gray-500">
                  Enterprise-grade capability
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to elevate your enterprise foundation?
          </h2>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-200">
            Let’s design a roadmap that strengthens technology, cybersecurity and workforce capabilities.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 md:mt-10 bg-white text-black px-8 md:px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
