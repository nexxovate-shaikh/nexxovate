// app/insights/page.tsx

import Link from "next/link";

const insights = [
  {
    title: "The Future of AI in Enterprise Operations",
    category: "AI & Automation",
    excerpt:
      "How AI is transforming IT operations, improving efficiency, and enabling intelligent decision-making across modern enterprises.",
    slug: "future-of-ai-in-enterprise-operations",
    featured: true,
  },
  {
    title: "Why Cybersecurity is Now a Boardroom Priority",
    category: "Cybersecurity",
    excerpt:
      "Cybersecurity has moved beyond IT departments. Executive leaders now view cyber risk as a direct business risk.",
    slug: "cybersecurity-boardroom-priority",
  },
  {
    title: "Scaling Teams Faster with Smart Staffing Models",
    category: "Staffing",
    excerpt:
      "How modern staffing models help organizations scale faster while maintaining delivery quality.",
    slug: "smart-staffing-models",
  },
];

export const metadata = {
  title: "Insights | Nexxovate",
  description:
    "Insights and perspectives from Nexxovate experts on AI, cloud computing, cybersecurity, enterprise technology and digital transformation.",
};

export default function InsightsPage() {
  const featured = insights.find((i) => i.featured);
  const others = insights.filter((i) => !i.featured);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-32">

          <p className="uppercase tracking-widest text-pink-400 text-sm mb-6">
            Nexxovate Insights
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
            Perspectives shaping the future of
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent">
              enterprise technology
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl">
            Thought leadership from Nexxovate advisors on AI, cloud,
            cybersecurity and enterprise transformation.
          </p>

        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 border">

            <span className="text-xs uppercase tracking-widest text-purple-600 font-semibold">
              Featured Insight
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              {featured.title}
            </h2>

            <p className="mt-6 text-gray-600 text-lg max-w-3xl">
              {featured.excerpt}
            </p>

            <Link
              href={`/insights/${featured.slug}`}
              className="inline-block mt-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              Read full article
            </Link>

          </div>
        </section>
      )}

      {/* INSIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-12">

          {others.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="group border rounded-3xl p-10 bg-white 
              hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >

              <span className="inline-block text-xs font-semibold uppercase tracking-wider
              bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full">
                {post.category}
              </span>

              <h3 className="mt-6 text-2xl font-semibold leading-tight group-hover:text-indigo-600 transition">
                {post.title}
              </h3>

              <p className="mt-6 text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-8 text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition">
                Read insight →
              </div>

            </Link>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Looking for strategic guidance?
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Connect with Nexxovate experts to explore how these insights apply
            to your organization.
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