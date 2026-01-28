// app/training/page.tsx

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Training | nexxovate",
  description:
    "Enterprise-grade training programs including corporate training, online learning, offline workshops and career transformation programs.",
};

export default function TrainingPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center text-white">
        <Image
          src="/images/training-hero.jpg"
          alt="Enterprise Training"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/70 to-pink-900/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
            Future-ready learning for  
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              high-performance teams
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg text-gray-200">
            nexxovate empowers organizations and individuals through structured, industry-relevant learning
            programs aligned with enterprise technology and leadership needs.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition"
            >
              Explore Training Programs
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Learning programs designed for enterprise impact
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            From technical excellence to leadership capability, our programs help organizations
            build sustainable skills, improve performance and prepare for the future.
          </p>
        </div>
      </section>

            {/* TRAINING MODELS WITH UNIQUE VISUAL CARDS */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              title: "Corporate Training Programs",
              img: "/images/corporate-training.jpg",
            },
            {
              title: "Online Learning",
              img: "/images/online-learning.jpg",
            },
            {
              title: "Offline & Classroom Training",
              img: "/images/offline-training.jpg",
            },
            {
              title: "Career Transformation Programs",
              img: "/images/career-program.jpg",
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

              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition" />

              {/* Text */}
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-200 max-w-[90%]">
                  Structured programs aligned with enterprise capability building and long-term performance.
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
              Why organizations choose nexxovate for training
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              Our programs focus on outcomes — not just content delivery. We enable measurable improvement
              in skills, behaviors, productivity and workforce maturity.
            </p>

            <ul className="mt-10 space-y-4 text-gray-700">
              <li>✔ Industry-aligned curriculum design</li>
              <li>✔ Real-world project-based learning</li>
              <li>✔ Enterprise-ready frameworks & tools</li>
              <li>✔ Practitioners as instructors</li>
              <li>✔ Long-term capability building focus</li>
            </ul>
          </div>

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/training.jpg"
              alt="Learning session"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Build future-ready capabilities with nexxovate
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Let’s design a structured learning roadmap aligned with your organization’s growth.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Speak to our Learning Team
          </Link>
        </div>
      </section>
    </div>
  );
}
