// app/staffing/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Staffing | nexxovate",
  description:
    "Enterprise staffing solutions including contract hiring, contract-to-hire, permanent recruitment and offshore team models.",
};

export default function StaffingPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO WITH IMAGE */}
      <section className="relative min-h-[75vh] flex items-center text-white">
        <Image
          src="/images/staffing-hero.jpg"
          alt="Enterprise Staffing"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/70 to-pink-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
            Enterprise talent solutions for  
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              high-performance organizations
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg text-gray-200">
            nexxovate helps organizations attract, scale and retain top technology talent through flexible,
            enterprise-grade workforce models.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Request Talent Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Workforce models designed for enterprise scale
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Whether scaling delivery, building new platforms, or strengthening operations, nexxovate
            delivers talent aligned to technical, operational and cultural fit.
          </p>
        </div>
      </section>

           {/* STAFFING CARDS WITH UNIQUE IMAGES */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              title: "Contract Staffing",
              img: "/images/contract-staffing.jpg",
            },
            {
              title: "Contract-to-Hire",
              img: "/images/contract-to-hire.jpg",
            },
            {
              title: "Permanent Hiring",
              img: "/images/permanent-hiring.jpg",
            },
            {
              title: "Offshore & Dedicated Teams",
              img: "/images/offshore-team.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative h-[320px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              {/* Premium overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition" />

              {/* Text */}
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-200 max-w-[90%]">
                  Scalable enterprise-grade hiring aligned to business delivery outcomes.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              Why organizations trust nexxovate for talent
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Our approach goes beyond recruitment. We align talent strategy with delivery excellence,
              governance maturity and long-term organizational capability.
            </p>

            <ul className="mt-10 space-y-4 text-gray-700">
              <li>✔ Domain-aligned talent mapping</li>
              <li>✔ Deep technical screening & evaluation</li>
              <li>✔ Enterprise hiring governance models</li>
              <li>✔ Scalable workforce architecture</li>
              <li>✔ Long-term partnership approach</li>
            </ul>
          </div>

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/team.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Build stronger teams with nexxovate
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Let’s design a scalable, future-ready talent strategy aligned to your growth.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Speak to our Talent Team
          </Link>
        </div>
      </section>
    </div>
  );
}
