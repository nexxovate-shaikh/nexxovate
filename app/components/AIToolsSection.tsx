"use client";

import { Sparkles, Bot, Search } from "lucide-react";

export default function AIToolsSection() {
  const tools = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Opportunity Explorer",
      desc: "Describe a business challenge and Nexxovate AI identifies automation opportunities, intelligent workflows and potential efficiency gains instantly.",
      placeholder: "Example: automate customer onboarding",
      button: "Analyze Opportunity"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Solution Advisor",
      desc: "Receive architecture and automation recommendations powered by Nexxovate’s enterprise AI framework.",
      placeholder: "Example: automate invoice processing",
      button: "Generate Solution"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Website AI Analyzer",
      desc: "Analyze your website to uncover automation gaps, AI integration opportunities and digital performance insights.",
      placeholder: "https://yourcompany.com",
      button: "Analyze Website"
    }
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-medium tracking-wide">
            AI PRODUCTIVITY TOOLS
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Explore Nexxovate
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              AI Intelligence Tools
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Discover automation opportunities, evaluate AI strategies and
            analyze digital platforms with interactive tools designed for
            modern enterprises.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">

          {tools.map((tool, i) => (
            <div
              key={i}
              className="relative group rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              {/* gradient glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10"></div>

              <div className="relative z-10">

                {/* icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                  {tool.icon}
                </div>

                {/* title */}
                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {tool.title}
                </h3>

                {/* description */}
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {tool.desc}
                </p>

                {/* input */}
                <input
                  type="text"
                  placeholder={tool.placeholder}
                  className="mt-6 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm bg-white/80 backdrop-blur"
                />

                {/* button */}
                <button
                  className="mt-5 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-[1.02] transition shadow-md"
                >
                  {tool.button}
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}