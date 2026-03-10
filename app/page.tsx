"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AIParticles from "./components/AIParticles";
import AIToolsSection from "./components/AIToolsSection";
import AIGlowBackground from "./components/AIGlowBackground";
import AIDemoModal from "./components/AIDemoModal";
import AIStats from "./components/AIStats";
import AICoreBackground from "./components/AICoreBackground";
import AIAuditTool from "./components/AIAuditTool";

export default function HomePage() {

  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="bg-white overflow-x-hidden">

{/* HERO */}
<section className="relative min-h-[90svh] flex items-center text-white overflow-hidden">

<AIGlowBackground />
<AICoreBackground />

<div className="absolute inset-0 z-0">
<AIParticles />
</div>

<Image
src="/images/hero-tech.jpg"
alt="Enterprise Technology"
fill
priority
className="object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/70 to-pink-900/60" />

<div className="relative z-10 w-full">
<div className="max-w-7xl mx-auto px-6 pt-32 pb-20">

<p className="uppercase tracking-[0.25em] text-pink-300 text-sm mb-6">
AI • Cloud • Cybersecurity • Enterprise Platforms
</p>

<h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
AI Solutions That Automate Work
<span className="block mt-3 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
and scale modern enterprises
</span>
</h1>

<p className="mt-6 text-lg text-gray-200 max-w-2xl leading-relaxed">
Nexxovate helps organizations implement AI automation, modern cloud infrastructure and secure digital platforms that improve operational efficiency and accelerate business growth.
</p>

<div className="mt-10 flex flex-wrap gap-4">

<Link
href="/contact"
className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full font-medium hover:scale-105 transition"
>
Book AI Consultation
</Link>

<Link
href="/services"
className="border border-white/40 px-8 py-4 rounded-full hover:bg-white/10 transition"
>
Explore Solutions
</Link>

<button
onClick={() => setShowDemo(true)}
className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full font-medium hover:scale-105 transition"
>
Try AI Demo
</button>

</div>

</div>
</div>

</section>

{/* AI DEMO MODAL */}
{showDemo && (
<AIDemoModal onClose={() => setShowDemo(false)} />
)}

<AIStats />
<AIToolsSection />


  
{/* WHAT NEXXOVATE DELIVERS */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

{/* subtle background glow */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-6 relative z-10">

{/* Header */}
<div className="text-center max-w-3xl mx-auto">

<div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
ENTERPRISE AI CAPABILITIES
</div>

<h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
What Nexxovate
<span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
Delivers
</span>
</h2>

<p className="mt-6 text-lg text-gray-600 leading-relaxed">
Enterprise-grade AI platforms, intelligent automation systems and secure
cloud architecture designed to improve efficiency, scalability and
operational performance.
</p>

</div>

{/* Cards */}
<div className="grid md:grid-cols-4 gap-8 mt-20">

{[
{
title:"AI Automation",
desc:"Automate repetitive workflows and streamline operations with intelligent AI systems that improve efficiency and reduce manual work."
},
{
title:"AI Assistants",
desc:"Deploy conversational AI assistants that support customers and internal teams 24/7 with accurate information and task automation."
},
{
title:"Cloud Platforms",
desc:"Design and implement secure, scalable cloud platforms optimized for enterprise reliability and high-performance workloads."
},
{
title:"Custom AI Products",
desc:"Build intelligent SaaS platforms and AI-driven products tailored to unique business challenges and innovation initiatives."
}
].map((item,i)=>(

<div
key={i}
className="group relative rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
>

{/* gradient glow */}
<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

<div className="relative z-10">

{/* top accent line */}
<div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>

<h3 className="mt-6 text-xl font-semibold tracking-tight">
{item.title}
</h3>

<p className="mt-3 text-gray-600 text-sm leading-relaxed">
{item.desc}
</p>

</div>

</div>

))}

</div>

</div>
</section>
{/* CASE STUDIES */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden">

{/* subtle glow */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-6 relative z-10">

<div className="text-center max-w-3xl mx-auto">

<div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
INTELLIGENT PLATFORMS
</div>

<h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
Solutions
<span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
We've Built
</span>
</h2>

<p className="mt-6 text-lg text-gray-600 leading-relaxed">
Examples of intelligent platforms and automation systems designed to
improve operational efficiency, accelerate insights and transform
enterprise workflows.
</p>

</div>

<div className="grid md:grid-cols-3 gap-10 mt-20">

{[
{
title:"AI Customer Support Assistant",
img:"/images/ai-assistant.jpg",
desc:"Conversational AI assistant automating customer support requests and reducing response times across digital channels."
},
{
title:"Business Workflow Automation",
img:"/images/automation.jpg",
desc:"Enterprise automation platform processing documents, extracting data and orchestrating operational workflows."
},
{
title:"AI Analytics Dashboard",
img:"/images/dashboard.jpg",
desc:"AI-powered analytics platform transforming operational data into predictive insights and intelligent decisions."
}
].map((item,i)=>(

<div
key={i}
className="group relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
>

{/* hover glow */}
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

{/* image */}
<div className="relative h-[220px] overflow-hidden">
<Image
src={item.img}
alt={item.title}
fill
className="object-cover group-hover:scale-105 transition duration-500"
/>

{/* image gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

</div>

{/* content */}
<div className="relative z-10 p-8">

<div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>

<h3 className="mt-6 text-xl font-semibold tracking-tight">
{item.title}
</h3>

<p className="mt-3 text-gray-600 text-sm leading-relaxed">
{item.desc}
</p>

</div>

</div>

))}

</div>

</div>

</section>

{/* AI PLATFORMS */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

{/* background glow */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-6 relative z-10">

<div className="text-center max-w-3xl mx-auto">

<div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
AI PRODUCT PLATFORM
</div>

<h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
Nexxovate
<span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
AI Platforms
</span>
</h2>

<p className="mt-6 text-lg text-gray-600 leading-relaxed">
A suite of intelligent platforms designed to automate enterprise
operations, accelerate decision-making and unlock powerful insights
from organizational data.
</p>

</div>

<div className="grid md:grid-cols-3 gap-10 mt-20">

{[
{
title:"Nexxovate AI Agent",
desc:"Enterprise knowledge assistant capable of understanding company documents, systems and operational workflows to provide instant intelligence."
},
{
title:"Automation Engine",
desc:"Advanced workflow automation platform connecting enterprise systems and orchestrating complex processes without manual intervention."
},
{
title:"Intelligence Dashboard",
desc:"AI-powered analytics platform transforming operational data into predictive insights and strategic decision intelligence."
}
].map((item,i)=>(

<div
key={i}
className="group relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
>

{/* hover glow */}
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

<div className="relative z-10">

{/* accent indicator */}
<div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>

<h3 className="mt-6 text-xl font-semibold tracking-tight">
{item.title}
</h3>

<p className="mt-3 text-gray-600 text-sm leading-relaxed">
{item.desc}
</p>

</div>

</div>

))}

</div>

</div>

</section>
{/* WHY NEXXOVATE */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

{/* background glow */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-6 relative z-10">

<div className="text-center max-w-3xl mx-auto">

<div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
TRUSTED TECHNOLOGY PARTNER
</div>

<h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
Why organizations
<span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
choose Nexxovate
</span>
</h2>

<p className="mt-6 text-lg text-gray-600 leading-relaxed">
Nexxovate combines enterprise technology expertise, intelligent
automation and modern engineering practices to deliver scalable,
secure and high-impact digital solutions.
</p>

</div>

<div className="grid md:grid-cols-3 gap-10 mt-20">

{[
{
title:"Enterprise-First Architecture",
desc:"Every solution is engineered for scalability, reliability and security to meet the demands of modern enterprise environments."
},
{
title:"AI-Driven Innovation",
desc:"We design intelligent automation platforms and AI-powered systems that transform operational workflows and decision-making."
},
{
title:"Strategic Technology Partnership",
desc:"Beyond implementation, Nexxovate partners with organizations long-term to continuously scale capabilities and innovation."
}
].map((item,i)=>(

<div
key={i}
className="group relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
>

{/* hover glow */}
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

<div className="relative z-10">

{/* accent line */}
<div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>

<h3 className="mt-6 text-xl font-semibold tracking-tight">
{item.title}
</h3>

<p className="mt-3 text-gray-600 text-sm leading-relaxed">
{item.desc}
</p>

</div>

</div>

))}

</div>

</div>

</section>
{/* SERVICES */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/30 to-white overflow-hidden">

{/* background glow */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

<div className="max-w-7xl mx-auto px-6 relative z-10">

  <div className="max-w-3xl mb-16 md:mb-24">

    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide">
      ENTERPRISE TECHNOLOGY SERVICES
    </div>

    <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
      Technology capabilities that power
      <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        modern organizations
      </span>
    </h2>

    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
      Nexxovate combines AI innovation, cloud architecture, cybersecurity
      expertise and digital transformation capabilities to help organizations
      operate faster, smarter and more securely.
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">

    {[
      {
        title: "IT & Managed Infrastructure",
        img: "/images/cloud.jpg",
        desc: "Modern cloud infrastructure, platform reliability and scalable technology operations."
      },
      {
        title: "AI & Intelligent Automation",
        img: "/images/ai.jpg",
        desc: "AI assistants, workflow automation and intelligent systems that eliminate manual work."
      },
      {
        title: "Cybersecurity & Risk Protection",
        img: "/images/cyber.jpg",
        desc: "Advanced threat protection, governance frameworks and resilient security architecture."
      },
      {
        title: "Digital Transformation",
        img: "/images/office.jpg",
        desc: "Modernizing business platforms and operations using cloud-native technologies."
      },
      {
        title: "Technology Talent Solutions",
        img: "/images/team.jpg",
        desc: "High-impact engineering talent and specialized technical teams for critical initiatives."
      },
      {
        title: "Training & Capability Development",
        img: "/images/training.jpg",
        desc: "Upskilling teams with modern technology, AI and cloud engineering practices."
      },
    ].map((item, i) => (
      <div
        key={i}
        className="group relative min-h-[280px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
      >

        {/* image */}
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-400/20"></div>

        {/* content */}
        <div className="absolute bottom-0 p-7 text-white">

          <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>

          <h3 className="mt-5 text-xl md:text-2xl font-semibold">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-gray-200 leading-relaxed">
            {item.desc}
          </p>

        </div>

      </div>
    ))}

  </div>

</div>
</section>
{/* HOW NEXXOVATE WORKS */}
<section className="py-24 bg-gray-50">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center max-w-3xl mx-auto">

<h2 className="text-3xl md:text-4xl font-bold">
How Nexxovate Works
</h2>

<p className="mt-4 text-gray-600">
Our structured approach ensures every transformation initiative
delivers measurable business impact.
</p>

</div>

<div className="grid md:grid-cols-4 gap-12 mt-16 relative">

{[
{
title:"Discover",
desc:"Understand business goals, systems, workflows and operational challenges."
},
{
title:"Design",
desc:"Architect AI systems, cloud platforms and automation strategies."
},
{
title:"Build",
desc:"Develop, integrate and deploy intelligent solutions using modern engineering."
},
{
title:"Scale",
desc:"Optimize systems and expand capabilities for long-term growth."
}
].map((step,i)=>(
<div key={i} className="text-center group">

<div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow group-hover:scale-110 transition">
{i+1}
</div>

<h3 className="mt-4 font-semibold text-lg">
{step.title}
</h3>

<p className="mt-2 text-gray-600 text-sm">
{step.desc}
</p>

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
            {[
  {
    name: "AWS",
    desc: "Scalable cloud infrastructure and secure deployments"
  },
  {
    name: "Azure",
    desc: "Enterprise cloud architecture and Microsoft ecosystem integration"
  },
  {
    name: "Google Cloud",
    desc: "Data platforms and AI-powered cloud solutions"
  },
  {
    name: "React",
    desc: "High-performance web applications and modern interfaces"
  },
  {
    name: "Node.js",
    desc: "Scalable backend systems and API development"
  },
  {
    name: "Python",
    desc: "AI, automation and intelligent data processing"
  },
  {
    name: "Kubernetes",
    desc: "Container orchestration and resilient infrastructure"
  },
  {
    name: "Docker",
    desc: "Containerized deployments and microservice environments"
  },
].map((tech) => (
  <div
    key={tech.name}
    className="bg-white rounded-xl p-5 md:p-8 shadow-md text-center hover:shadow-lg transition"
  >
    <div className="h-1 w-10 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3" />

    <h3 className="text-sm md:text-lg font-semibold">
      {tech.name}
    </h3>

    <p className="mt-1 text-xs md:text-sm text-gray-500">
      {tech.desc}
    </p>
  </div>
))}
          </div>
        </div>
      </section>
      <AIAuditTool />

{/* CTA */}
<section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-20">

<div className="max-w-6xl mx-auto px-6 text-center">

<h2 className="text-4xl font-bold">
Ready to implement AI in your organization?
</h2>

<p className="mt-4 text-gray-200">
Let's design a roadmap for AI automation and enterprise platforms.
</p>

<Link
href="/contact"
className="inline-block mt-8 bg-white text-black px-10 py-4 rounded-full hover:scale-105 transition"
>
Schedule a Consultation
</Link>

</div>

</section>

</main>
);
}