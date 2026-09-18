/* ══════════════════════════════════════════════════════════════
   Inner-page content.

   PROVENANCE: every title, mission, vision, principle, team role
   and article below is carried over verbatim from the previous
   Services / Staffing / Training / About / Insights pages. Card
   descriptions are new — the old tiles were titles over a photo
   with no supporting copy at all, which is why those pages read
   as thin. New copy here is live site content; nothing claims a
   client, an outcome or a figure.

   Nothing here invents a client, a metric or a case study.
   ══════════════════════════════════════════════════════════════ */

export type Offer = {
  title: string;
  img: string;
  desc: string;
};

/* ── Services ───────────────────────────────────────────────── */

export const SERVICE_OFFERS: Offer[] = [
  {
    title: "IT & Managed Services",
    img: "/images/cloud.jpg",
    desc: "Cloud infrastructure, platform reliability and day-to-day operations run as a managed service, so your team is freed from keeping the lights on.",
  },
  {
    title: "AI & Intelligent Automation",
    img: "/images/ai.jpg",
    desc: "Assistants, agents and workflow automation that take routine work off people entirely — and escalate the rest with full context.",
  },
  {
    title: "Cybersecurity & Risk",
    img: "/images/cyber.jpg",
    desc: "Threat protection, governance frameworks and resilient architecture, designed around the regulations you actually answer to.",
  },
  {
    title: "Digital Transformation",
    img: "/images/office.jpg",
    desc: "Modernising legacy platforms and operations onto cloud-native foundations, sequenced so the business keeps running throughout.",
  },
  {
    title: "Consulting Services",
    img: "/images/team.jpg",
    desc: "Architecture review, roadmap definition and delivery assurance from engineers who have built the systems they are advising on.",
  },
  {
    title: "Service & Product Offerings",
    img: "/images/dashboard.jpg",
    desc: "The Nexyra product suite alongside bespoke builds, so you can adopt what exists and commission only what does not.",
  },
];

export const SERVICE_PROOF = [
  "Enterprise-grade delivery models designed for scale and complexity",
  "Engineering discipline and measurable outcomes over billable hours",
  "Security and governance built in from architecture, not bolted on",
  "Long-term partnership rather than project-and-exit",
];

/* ── Talent (formerly Staffing) ─────────────────────────────── */

export const TALENT_MODELS: Offer[] = [
  {
    title: "Contract Staffing",
    img: "/images/contract-staffing.jpg",
    desc: "Specialist engineers embedded in your delivery teams for a defined engagement, with the flexibility to scale up or stand down as the roadmap moves.",
  },
  {
    title: "Contract-to-Hire",
    img: "/images/contract-to-hire.jpg",
    desc: "Work together before committing. Engineers join on contract and convert to permanent once both sides know the fit is right.",
  },
  {
    title: "Permanent Hiring",
    img: "/images/permanent-hiring.jpg",
    desc: "Full-cycle recruitment for critical roles, screened against real technical depth rather than keyword-matched CVs.",
  },
  {
    title: "Offshore & Dedicated Teams",
    img: "/images/offshore-team.jpg",
    desc: "A dedicated squad operating as an extension of your organisation, with your process, your standards and your working hours.",
  },
];

export const TALENT_PROOF = [
  "Scalable enterprise-grade hiring aligned to business delivery outcomes",
  "Technical screening run by engineers, not recruiters alone",
  "Workforce models that flex with the roadmap instead of fighting it",
  "Retention support beyond placement — the hire has to stick",
];

/* ── Training ───────────────────────────────────────────────── */

export const TRAINING_PROGRAMS: Offer[] = [
  {
    title: "Corporate Training Programs",
    img: "/images/corporate-training.jpg",
    desc: "Structured curricula built around your stack and your delivery goals, run for whole teams rather than scattered individuals.",
  },
  {
    title: "Online Learning",
    img: "/images/online-learning.jpg",
    desc: "Self-paced modules with practical assessment, so progress is measured by what people can build rather than hours logged.",
  },
  {
    title: "Offline & Classroom Training",
    img: "/images/offline-training.jpg",
    desc: "Instructor-led workshops for the topics that genuinely need a room — architecture, incident response, hands-on labs.",
  },
  {
    title: "Career Transformation Programs",
    img: "/images/career-program.jpg",
    desc: "Longer pathways that move people into cloud, AI and platform engineering roles, with mentoring through the difficult middle.",
  },
];

export const TRAINING_PROOF = [
  "Structured programs aligned with enterprise capability building",
  "Assessment against practical outcomes, not attendance",
  "Content maintained against the platforms teams actually run",
  "Pathways that continue past certification into real delivery",
];

/* ── About ──────────────────────────────────────────────────── */

export const MISSION = {
  title: "Our Mission",
  text: "To empower organizations with intelligent technology, strong operational foundations and future-ready talent that drives sustainable business value.",
};

export const VISION = {
  title: "Our Vision",
  text: "To be a globally trusted enterprise partner across IT services, AI innovation, cybersecurity excellence and workforce transformation.",
};

export const PRINCIPLES = [
  {
    title: "Execution Excellence",
    desc: "We prioritize reliable delivery, engineering discipline and measurable outcomes.",
  },
  {
    title: "Intelligent Innovation",
    desc: "Leveraging AI, automation and modern platforms to build future-ready systems.",
  },
  {
    title: "Long-Term Partnerships",
    desc: "We focus on lasting relationships and sustainable enterprise transformation.",
  },
];

export const TEAM = [
  { name: "Shaikh Arif", role: "Founder & Managing Director" },
  { name: "Technology Lead", role: "Head of Engineering & AI" },
  { name: "Operations Lead", role: "Head of Delivery & Staffing" },
];

/* ── Insights ───────────────────────────────────────────────── */

export const ARTICLES = [
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
