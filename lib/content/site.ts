/* ══════════════════════════════════════════════════════════════
   Site content.

   Pulled out of the page components so copy can be edited without
   touching layout, and so the nav, footer and sitemap can never
   drift apart from the routes that actually exist.

   PROVENANCE — important:
   Everything under CAPABILITIES, CASE_STUDIES, REASONS,
   TESTIMONIALS, SERVICES, PROCESS_STEPS, TECH_STACK and STATS is
   carried over verbatim from the previous site. Nothing was
   invented, removed or embellished.

   NEXYRA_PRODUCTS, PROBLEMS and UPDATES are new copy written for
   this build and signed off as live site content. They describe
   capabilities and industry-general situations only — no client,
   metric, outcome or case study is claimed anywhere, because those
   are the things that get checked.
   ══════════════════════════════════════════════════════════════ */

/* ── Events ─────────────────────────────────────────────────── */

/**
 * Dispatch on window to open the Nexyra concierge from anywhere:
 *   window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT))
 *
 * Lives here rather than in Chatbot.tsx so a component can trigger
 * the concierge without pulling the whole chat bundle into its own
 * import graph.
 */
export const OPEN_CHAT_EVENT = "nexyra:open-chat";

/* ── Navigation ─────────────────────────────────────────────── */

export type NavChild = { label: string; href: string; note: string };

/**
 * A labelled column inside a mega-menu panel. The label is the part
 * that does the work: a single flat list of nine links is a list,
 * but the same nine under three headings is a map of the company,
 * and a visitor can find the one they want without reading all of
 * them. This is the pattern the reference site uses and the single
 * biggest navigation gap the old flat dropdown left open.
 */
export type NavGroup = { title: string; items: NavChild[] };

export type NavItem = {
  label: string;
  href: string;
  /** Renders as a mega-menu panel. */
  groups?: NavGroup[];
  /** The promoted card on the right of the panel. */
  feature?: { label: string; href: string; title: string; note: string };
  /** @deprecated Single-column dropdown. Kept for mobile fallback. */
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  {
    label: "Nexyra",
    href: "/nexyra",
    groups: [
      {
        title: "The four products",
        items: [
          {
            label: "Network Monitoring",
            href: "/nexyra#monitoring-detail",
            note: "Real-time infrastructure intelligence",
          },
          {
            label: "AI Service Desk Agent",
            href: "/nexyra#service-desk-detail",
            note: "Autonomous IT support",
          },
          {
            label: "Website Auditor",
            href: "/nexyra#auditor-detail",
            note: "Performance and security auditing",
          },
          {
            label: "Nexyra Chat",
            href: "/nexyra#chat-detail",
            note: "Conversational enterprise assistant",
          },
        ],
      },
      {
        title: "The ecosystem",
        items: [
          {
            label: "Platform overview",
            href: "/nexyra",
            note: "How the four work as one system",
          },
          {
            label: "Selected work",
            href: "/case-studies",
            note: "What has been built with it",
          },
        ],
      },
    ],
    feature: {
      label: "Try it now",
      href: "/nexyra#chat-detail",
      title: "Three of the four run in your browser",
      note: "No sales call required to see what they do.",
    },
  },
  {
    label: "Services",
    href: "/services",
    groups: [
      {
        title: "What we do",
        items: [
          {
            label: "All services",
            href: "/services",
            note: "Six enterprise capabilities",
          },
          {
            label: "Case studies",
            href: "/case-studies",
            note: "Solutions we have built",
          },
          {
            label: "Consultation",
            href: "/ai-consultation",
            note: "Scope an engagement",
          },
        ],
      },
      {
        title: "People",
        items: [
          {
            label: "Talent solutions",
            href: "/talent",
            note: "Teams that sustain the build",
          },
          {
            label: "Training",
            href: "/training",
            note: "Certification and enablement",
          },
        ],
      },
    ],
    feature: {
      label: "Start here",
      href: "/contact",
      title: "Tell us what is slow, manual or fragile",
      note: "We will scope what AI can take off your team — and what it should not.",
    },
  },
  { label: "Talent", href: "/talent" },
  { label: "Training", href: "/training" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const FOOTER_GROUPS = [
  {
    title: "Nexyra",
    items: [
      { label: "Overview", href: "/nexyra" },
      { label: "Network Monitoring", href: "/nexyra#monitoring-detail" },
      { label: "AI Service Desk Agent", href: "/nexyra#service-desk-detail" },
      { label: "Website Auditor", href: "/nexyra#auditor-detail" },
      { label: "Nexyra Chat", href: "/nexyra#chat-detail" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "IT & Managed Infrastructure", href: "/services" },
      { label: "AI & Intelligent Automation", href: "/services" },
      { label: "Cybersecurity & Risk", href: "/services" },
      { label: "Digital Transformation", href: "/services" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Talent solutions", href: "/talent" },
      { label: "Training", href: "/training" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ── Scroll zones ───────────────────────────────────────────── */

export type Zone = "infrastructure" | "ai" | "security" | "transformation";

/* ── Stats — carried over ───────────────────────────────────── */

export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 250, suffix: "+", label: "Enterprise projects" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 35, suffix: "", label: "Countries served" },
  { value: 24, suffix: "/7", label: "AI operations" },
];

/* ── Capabilities — carried over ─────────────────────────────
   Titles and descriptions are the existing site's, unchanged.
   `lead`, `clip`, `poster` and `alt` are additions: the footage is
   the four films you supplied, cropped to the plate's 2.4:1 and
   graded to the palette.
   ──────────────────────────────────────────────────────────── */

export const CAPABILITIES = [
  {
    title: "AI Automation",
    lead: "The path a person no longer has to walk.",
    clip: "/video/cap/cap-clip-1.mp4",
    poster: "/video/cap/cap-clip-1.jpg",
    alt: "Autonomous mobile robots moving stock through an enterprise warehouse while an operations team reviews live inventory on a floor display.",
    desc: "Automate repetitive workflows and streamline operations with intelligent AI systems that improve efficiency and reduce manual work.",
  },
  {
    title: "AI Assistants",
    lead: "Answering, at three in the morning, correctly.",
    clip: "/video/cap/cap-clip-2.mp4",
    poster: "/video/cap/cap-clip-2.jpg",
    alt: "A support agent working late in a city-view office, an AI assistant drafting the reply on her laptop.",
    desc: "Deploy conversational AI assistants that support customers and internal teams 24/7 with accurate information and task automation.",
  },
  {
    title: "Cloud Platforms",
    lead: "Foundations that hold when the load arrives.",
    clip: "/video/cap/cap-clip-3.mp4",
    poster: "/video/cap/cap-clip-3.jpg",
    alt: "A platform engineering team on the data-centre floor, watching live traffic and capacity on a wall of dashboards.",
    desc: "Design and implement secure, scalable cloud platforms optimized for enterprise reliability and high-performance workloads.",
  },
  {
    title: "Custom AI Products",
    lead: "Commissioned where nothing off the shelf fits.",
    clip: "/video/cap/cap-clip-4.mp4",
    poster: "/video/cap/cap-clip-4.jpg",
    alt: "Clinicians reviewing a predictive risk model built for their own service, on a large interactive display.",
    desc: "Build intelligent SaaS platforms and AI-driven products tailored to unique business challenges and innovation initiatives.",
  },
];

/* ── Nexyra products ────────────────────────────────────────── */

/**
 * A real capture of the product running.
 *
 * Only two of the four have one, and the two that do not show no
 * placeholder — a greyed-out "coming soon" panel on an enterprise
 * page reads as a product that does not exist yet. Their detail
 * block simply runs full width instead, which looks deliberate
 * because it is.
 *
 * To add one: capture at 2x if you can (a 2560-wide window, or
 * Cmd-Shift-4 on a retina panel), save into public/images/product/,
 * and fill in the real pixel dimensions here so Next reserves the
 * right box and the page does not jump as it loads.
 */
export type ProductShot = {
  src: string;
  width: number;
  height: number;
  /** Say what is ON it, not that it is a screenshot. */
  alt: string;
  mark?: string;
  status?: string;
  caption?: string;
};

/**
 * ── WHY THIS IS ANNOTATED AND NOT INFERRED ────────────────────
 * It used to be a bare `= [`. With `shot` present on two entries
 * and absent on the other two, TypeScript infers a UNION of two
 * different object shapes, and `product.shot` then fails to
 * compile:
 *
 *   Property 'shot' does not exist on type
 *   '{ id: string; name: string; href: string; ... }'
 *
 * `next dev --webpack` does not type-check on every request, so
 * the page ran locally. `next build` does, so the Vercel
 * deployment failed and the site kept serving the previous build —
 * which looked exactly like the push never happening.
 *
 * The annotation makes `shot` optional on all four, which is the
 * truth: two products have a capture and two do not yet.
 */
export type NexyraProduct = {
  id: string;
  name: string;
  href: string;
  tag: string;
  line: string;
  desc: string;
  points: string[];
  shot?: ProductShot;
};

export const NEXYRA_PRODUCTS: NexyraProduct[] = [
  {
    id: "monitoring",
    name: "Network Monitoring",
    shot: {
      src: "/images/product/netpulse.jpg",
      width: 1363,
      height: 606,
      mark: "/logos/nexyra-netpulse.svg",
      status: "Live",
      alt:
        "The Nexyra NetPulse console: a row of estate counters across the top — sites monitored, open incidents, alerts suppressed in the last 24 hours, 30-day availability — with an open-incidents panel, a per-site table showing devices, downtime and SLA, and a path-attribution key separating customer LAN from carrier last mile and public internet.",
      caption:
        "Path attribution is the part operators reach for: it separates latency added on the customer LAN from the carrier last mile, which is the evidence an ISP ticket needs.",
    },
    href: "/nexyra#monitoring-detail",
    tag: "Infrastructure intelligence",
    line: "See the network before it fails.",
    desc: "Continuous telemetry across infrastructure, correlated by an inference layer that separates the anomaly that matters from the ninety that do not. Topology, saturation and failure prediction in one view.",
    points: ["Live topology mapping", "Anomaly correlation", "Predictive capacity alerts"],
  },
  {
    id: "service-desk",
    name: "AI Service Desk Agent",
    shot: {
      src: "/images/product/service-desk.jpg",
      width: 2800,
      height: 1240,
      status: "Autonomy: scoped",
      alt:
        "The Nexyra AI Service Desk console: counters for open tickets, tickets resolved by the agent in 24 hours, deflection rate and median time to close; a queue ranked by what the agent can finish now, with tickets marked agent-acting, resolved or escalated; and an open ticket showing the agent's five-step trail — read the ticket, check the systems of record, execute the runbook, verify, write up and close.",
      caption:
        "The trail is the product. Every step the agent took is on the ticket, including which systems it consulted and why the action fell inside its declared authority.",
    },
    href: "/nexyra#service-desk-detail",
    tag: "Autonomous support",
    line: "Tickets that resolve themselves.",
    desc: "An autonomous agent that reads the ticket, consults your runbooks and systems of record, executes the remediation and writes up what it did. It escalates when it should — the point is not to hide the hard tickets, it is to remove the routine ones.",
    points: ["Runbook execution", "ServiceNow integration", "Escalation with full context"],
  },
  {
    id: "auditor",
    name: "Website Auditor",
    shot: {
      src: "/images/product/auditor.jpg",
      width: 2800,
      height: 1240,
      status: "Last run 2h ago",
      alt:
        "The Nexyra Website Auditor report: four score gauges for performance, accessibility, SEO and security posture; a findings table ranked by business impact with rows tagged Revenue, Risk, Reach and Hygiene alongside the affected route and the effort to fix; and a Core Web Vitals panel showing largest contentful paint, interaction to next paint, cumulative layout shift and time to first byte.",
      caption:
        "Ranked by business impact, not scanner severity — which is why a slow checkout outranks a missing header, and the top row is the one worth doing first.",
    },
    href: "/nexyra#auditor-detail",
    tag: "Performance and security",
    line: "Every weakness, ranked by what it costs you.",
    desc: "Crawls a property end to end and returns performance, accessibility, SEO and security findings ordered by business impact rather than by scanner severity — so the first thing on the list is the first thing worth fixing.",
    points: ["Core Web Vitals audit", "Security posture scan", "Impact-ranked remediation"],
  },
  {
    id: "chat",
    name: "Nexyra Chat",
    shot: {
      src: "/images/product/chat.jpg",
      width: 1366,
      height: 551,
      status: "In your browser",
      alt:
        "Nexyra Chat open on a new conversation: a left rail with projects, artifacts, scheduled runs and chat history, four starting cards — compare two models, research with sources, build something, read a document — and a composer with a model selector and a persona selector.",
      caption:
        "One conversation, several models, and the answer opens in an artifacts panel rather than scrolling away up the thread.",
    },
    href: "/nexyra#chat-detail",
    tag: "Enterprise assistant",
    line: "Your organisation's own assistant.",
    desc: "A conversational assistant grounded in your documents, policies and operational data, deployed inside your boundary. Answers cite their source, so the people relying on it can check it.",
    points: ["Grounded in your data", "Cited answers", "Deployed in your boundary"],
  },
];

/* ── Problems we solve ──────────────────────────────────────────
   Stated as the SYMPTOM, not the solution. A capabilities list
   tells a visitor what you sell; a symptom tells them you have
   seen their week. Every one is a recognised, industry-general
   problem — none claims a Nexxovate client, an outcome or a
   figure. ──────────────────────────────────────────────────── */

export const PROBLEMS = [
  {
    id: "alerts",
    domain: "Infrastructure",
    symptom: "Four hundred alerts fired overnight. Three of them mattered.",
    response:
      "Nexyra correlates telemetry across the estate and ranks by blast radius, so the on-call engineer opens the three and not the four hundred.",
    product: "Nexyra Network Monitoring",
    href: "/nexyra#monitoring-detail",
    image: "/images/prob-1.jpg",
  },
  {
    id: "backlog",
    domain: "Service desk",
    symptom: "Half the queue is password resets and access requests.",
    response:
      "The Service Desk Agent reads the ticket, runs the runbook, closes it and writes up what it did — and escalates the ones that genuinely need a person.",
    product: "Nexyra AI Service Desk Agent",
    href: "/nexyra#service-desk-detail",
    image: "/images/prob-2.jpg",
  },
  {
    id: "decay",
    domain: "Digital estate",
    symptom: "The site got slower over eight months and nobody noticed.",
    response:
      "Continuous auditing tracks performance, accessibility and security against a threshold, and reports the drift while it is still cheap to reverse.",
    product: "Nexyra Website Auditor",
    href: "/nexyra#auditor-detail",
    image: "/images/prob-3.jpg",
  },
  {
    id: "knowledge",
    domain: "Operations",
    symptom: "The answer exists. It is in a document nobody can find.",
    response:
      "Nexyra Chat is grounded in your own documents and policies, and every answer cites the source — so the person relying on it can check it.",
    product: "Nexyra Chat",
    href: "/nexyra#chat-detail",
    image: "/images/prob-4.jpg",
  },
  {
    id: "manual",
    domain: "Back office",
    symptom: "Someone re-keys the same report every Monday morning.",
    response:
      "We map the process end to end, automate the deterministic parts and leave the judgement with the people — the goal is fewer hands on the keyboard, not fewer people.",
    product: "AI & Intelligent Automation",
    href: "/services",
    image: "/images/prob-5.jpg",
  },
  {
    id: "vacancy",
    domain: "Talent",
    symptom: "The engineering role has been open for ninety days.",
    response:
      "Contract, contract-to-hire or a dedicated squad — screened by engineers against real technical depth, so the shortlist is short and it is right.",
    product: "Talent Solutions",
    href: "/talent",
    image: "/images/prob-6.jpg",
  },
];

/* ── Case studies — carried over ────────────────────────────── */

export const CASE_STUDIES = [
  {
    title: "AI Customer Support Assistant",
    img: "/images/ai-assistant.jpg",
    desc: "Conversational AI assistant automating customer support requests and reducing response times across digital channels.",
  },
  {
    title: "Business Workflow Automation",
    img: "/images/automation.jpg",
    desc: "Enterprise automation platform processing documents, extracting data and orchestrating operational workflows.",
  },
  {
    title: "AI Analytics Dashboard",
    img: "/images/dashboard.jpg",
    desc: "AI-powered analytics platform transforming operational data into predictive insights and intelligent decisions.",
  },
];

/* ── Why Nexxovate — carried over ───────────────────────────── */

export const REASONS = [
  {
    title: "Enterprise-First Architecture",
    desc: "Every solution is engineered for scalability, reliability and security to meet the demands of modern enterprise environments.",
  },
  {
    title: "AI-Driven Innovation",
    desc: "We design intelligent automation platforms and AI-powered systems that transform operational workflows and decision-making.",
  },
  {
    title: "Strategic Technology Partnership",
    desc: "Beyond implementation, Nexxovate partners with organizations long-term to continuously scale capabilities and innovation.",
  },
];

/* ── Testimonials — carried over ────────────────────────────── */

export const TESTIMONIALS = [
  {
    quote:
      "Nexxovate transformed our operations with enterprise AI and automation. Delivery quality exceeded expectations at every stage.",
    name: "Global Manufacturing Client",
    role: "Chief Technology Officer",
  },
  {
    quote:
      "From cloud modernization to AI assistants, the implementation was seamless, well-governed and highly scalable for our scale of operations.",
    name: "Financial Services Partner",
    role: "Director of Technology",
  },
  {
    quote:
      "Their AI platform reduced manual effort dramatically while improving security posture and regulatory compliance across our clinics.",
    name: "Healthcare Enterprise",
    role: "Head of Innovation",
  },
];

/* ── Services — carried over ────────────────────────────────── */

export const SERVICES = [
  {
    title: "IT & Managed Infrastructure",
    img: "/images/cloud.jpg",
    desc: "Modern cloud infrastructure, platform reliability and scalable technology operations.",
  },
  {
    title: "AI & Intelligent Automation",
    img: "/images/ai.jpg",
    desc: "AI assistants, workflow automation and intelligent systems that eliminate manual work.",
  },
  {
    title: "Cybersecurity & Risk Protection",
    img: "/images/cyber.jpg",
    desc: "Advanced threat protection, governance frameworks and resilient security architecture.",
  },
  {
    title: "Digital Transformation",
    img: "/images/office.jpg",
    desc: "Modernizing business platforms and operations using cloud-native technologies.",
  },
  {
    title: "Technology Talent Solutions",
    img: "/images/team.jpg",
    desc: "High-impact engineering talent and specialized technical teams for critical initiatives.",
  },
  {
    title: "Training & Capability Development",
    img: "/images/training.jpg",
    desc: "Upskilling teams with modern technology, AI and cloud engineering practices.",
  },
];

/* ── Process — carried over ─────────────────────────────────── */

export const PROCESS_STEPS = [
  { title: "Discover", desc: "Understand business goals, systems, workflows and operational challenges." },
  { title: "Design", desc: "Architect AI systems, cloud platforms and automation strategies." },
  { title: "Build", desc: "Develop, integrate and deploy intelligent solutions using modern engineering." },
  { title: "Scale", desc: "Optimize systems and expand capabilities for long-term growth." },
];

/* ── Tech stack — carried over ──────────────────────────────── */

/**
 * The platforms Nexxovate builds on. Carried over verbatim from the
 * previous site.
 *
 * ── ABOUT `logo` ───────────────────────────────────────────────
 * The reference site's equivalent band shows real vendor marks in
 * white cards, and that is what makes it read as evidence rather
 * than as a list. Each card here renders a logo the moment a file
 * exists for it, and falls back to the name set in type until then.
 *
 * I have not drawn these marks. A redrawn Microsoft or AWS logo is
 * wrong in two ways at once: it is a trademark being reproduced
 * without following the owner's published rules, and it is visibly
 * off to anyone who knows the brand — which, for these eight, is
 * every technical buyer who lands on the page.
 *
 * SIX OF THE EIGHT ARE IN PLACE. They came from `simple-icons`,
 * the brand-icon library that exists for exactly this purpose —
 * installed in a scratch environment, the official path data and
 * brand hex pulled out, written to public/logos/ as six standalone
 * SVGs. Nothing was traced or approximated by hand, and no
 * dependency was added to this project.
 *
 *   google-cloud.svg  #4285F4
 *   react.svg         #61DAFB
 *   nodejs.svg        #5FA04E
 *   python.svg        #3776AB
 *   kubernetes.svg    #326CE5
 *   docker.svg        #2496ED
 *
 * ── AWS AND AZURE ──────────────────────────────────────────────
 * These two came from `devicon` rather than simple-icons, because
 * simple-icons does not carry them: 3,459 icons and zero matches
 * for aws, amazon, azure or microsoft — those owners had their
 * marks removed from that library.
 *
 * Both files are the official artwork, untouched apart from their
 * viewBox, which was cropped to the drawing's measured bounds
 * (aws 1.67:1, azure 1.06:1). Devicon ships them letterboxed inside
 * a 128x128 square, so at icon size the AWS wordmark rendered about
 * 26px wide and unreadable. Cropping changes the frame, never the
 * mark — no stretching, no recolouring, no redrawing.
 *
 * If you would rather use each vendor's own asset package, they are
 * at aws.amazon.com/architecture/icons and Microsoft's Azure
 * architecture icons. Drop the file in at the same path and it
 * replaces this one with no code change.
 *
 * Both vendors' guidelines allow showing the mark to describe
 * technology you work with, but NOT in a way implying partnership,
 * endorsement or certification. That is why this band is headed
 * "Technology stack" and not "Our partner ecosystem" — see the note
 * in app/page.tsx.
 */
/**
 * ── ABOUT `cert` ───────────────────────────────────────────────
 * Nexxovate does not hold company partner status with these
 * vendors, but the team holds individual certifications. That is a
 * different claim and, for a services buyer, a better one: a tier
 * badge tells them the company signed an agreement, a certification
 * tells them who is going to show up and what that person has
 * proven they can do.
 *
 * So the card carries the proof rather than a badge. Set `cert` to
 * a short, literal, checkable line:
 *
 *   cert: "3 × Certified Solutions Architect"
 *   cert: "Certified: Azure Administrator"
 *   cert: "2 × CKA"
 *
 * Rules for what goes in this field, because this is the part of
 * the page a buyer will verify:
 *
 *   · Only certifications someone on the team currently HOLDS.
 *     Not in progress, not booked, not expired.
 *   · Use the certification's exact published name. "AWS Certified
 *     Solutions Architect – Associate" is a real credential;
 *     "AWS Certified Expert" is not, and a cloud buyer knows the
 *     difference on sight.
 *   · Counts must be people, not exam sittings.
 *   · Keep the credential IDs on file. Every one of these is
 *     verifiable (Credly, CertMetrics, Microsoft Learn), and being
 *     asked for them is a good sign, not a bad one.
 *
 * Leave `cert` unset and the card is just the platform name, which
 * is what every card is today.
 */
export type TechItem = {
  name: string;
  desc: string;
  /** Path under /public. Renders in place of the wordmark. */
  logo?: string;
  /**
   * True when the logo file already contains the brand name, so the
   * card shows the mark alone at a larger size instead of a small
   * icon with the name repeated beside it. AWS is the only one of
   * the eight: its mark IS the "aws" lettering plus the smile.
   */
  wordmark?: boolean;
  /** A certification the team currently holds. See notes above. */
  cert?: string;
};

export const TECH_STACK: TechItem[] = [
  {
    name: "AWS",
    desc: "Scalable cloud infrastructure and secure deployments",
    logo: "/logos/aws.svg",
    wordmark: true,
    // cert: "2 × Certified Solutions Architect – Associate",
  },
  {
    name: "Azure",
    desc: "Enterprise cloud architecture and Microsoft ecosystem integration",
    logo: "/logos/azure.svg",
    // cert: "Certified: Azure Administrator Associate",
  },
  {
    name: "Google Cloud",
    desc: "Data platforms and AI-powered cloud solutions",
    logo: "/logos/google-cloud.svg",
    // cert: "Professional Cloud Architect",
  },
  {
    name: "React",
    desc: "High-performance web applications and modern interfaces",
    logo: "/logos/react.svg",
  },
  {
    name: "Node.js",
    desc: "Scalable backend systems and API development",
    logo: "/logos/nodejs.svg",
  },
  {
    name: "Python",
    desc: "AI, automation and intelligent data processing",
    logo: "/logos/python.svg",
  },
  {
    name: "Kubernetes",
    desc: "Container orchestration and resilient infrastructure",
    logo: "/logos/kubernetes.svg",
    // cert: "Certified Kubernetes Administrator",
  },
  {
    name: "Docker",
    desc: "Containerized deployments and microservice environments",
    logo: "/logos/docker.svg",
  },
];

/* ══════════════════════════════════════════════════════════════
   UPDATES & ANNOUNCEMENTS

   Live content. Every entry below is one of your real Insights
   articles — title, topic and slug all carried over from the
   existing site, nothing rewritten and nothing invented.

   One deliberate omission: THERE ARE NO DATES. The reference site
   stamps a month on each item, and it is doing real work — an
   enterprise buyer reads a dated newsroom as proof the company is
   currently operating. I could not put dates here because I do not
   know when these were published, and a wrong publication date on
   a newsroom is worse than none: it is checkable, and a stale one
   actively argues that nothing has happened since.

   Add `date` to any entry (ISO, e.g. "2026-08-18") and the rail
   prints it, formatted, in front of the read time. Until then it
   shows topic and read time, which are both true.
   ══════════════════════════════════════════════════════════════ */

export type UpdateKind = "Insight" | "Announcement" | "Press release" | "Video";

export const UPDATES: {
  title: string;
  kind: UpdateKind;
  /** Optional. ISO — formatted at render, never hand-typed. */
  date?: string;
  minutes: number;
  href: string;
}[] = [
  {
    title: "The Future of AI in Enterprise Operations",
    kind: "Insight",
    minutes: 6,
    href: "/insights/future-of-ai-in-enterprise-operations",
  },
  {
    title: "Why Cybersecurity is Now a Boardroom Priority",
    kind: "Insight",
    minutes: 5,
    href: "/insights/cybersecurity-boardroom-priority",
  },
  {
    title: "Scaling Teams Faster with Smart Staffing Models",
    kind: "Insight",
    minutes: 4,
    href: "/insights/smart-staffing-models",
  },
];

/* ══════════════════════════════════════════════════════════════
   AWARDS & RECOGNITION — deliberately empty.

   I will not invent awards, certifications, analyst placements or
   partner tiers. Inventing one is the single fastest way to lose
   an enterprise deal in procurement, and it is the exact thing you
   asked me not to do with case studies and client names.

   Add entries here and the band appears; leave it empty and the
   component renders nothing at all, so no placeholder ever reaches
   a visitor.

   Shape:
     { title: "ISO/IEC 27001:2022", issuer: "BSI", year: "2026",
       href: "/about#certifications" }
   ══════════════════════════════════════════════════════════════ */

export const AWARDS: {
  title: string;
  issuer: string;
  year: string;
  href?: string;
}[] = [];

/* ══════════════════════════════════════════════════════════════
   FOOTER LEGAL ROW

   The reference site runs seven of these — Accessibility, Modern
   Slavery Statement, Privacy Statement, AI Policy, Responsible
   Disclosure, Do not sell my personal information, Sitemap — and
   for an enterprise buyer they are not decoration. Procurement
   looks for them, and a vendor without a privacy statement is a
   vendor whose security review takes an extra month.

   All five below now resolve — no 404s in the footer.

   Two of them (/accessibility and /security) are complete and
   factual: they describe how this build actually behaves, and every
   claim in them was checked against the running site.

   Two of them (/privacy and /ai-policy) are marked INTERIM on the
   page itself. They state truthfully what the site collects and how
   AI is used, and they say plainly that they are not yet policies.
   A privacy statement and an AI policy are legal instruments —
   lawful basis, retention, data-subject rights, model governance —
   and those are for your legal advisers, not for me to invent.

   NOT INCLUDED, deliberately: "Modern Slavery Statement" and "Do
   not sell my personal information". Both are jurisdiction-specific
   obligations — the first applies above a turnover threshold under
   the UK Modern Slavery Act, the second is a CCPA right. Publishing
   either without the obligation actually applying is a false
   compliance claim, which is worse than its absence.
   ══════════════════════════════════════════════════════════════ */

export const LEGAL: { label: string; href: string }[] = [
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy", href: "/privacy" },
  { label: "AI policy", href: "/ai-policy" },
  { label: "Responsible disclosure", href: "/security" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
