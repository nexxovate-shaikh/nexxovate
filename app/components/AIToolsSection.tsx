"use client";

import { useState } from "react";
import { Sparkles, Bot, Search } from "lucide-react";

export default function AIToolsSection() {

  const [inputs, setInputs] = useState(["", "", ""]);
  const [results, setResults] = useState(["", "", ""]);
  const [loading, setLoading] = useState([false, false, false]);

  function handleInput(index: number, value: string) {
    const copy = [...inputs];
    copy[index] = value;
    setInputs(copy);
  }

  function runAI(index: number) {

    const text = inputs[index].toLowerCase();

    const loadingCopy = [...loading];
    loadingCopy[index] = true;
    setLoading(loadingCopy);

    setTimeout(() => {

      let response = "";

      if (index === 0) {
        if (text.includes("support") || text.includes("customer")) {
          response =
            "AI Opportunity Found:\nDeploy an AI Customer Support Assistant to automate responses and reduce support workload by up to 60%.";
        } else if (text.includes("onboarding")) {
          response =
            "AI Opportunity Found:\nAutomate onboarding workflows using AI document processing and workflow orchestration.";
        } else {
          response =
            "AI Opportunity Found:\nYour business could benefit from workflow automation and AI-powered operational assistants.";
        }
      }

      if (index === 1) {
        if (text.includes("invoice")) {
          response =
            "Recommended Architecture:\nAI document extraction + workflow automation + ERP integration for automated invoice processing.";
        } else if (text.includes("data")) {
          response =
            "Recommended Architecture:\nAI analytics pipeline with data warehouse + predictive insight dashboard.";
        } else {
          response =
            "Recommended Architecture:\nEnterprise AI assistant integrated with internal systems and knowledge bases.";
        }
      }

      if (index === 2) {
        if (!text.includes(".")) {
          response = "Please enter a valid website URL.";
        } else {
          response =
            "Website AI Analysis:\nPotential improvements detected — AI chatbot, automation workflows and analytics intelligence could significantly enhance performance.";
        }
      }

      const resultCopy = [...results];
      resultCopy[index] = response;
      setResults(resultCopy);

      const loadingDone = [...loading];
      loadingDone[index] = false;
      setLoading(loadingDone);

    }, 1200);

  }

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

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-400/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

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

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">

          {tools.map((tool, i) => (
            <div
              key={i}
              className="relative group rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
            >

              <div className="relative z-10">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md">
                  {tool.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {tool.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {tool.desc}
                </p>

                <input
                  value={inputs[i]}
                  onChange={(e) => handleInput(i, e.target.value)}
                  placeholder={tool.placeholder}
                  className="mt-6 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
                />

                <button
                  onClick={() => runAI(i)}
                  className="mt-5 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-[1.02] transition shadow-md"
                >
                  {loading[i] ? "Analyzing..." : tool.button}
                </button>

                {results[i] && (
                  <div className="mt-6 bg-purple-50 border border-purple-100 p-4 rounded-xl text-sm text-gray-700 whitespace-pre-line">
                    {results[i]}
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}