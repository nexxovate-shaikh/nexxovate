"use client";

import AISolutionFinder from "./AISolutionFinder";
import AISolutionPlayground from "./AISolutionPlayground";
import AIWebsiteAnalyzer from "./AIWebsiteAnalyzer";
import Reveal from "./Reveal";

export default function AIToolsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/40">

      <div className="max-w-7xl mx-auto px-6">

        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Nexxovate AI Tools
            </h2>

            <p className="mt-4 text-gray-600">
              Explore AI opportunities, analyze business challenges, and
              discover automation solutions instantly.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-10">

          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <AISolutionFinder />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <AISolutionPlayground />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <AIWebsiteAnalyzer />
            </div>
          </Reveal>

        </div>

      </div>

    </section>
  );
}