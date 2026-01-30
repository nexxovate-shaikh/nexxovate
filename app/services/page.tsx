// app/services/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Services | Nexxovate",
  description:
    "Explore Nexxovate’s enterprise IT services, AI solutions, cybersecurity, digital transformation, managed services, and consulting offerings.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center text-white">
        <Image
          src="/images/services-hero.jpg"
          alt="Enterprise Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/70 to-pink-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
            Enterprise services for the
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              intelligent digital era
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base sm:text-lg text-gray-200">
            From IT modernization to AI-powered transformation, Nexxovate partners
            with organizations to deliver scalable, secure and future-ready digital capabilities.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-center hover:scale-105 transition"
            >
              Talk to an Expert
            </Link>

            <Link
              href="/about"
              className="border border-white/40 px-8 py-4 rounded-full font-medium text-center hover:bg-white/10 transition"
            >
              Our Approach
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Our enterprise service portfolio
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600">
            We deliver deeply integrated services across technology, security,
            talent and transformation — built to handle enterprise-scale complexity.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { title: "IT & Managed Services", img: "/images/cloud.jpg" },
            { title: "AI & Intelligent Automation", img: "/images/ai.jpg" },
            { title: "Cybersecurity & Risk", img: "/images/cyber.jpg" },
            { title: "Digital Transformation", img: "/images/office.jpg" },
            { title: "Consulting Services", img: "/images/consulting.jpg" },
            { title: "Service & Product Offerings", img: "/images/product.jpg" },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative h-[240px] sm:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition" />
              <div className="absolute bottom-0 p-5 sm:p-8 text-white">
                <h3 className="text-lg sm:text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-200">
                  Enterprise-grade delivery models designed for scale and complexity.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY NEXXOVATE */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why enterprises choose Nexxovate
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600">
              Our delivery philosophy blends domain expertise, structured execution,
              governance and ownership to consistently deliver measurable outcomes.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700 text-sm sm:text-base">
              <li>✔ Enterprise-grade operating models</li>
              <li>✔ Strong governance and accountability</li>
              <li>✔ Security-first architecture mindset</li>
              <li>✔ AI-driven continuous optimization</li>
              <li>✔ Long-term strategic partnership approach</li>
            </ul>
          </div>

          <div className="bg-white shadow-xl rounded-2xl sm:rounded-3xl p-8 sm:p-14">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Impact delivered
            </h3>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-10">
              {[
                { value: "7.6+", label: "Years Experience" },
                { value: "24/7", label: "Operational Readiness" },
                { value: "100%", label: "Client-Centric Delivery" },
                { value: "Security", label: "by Design" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {item.value}
                  </p>
                  <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Let’s design your transformation roadmap
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-200">
            Engage with Nexxovate experts to modernize, secure and scale your organization.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 sm:mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
