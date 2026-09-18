/* ============================================================
   NEXAF — Nexxovate's enterprise answer layer.

   NEXAF is grounded, not generative-by-default. Every answer is
   assembled from a curated Nexxovate knowledge index; a language
   model is only ever used to *phrase* material that already exists
   here, and only when one is configured. If there is no confident
   match, NEXAF says so and routes the person to a human — it does
   not invent capability.
   ============================================================ */

import { WORLDS } from "./brand";

export type Entry = {
  id: string;
  title: string;
  href: string;
  keywords: string[];
  body: string;
};

const STATIC_ENTRIES: Entry[] = [
  {
    id: "positioning",
    title: "What Nexxovate does",
    href: "/about",
    keywords: [
      "nexxovate",
      "company",
      "about",
      "who",
      "what",
      "do",
      "overview",
      "autonomy",
      "autonomous",
      "enterprise",
      "intelligence",
    ],
    body: "Nexxovate is an enterprise technology company engineering the autonomous enterprise. We work across autonomous intelligence, AI and intelligent automation, Autonomous Managed Services (AMS), the Nexyra platform, cloud and infrastructure, cybersecurity and risk, and digital transformation. Our position is simple: beyond automation, into autonomy — systems that do not just assist operators but resolve, govern and improve themselves under policy.",
  },
  {
    id: "transform",
    title: "How Nexxovate transforms enterprise operations",
    href: "/ams",
    keywords: [
      "transform",
      "transformation",
      "operations",
      "improve",
      "change",
      "modernize",
      "modernise",
      "efficiency",
      "roadmap",
      "how",
    ],
    body: "Enterprise operations move through four horizons: fragmented systems, connected systems, intelligent systems, and finally an autonomous enterprise. Nexxovate takes estates through that sequence deliberately — integrating first so there is a single operational truth, adding prediction and recommendation inside existing workflows, then handing bounded classes of work to closed-loop autonomy through AMS and Nexyra OS. Every stage is measured, and every autonomous decision carries audit lineage.",
  },
  {
    id: "capabilities",
    title: "Nexxovate AI capabilities",
    href: "/services#ai",
    keywords: [
      "ai",
      "capability",
      "capabilities",
      "automation",
      "agents",
      "machine",
      "learning",
      "intelligent",
      "explore",
    ],
    body: "Nexxovate's AI work spans four layers: reasoning agents with scoped authority, a governed memory and knowledge estate, deterministic workflows agents can invoke, and connectors into the systems an enterprise already runs. Those layers are what make autonomy safe — an agent can act because its authority, its evidence and its execution path are all explicit.",
  },
  {
    id: "engage",
    title: "Working with Nexxovate",
    href: "/contact",
    keywords: [
      "contact",
      "engage",
      "start",
      "pricing",
      "cost",
      "talk",
      "consultation",
      "meeting",
      "call",
      "demo",
      "partner",
    ],
    body: "Engagements usually start with a structured consultation: we map the estate, identify where autonomy is safe to introduce first, and agree what will be measured. From there the work runs as a delivery programme with defined governance. Commercial terms are scoped per engagement — the fastest route is to speak with the team directly.",
  },
  {
    id: "talent",
    title: "Talent and capability building",
    href: "/staffing",
    keywords: [
      "staffing",
      "talent",
      "hiring",
      "recruit",
      "team",
      "training",
      "learning",
      "skills",
      "people",
      "capability",
    ],
    body: "Autonomous systems still need people who can govern them. Nexxovate provides enterprise talent solutions — contract, contract-to-hire, permanent and dedicated offshore teams — alongside structured training programmes that build the engineering and operational capability required to run intelligent systems responsibly.",
  },
];

/** the six cinematic worlds are first-class knowledge entries */
const WORLD_ENTRIES: Entry[] = WORLDS.map((w) => ({
  id: w.id,
  title: `${w.kicker} — ${w.title}`,
  href: w.href,
  keywords: [
    ...w.kicker.toLowerCase().split(/[^a-z]+/).filter(Boolean),
    ...w.title.toLowerCase().split(/[^a-z]+/).filter(Boolean),
    ...w.stages.map((s) => s.label.toLowerCase()),
    w.id,
    ...(w.id === "nexyra-os" ? ["nexyra", "os", "platform", "operating", "system"] : []),
    ...(w.id === "service-desk" ? ["nexyra", "desk", "helpdesk", "support", "ticket", "itsm"] : []),
    ...(w.id === "ams" ? ["ams", "managed", "services", "monitoring", "incident"] : []),
    ...(w.id === "security" ? ["cyber", "cybersecurity", "threat", "risk", "soc"] : []),
    ...(w.id === "cloud" ? ["cloud", "infrastructure", "aws", "azure", "hybrid"] : []),
  ],
  body: `${w.lede} The sequence runs: ${w.stages
    .map((s) => s.label)
    .join(" → ")}. ${w.stages.map((s) => `${s.label}: ${s.detail}`).join(" ")}`,
}));

export const KNOWLEDGE: Entry[] = [...WORLD_ENTRIES, ...STATIC_ENTRIES];

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "of", "to", "and", "for", "in", "on", "with",
  "how", "what", "can", "do", "does", "we", "you", "your", "our", "me", "my",
  "about", "tell", "explain", "show", "please", "it", "that", "this", "at",
]);

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export type Match = { entry: Entry; score: number };

/** Simple, explainable relevance — no hidden model, no hallucinated source. */
export function retrieve(query: string, limit = 3): Match[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  return KNOWLEDGE.map((entry) => {
    const haystack = new Set([
      ...entry.keywords,
      ...tokenize(entry.title),
    ]);

    let score = 0;
    for (const token of tokens) {
      if (haystack.has(token)) score += 3;
      else if (entry.body.toLowerCase().includes(token)) score += 1;
    }

    // exact product-name hits should dominate
    const q = query.toLowerCase();
    if (entry.id === "nexyra-os" && q.includes("nexyra os")) score += 8;
    if (entry.id === "service-desk" && q.includes("service desk")) score += 8;
    if (entry.id === "ams" && /\bams\b/.test(q)) score += 8;

    return { entry, score };
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export type NexafAnswer = {
  answer: string;
  sources: { label: string; href: string }[];
  grounded: boolean;
  phrasedByModel: boolean;
};

/** Deterministic answer built purely from the index. Always available. */
export function composeAnswer(query: string): NexafAnswer {
  const matches = retrieve(query);

  if (!matches.length) {
    return {
      answer:
        "I answer from Nexxovate's own material — AMS, Nexyra OS, the Nexyra AI Service Desk, cloud, security, transformation, talent and how we engage. I don't have a confident answer for that one, so the honest response is to put you in front of someone who does.",
      sources: [{ label: "Talk to the team", href: "/contact" }],
      grounded: false,
      phrasedByModel: false,
    };
  }

  const [primary, ...rest] = matches;

  const answer = [primary.entry.body, ...rest.slice(0, 1).map((m) => m.entry.body)]
    .join("\n\n");

  return {
    answer,
    sources: matches.map((m) => ({ label: m.entry.title, href: m.entry.href })),
    grounded: true,
    phrasedByModel: false,
  };
}
