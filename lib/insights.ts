/* ============================================================
   Insights — the writing.
   Held as data so the index, the article pages, the sitemap and
   NEXAF all read from the same source.
   ============================================================ */

export type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  poster: string;
  accent: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "future-of-ai-in-enterprise-operations",
    title: "The future of AI in enterprise operations",
    category: "AI & Automation",
    excerpt:
      "Assistants changed how operations teams work. Autonomy changes what they are responsible for — and that is a governance question long before it is a technology one.",
    readingTime: "6 min",
    featured: true,
    poster: "/images/ai.jpg",
    accent: "#4d7cff",
    body: [
      {
        paragraphs: [
          "The first wave of enterprise AI made operations faster without making them different. A recommendation still needs a person to accept it; a summary still needs a person to act on it. The work moved earlier in the day, but it did not leave the queue.",
          "The second wave is not about better recommendations. It is about the conditions under which a system is allowed to finish the job itself — and those conditions are architectural, not conversational.",
        ],
      },
      {
        heading: "Three things have to be true",
        paragraphs: [
          "Authority has to be explicit. An autonomous system needs a stated boundary: which systems it may touch, which classes of change it may make, what blast radius is acceptable, and the point at which it must stop and hand over. A boundary that is implied by a prompt is not a boundary.",
          "Evidence has to precede action. If the reasoning behind a change cannot be reconstructed afterwards — the signals, the correlation, the topology it was assessed against, the prior incidents it matched — then what you have is an unattributed change, whatever the interface calls it.",
          "Reversal has to be designed. The realistic failure mode for an autonomous system is not catastrophe; it is a plausible action taken against a situation it misread. If every action carries its rollback and every execution is verified against expected state, that failure resolves itself into an escalation.",
        ],
      },
      {
        heading: "What this means for operations teams",
        paragraphs: [
          "The role does not disappear. It moves up a level: from resolving incidents to setting and reviewing the boundaries inside which incidents get resolved. That is a genuinely different skill, and most organisations underestimate how much of it has to exist before the first autonomous action is safe.",
          "It also changes what a good week looks like. Volume handled stops being the measure. What matters is the proportion of work that closed inside policy, the proportion that escalated correctly, and — the number nobody wants to publish but everybody should track — the proportion that escalated late.",
        ],
      },
      {
        heading: "Where to start",
        paragraphs: [
          "Start with a class of work whose failure modes you already understand well, whose blast radius is small, and whose verification is unambiguous. Certificate rotation is a better first candidate than capacity management. Not because it is more valuable, but because you will know immediately whether it worked.",
          "Widen coverage because the system earned it. Autonomy that expands on a schedule rather than on evidence is just a deadline with better branding.",
        ],
      },
    ],
  },
  {
    slug: "cybersecurity-boardroom-priority",
    title: "Why cybersecurity is now a boardroom priority",
    category: "Cybersecurity",
    excerpt:
      "Cyber risk stopped being an IT concern the moment it became a reporting obligation. The board question is no longer whether you are secure, but how quickly you can prove what happened.",
    readingTime: "5 min",
    poster: "/images/cyber.jpg",
    accent: "#b451d8",
    body: [
      {
        paragraphs: [
          "For most of the last two decades, security sat inside technology and reported upward in summary. That arrangement ended when disclosure timelines shortened and regulators began asking not whether an organisation was breached, but what it knew and when it knew it.",
          "That is a different question, and it is answered by evidence rather than by posture.",
        ],
      },
      {
        heading: "Detection is not the constraint any more",
        paragraphs: [
          "Most enterprises detect. What they struggle with is the gap between detection and containment — the interval where an alert is real, understood by one engineer, and not yet acted upon because acting requires an approval that requires a meeting.",
          "Closing that gap is an authority problem. Containment actions that are safe, reversible and well understood should not wait on a person; the ones that are not should never be automated. Deciding which is which, in advance and in writing, is the actual work.",
        ],
      },
      {
        heading: "What a board should ask",
        paragraphs: [
          "How long between deviation and containment, measured rather than estimated. Which containment actions execute without human approval, and who agreed that list. What evidence is retained for each automated action, and how quickly it can be produced under a disclosure obligation.",
          "An organisation that can answer those three questions has a security programme. One that answers with a maturity score has a slide.",
        ],
      },
    ],
  },
  {
    slug: "smart-staffing-models",
    title: "Scaling teams without diluting delivery",
    category: "Talent",
    excerpt:
      "Adding people is the easy part. Adding people without losing the judgement that made the team good is where most scaling programmes quietly fail.",
    readingTime: "5 min",
    poster: "/images/team.jpg",
    accent: "#7a5cff",
    body: [
      {
        paragraphs: [
          "Every scaling plan looks the same on a slide: a headcount curve and a hiring pipeline. What the slide does not show is the thing that actually degrades — the density of people who can reason about an unfamiliar failure without a runbook.",
          "That density is what makes a team fast. It is also the first thing to fall when hiring is measured by fill rate.",
        ],
      },
      {
        heading: "Match the model to the outcome",
        paragraphs: [
          "Contract capacity is right when the work is well specified and time-boxed. Contract-to-hire is right when both sides genuinely need evidence before committing. Permanent search is right for the roles that set the engineering culture — and those should never be filled quickly.",
          "A dedicated offshore team is a different proposition again: it works when it owns an outcome and fails when it is treated as a pool of hours billed against a ticket queue.",
        ],
      },
      {
        heading: "Screen for reasoning",
        paragraphs: [
          "A CV records proximity, not capability. The useful signal comes from watching someone work a problem that does not resolve cleanly — where the interesting answer is how they narrow it down, what they check first, and whether they say plainly when they do not know.",
          "That takes practitioners on the panel and a consistent bar that does not move when a deadline approaches. Both are governance, not recruitment.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}
