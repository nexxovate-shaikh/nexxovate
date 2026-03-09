

import Image from "next/image";
import Link from "next/link";
import AIParticles from "./components/AIParticles";
export const metadata = {
  title: "Home | Nexxovate",
  description:
    "Nexxovate builds AI automation systems, secure cloud infrastructure and enterprise technology solutions that help modern businesses scale intelligently.",
};

export default function HomePage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
<section className="relative min-h-[75svh] md:min-h-[100svh] flex items-center text-white overflow-hidden">

  {/* AI PARTICLES BACKGROUND */}
  <div className="absolute inset-0 z-0">
    <AIParticles />
  </div>

  {/* HERO IMAGE */}
  <Image
    src="/images/hero-tech.jpg"
    alt="Enterprise Technology"
    fill
    priority
    className="object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/75 to-pink-900/60" />

  {/* CONTENT */}
  <div className="relative z-10 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-14 md:pb-24 text-center md:text-left">

      <p className="uppercase tracking-[0.25em] text-pink-300 text-[11px] sm:text-sm mb-4">
        AI • Cloud • Cybersecurity • Enterprise Platforms
      </p>

      <h1 className="text-[2rem] sm:text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto md:mx-0">
        AI Solutions That Automate Work
        <span className="block mt-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
          and scale modern enterprises
        </span>
      </h1>

      <p className="mt-6 text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto md:mx-0 leading-relaxed">
        Nexxovate helps organizations implement AI automation, modern cloud
        infrastructure, and secure digital platforms that improve
        operational efficiency and accelerate business growth.
      </p>

      <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
        <Link
          href="/contact"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition"
        >
          Book AI Consultation
        </Link>

        <Link
          href="/services"
          className="border border-white/40 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition"
        >
          Explore Solutions
        </Link>
      </div>

      <p className="mt-6 text-xs sm:text-sm text-gray-300">
        Ask our AI advisor in chat about automation, security, or cloud modernization.
      </p>

    </div>
  </div>

</section>


      {/* WHAT NEXXOVATE DELIVERS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold">
              What Nexxovate Delivers
            </h2>

            <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600">
              Intelligent systems and enterprise platforms that improve efficiency,
              security, and scalability for modern businesses.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">AI Automation</h3>
              <p className="text-sm text-gray-600 mt-2">
                Automate repetitive workflows and increase operational efficiency using AI systems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">AI Assistants</h3>
              <p className="text-sm text-gray-600 mt-2">
                Intelligent chatbots and assistants that support customers and teams 24/7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">Cloud Platforms</h3>
              <p className="text-sm text-gray-600 mt-2">
                Secure and scalable cloud infrastructure built for performance and reliability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">Custom AI Products</h3>
              <p className="text-sm text-gray-600 mt-2">
                Build intelligent SaaS platforms and AI-driven digital products.
              </p>
            </div>

          </div>
        </div>
      </section>
{/* CASE STUDIES / SOLUTIONS BUILT */}
<section className="py-16 md:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold">
        Solutions We’ve Built
      </h2>

      <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600">
        Examples of intelligent platforms and enterprise solutions designed
        to improve efficiency, automation, and scalability.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* CASE 1 */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <Image
            src="/images/ai-assistant.jpg"
            alt="AI Assistant"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold">
            AI Customer Support Assistant
          </h3>

          <p className="mt-3 text-sm text-gray-600">
            Intelligent chatbot designed to automate customer support,
            answer product questions, and reduce support workload.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Technologies: AI APIs, Next.js, Cloud Infrastructure
          </p>
        </div>
      </div>

      {/* CASE 2 */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <Image
            src="/images/automation.jpg"
            alt="Automation System"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold">
            Business Workflow Automation
          </h3>

          <p className="mt-3 text-sm text-gray-600">
            AI-powered automation platform that processes documents,
            extracts data, and updates enterprise systems automatically.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Technologies: Python, AI Models, Cloud Services
          </p>
        </div>
      </div>

      {/* CASE 3 */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <Image
            src="/images/dashboard.jpg"
            alt="AI Dashboard"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold">
            AI Analytics Dashboard
          </h3>

          <p className="mt-3 text-sm text-gray-600">
            Intelligent analytics platform that transforms raw business
            data into insights, forecasts, and operational recommendations.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Technologies: React, AI Analytics, Data Visualization
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
{/* AI PLATFORMS */}
<section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50/40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold">
        Nexxovate AI Platforms
      </h2>

      <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600">
        Intelligent platforms designed to help organizations automate operations,
        unlock insights, and scale digital capabilities.
      </p>
    </div>

    <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* PLATFORM 1 */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
          AI
        </div>

        <h3 className="mt-6 text-xl font-semibold">
          Nexxovate AI Agent
        </h3>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Enterprise knowledge assistant that understands company documents,
          policies, and internal systems to provide instant answers for teams.
        </p>

        <p className="mt-4 text-xs text-gray-500">
          AI Knowledge • Internal Assistants • Enterprise Search
        </p>
      </div>

      {/* PLATFORM 2 */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 flex items-center justify-center text-white text-xl font-bold">
          ⚡
        </div>

        <h3 className="mt-6 text-xl font-semibold">
          Automation Engine
        </h3>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Intelligent workflow automation platform that connects systems,
          processes documents, and eliminates repetitive operational work.
        </p>

        <p className="mt-4 text-xs text-gray-500">
          Workflow Automation • Process Intelligence • AI Operations
        </p>
      </div>

      {/* PLATFORM 3 */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
          📊
        </div>

        <h3 className="mt-6 text-xl font-semibold">
          Intelligence Dashboard
        </h3>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          AI-powered analytics platform that transforms operational data into
          insights, predictions, and strategic recommendations.
        </p>

        <p className="mt-4 text-xs text-gray-500">
          Data Intelligence • Predictive Analytics • AI Insights
        </p>
      </div>

    </div>

  </div>
</section>

      {/* SERVICES */}
<section className="py-20 md:py-32 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="max-w-3xl mb-14 md:mb-20">
      <h2 className="text-2xl md:text-4xl font-bold">
        Technology capabilities that power modern organizations
      </h2>

      <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600 leading-relaxed">
        Nexxovate combines AI innovation, cloud architecture, cybersecurity,
        and digital transformation expertise to help companies operate faster,
        smarter, and more securely.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      {[
        {
          title: "IT & Managed Infrastructure",
          img: "/images/cloud.jpg",
          desc: "Modern cloud infrastructure, platform reliability, and scalable technology operations."
        },
        {
          title: "AI & Intelligent Automation",
          img: "/images/ai.jpg",
          desc: "AI assistants, workflow automation, and intelligent systems that reduce manual work."
        },
        {
          title: "Cybersecurity & Risk Protection",
          img: "/images/cyber.jpg",
          desc: "Advanced threat protection, governance frameworks, and resilient security architecture."
        },
        {
          title: "Digital Transformation",
          img: "/images/office.jpg",
          desc: "Modernizing business platforms and operations with cloud-native technologies."
        },
        {
          title: "Technology Talent Solutions",
          img: "/images/team.jpg",
          desc: "High-impact engineering talent and specialized technical teams for critical initiatives."
        },
        {
          title: "Training & Capability Development",
          img: "/images/training.jpg",
          desc: "Upskilling teams with modern technology, AI, and cloud engineering practices."
        },
      ].map((item, i) => (
        <div
          key={i}
          className="relative h-[220px] sm:h-[260px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
        >
          <Image src={item.img} alt={item.title} fill className="object-cover" />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute bottom-0 p-6 text-white">
            <h3 className="text-lg md:text-xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-xs md:text-sm text-gray-200 leading-relaxed">
              {item.desc}
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
              Our Technology Expertise
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-18 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Ready to implement AI in your organization?
          </h2>

          <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-200">
            Let’s design a roadmap for AI automation, cloud infrastructure,
            and secure enterprise platforms.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 md:mt-12 bg-white text-black px-9 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}