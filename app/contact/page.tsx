// app/contact/page.tsx

import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Nexxovate",
  description:
    "Contact Nexxovate to discuss enterprise IT services, AI solutions, cybersecurity, staffing, training and digital transformation.",
};

export default function ContactPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center text-white overflow-hidden">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Nexxovate"
          fill
          priority
          className="object-cover"
        />

        {/* Premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-purple-900/70 to-pink-900/70" />

        {/* Ambient glow */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-28">
          <p className="uppercase tracking-widest text-pink-300 text-sm mb-6">
            Contact Nexxovate
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
            Let’s build the future{" "}
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              together
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-200 max-w-2xl">
            Whether you're scaling technology, modernizing operations, or building high-performance teams — we're ready to partner with you.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="relative py-32 overflow-hidden">
        {/* Soft premium background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Start the conversation
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Tell us about your goals and challenges. Our leadership team personally reviews every inquiry.
            </p>
          </div>

          {/* Form container */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-10 md:p-14">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
