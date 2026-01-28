// app/insights/page.tsx

import Link from "next/link";

const insights = [
  {
    title: "The Future of AI in Enterprise Operations",
    category: "AI & Automation",
    excerpt:
      "How AI is transforming IT operations, improving efficiency, and enabling intelligent decision-making across enterprises.",
    slug: "future-of-ai-in-enterprise-operations",
  },
  {
    title: "Why Cybersecurity is Now a Boardroom Priority",
    category: "Cybersecurity",
    excerpt:
      "Organizations must rethink cybersecurity strategy as digital risk increasingly becomes business risk.",
    slug: "cybersecurity-boardroom-priority",
  },
  {
    title: "Scaling Teams Faster with Smart Staffing Models",
    category: "Staffing",
    excerpt:
      "How contract-to-hire and offshore delivery models help enterprises scale without compromising quality.",
    slug: "smart-staffing-models",
  },
];

export const metadata = {
  title: "Insights | nexxovate",
  description:
    "Insights, perspectives and thought leadership on enterprise IT, AI, cybersecurity, staffing and digital transformation.",
};

export default function InsightsPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* PREMIUM HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <p className="uppercase tracking-widest text-pink-400 text-sm mb-6">
            nexxovate Insights
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
            Perspectives shaping the future of  
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              enterprise technology & transformation
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl">
            Thought leadership on IT operations, AI, cybersecurity, digital transformation
            and workforce strategy — written for decision makers.
          </p>
        </div>
      </section>

      {/* FEATURED STRIP */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-500">
            Latest insights from nexxovate advisors & practitioners
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">

          {insights.map((post, index) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group relative border rounded-3xl p-10 bg-white 
                         hover:shadow-2xl transition-all duration-500
                         hover:-translate-y-2"
            >
              {/* Category pill */}
              <span className="inline-block text-xs font-semibold uppercase tracking-wider
                               bg-gradient-to-r from-pink-500 to-purple-600 
                               text-white px-3 py-1 rounded-full">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-semibold leading-tight 
                             group-hover:text-indigo-600 transition">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-6 text-gray-600 leading-relaxed text-base">
                {post.excerpt}
              </p>

              {/* CTA */}
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition">
                Read insight
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>

              {/* Decorative gradient hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-indigo-500/0 
                              group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 
                              transition pointer-events-none" />
            </Link>
          ))}

        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Looking for strategic guidance?
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Engage with nexxovate experts to explore how these insights apply to your organization.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
          >
            Speak to an expert
          </Link>
        </div>
      </section>
    </div>
  );
}
