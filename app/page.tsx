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
<section className="relative min-h-[100svh] flex items-center text-white overflow-hidden">
  <Image
    src="/images/hero-tech.jpg"
    alt="Enterprise Technology"
    fill
    priority
    className="object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-900/70 to-pink-900/60" />

  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center md:text-left">

      <p className="uppercase tracking-widest text-pink-300 text-xs sm:text-sm mb-4">
        Powering Intelligent IT Operations
      </p>

      <h1 className="text-[2.2rem] sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto md:mx-0">
        Engineering future-ready enterprises with
        <span className="block mt-2 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
          intelligence, security & execution excellence
        </span>
      </h1>

      <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto md:mx-0">
        Nexxovate partners with organizations to modernize IT operations, embed AI-driven efficiency,
        strengthen cybersecurity posture and build scalable talent ecosystems.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl font-bold tracking-tight">
              Integrated services for the digital enterprise
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We operate across technology, security, transformation and talent to help organizations scale with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
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
                className="group relative h-[320px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    Enterprise-grade delivery models designed for scale.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* OUR EXPERTISE – SIGNATURE PREMIUM */}
<section className="relative py-36 overflow-hidden bg-white">
  {/* Luxury ambient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/60 to-pink-50/60" />
  <div className="absolute top-[-250px] left-[-200px] w-[700px] h-[700px] bg-purple-400/20 rounded-full blur-[140px]" />
  <div className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] bg-pink-400/20 rounded-full blur-[140px]" />

  <div className="relative max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Our Expertise
      </h2>
      <p className="mt-6 text-lg text-gray-600">
        Core platforms and technologies powering enterprise-grade delivery at nexxovate.
      </p>
    </div>

    {/* Grid */}
    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10">
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
          className="group relative p-[1px] rounded-3xl bg-gradient-to-r from-white/40 to-white/10 hover:from-pink-200/40 hover:to-purple-200/40 transition-all duration-500"
        >
          <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            
            {/* Floating glow */}
            <div
              className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r ${item.gradient} opacity-10 blur-3xl rounded-full`}
            />

            {/* Accent bar */}
            <div
              className={`h-1 w-16 bg-gradient-to-r ${item.gradient} rounded-full mb-6`}
            />

            {/* Text */}
            <h3 className="text-xl font-semibold text-gray-900">
              {item.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Enterprise-grade capability
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* CLIENTS – PREMIUM LOGO WALL */}
<section className="relative py-28 overflow-hidden bg-white">
  {/* Soft ambient background */}
  <div className="absolute inset-0 bg-gradient-to-b from-pink-50/60 via-white to-white" />
  <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-3xl" />
  <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-3xl" />

  <div className="relative max-w-6xl mx-auto px-6 text-center">
    {/* Heading */}
    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
      Trusted by growing teams
    </h3>

    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
      We partner with startups, SMEs, and modern enterprises to design scalable, secure and future-ready technology foundations.
    </p>

    {/* Logo wall */}
    <div className="mt-16 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl px-10 py-12 shadow-xl">
      <Image
        src="/images/clients.png"
        alt="Client logos"
        width={1000}
        height={200}
        className="mx-auto opacity-90 hover:opacity-100 transition duration-500"
      />
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="relative bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Ready to elevate your enterprise foundation?
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Let’s design a roadmap that strengthens your technology, cybersecurity and workforce capabilities.
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
