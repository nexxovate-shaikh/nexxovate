/* ============================================================
   NEXXOVATE — brand + content model
   Single source of truth for navigation, positioning and the
   cinematic "expertise worlds". Pages read from here so the
   story stays consistent across the whole site.
   ============================================================ */

export const BRAND = {
  name: "Nexxovate",
  positioning: "Beyond automation. Into autonomy.",
  supporting: "Engineering the autonomous enterprise.",
  cta: "Let's build the future",
  domain: "https://nexxovate.in",
  email: "nexxovate@gmail.com",
} as const;

/* ------------------------------------------------------------
   NAVIGATION
------------------------------------------------------------ */

export type NavChild = {
  label: string;
  href: string;
  blurb: string;
  tag?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavChild[];
  feature?: { title: string; blurb: string; href: string };
};

export const NAV: NavGroup[] = [
  {
    label: "AMS",
    href: "/ams",
    children: [
      {
        label: "Autonomous Managed Services",
        href: "/ams",
        blurb: "Signal to resolution without a human in the loop.",
        tag: "Flagship",
      },
      {
        label: "Signal & Detection",
        href: "/ams#detection",
        blurb: "Telemetry correlation across every enterprise surface.",
      },
      {
        label: "Autonomous Resolution",
        href: "/ams#resolution",
        blurb: "Closed-loop remediation with full audit lineage.",
      },
      {
        label: "Operating Model",
        href: "/ams#model",
        blurb: "How autonomy is governed, measured and scaled.",
      },
    ],
    feature: {
      title: "The autonomy curve",
      blurb:
        "Six stages from monitored to self-governing. See where your estate sits today.",
      href: "/ams#model",
    },
  },
  {
    label: "Nexyra",
    href: "/nexyra",
    children: [
      {
        label: "Nexyra OS",
        href: "/nexyra/os",
        blurb: "The intelligent operating architecture for the enterprise.",
        tag: "Platform",
      },
      {
        label: "Nexyra AI Service Desk",
        href: "/nexyra/service-desk",
        blurb: "Collaborative agents that understand, investigate and resolve.",
      },
      {
        label: "Agent Platform",
        href: "/platform",
        blurb: "Deploy agents trained on your own knowledge estate.",
      },
    ],
    feature: {
      title: "Nexyra OS",
      blurb:
        "Agents, memory, knowledge, workflows and connected systems — assembled into one execution fabric.",
      href: "/nexyra/os",
    },
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "AI & Intelligent Automation",
        href: "/services#ai",
        blurb: "From copilots to closed-loop autonomous operations.",
      },
      {
        label: "Cloud & Infrastructure",
        href: "/services#cloud",
        blurb: "Global infrastructure, orchestrated intelligently.",
      },
      {
        label: "Cybersecurity & Risk",
        href: "/services#security",
        blurb: "Detect, analyse, isolate, stabilise — continuously.",
      },
      {
        label: "Digital Transformation",
        href: "/services#transformation",
        blurb: "Fragmented systems to autonomous enterprise.",
      },
      {
        label: "Talent Solutions",
        href: "/staffing",
        blurb: "Engineering capability at enterprise scale.",
      },
      {
        label: "Capability & Training",
        href: "/training",
        blurb: "Building the teams that run autonomous systems.",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Nexxovate", href: "/about", blurb: "Who we are and how we work." },
      { label: "Case Studies", href: "/case-studies", blurb: "Outcomes, measured." },
      { label: "AI Consultation", href: "/ai-consultation", blurb: "A structured first engagement." },
      { label: "Contact", href: "/contact", blurb: "Start the conversation." },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
];

/* ------------------------------------------------------------
   THE SIGNATURE OBJECT — states
   The Nexus evolves as you move through the site. Each state
   drives the WebGL core's geometry, motion and light.
------------------------------------------------------------ */

export type NexusState =
  | "activation"
  | "orchestration"
  | "collaboration"
  | "architecture"
  | "ecosystem";

export const NEXUS_STATES: Record<
  NexusState,
  {
    label: string;
    caption: string;
    /** ring separation */
    spread: number;
    /** core rotation speed multiplier */
    velocity: number;
    /** shell emissive intensity */
    charge: number;
    /** primary light colour */
    color: string;
    /** secondary rim colour */
    rim: string;
  }
> = {
  activation: {
    label: "Activation",
    caption: "Intelligence comes online.",
    spread: 1,
    velocity: 1,
    charge: 0.85,
    color: "#4d7cff",
    rim: "#7a5cff",
  },
  orchestration: {
    label: "Orchestration",
    caption: "Autonomous operations take the load.",
    spread: 1.35,
    velocity: 1.55,
    charge: 1.15,
    color: "#4d7cff",
    rim: "#39d0d8",
  },
  collaboration: {
    label: "Collaboration",
    caption: "Agents reason together.",
    spread: 1.15,
    velocity: 1.2,
    charge: 1,
    color: "#7a5cff",
    rim: "#b451d8",
  },
  architecture: {
    label: "Architecture",
    caption: "An operating system assembles.",
    spread: 1.6,
    velocity: 0.8,
    charge: 1.3,
    color: "#4d7cff",
    rim: "#e2c188",
  },
  ecosystem: {
    label: "Ecosystem",
    caption: "The enterprise runs itself.",
    spread: 1.9,
    velocity: 0.65,
    charge: 1.45,
    color: "#7fa0ff",
    rim: "#e2c188",
  },
};

/* ------------------------------------------------------------
   EXPERTISE WORLDS
   Each world is a cinematic sequence, not a card. `stages` drive
   the scroll-linked narrative rail; `portal` drives the curved
   video surface in the 3D carousel.
------------------------------------------------------------ */

export type World = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  href: string;
  nexus: NexusState;
  accent: string;
  stages: { label: string; detail: string }[];
  metrics: { value: string; label: string }[];
  portal: {
    /**
     * Cinematic clip. OPTIONAL, and optional on purpose — the portal
     * is designed to run on the poster alone.
     *
     * Every entry below used to name a file in /public/videos that
     * has never existed. usePortalMedia handles a missing clip
     * gracefully, so nothing looked broken on the page, but the
     * browser still built a <video>, requested the URL and took a
     * 404 every single time a portal became active. Six dead URLs,
     * re-requested on each activation — the dev log was almost
     * nothing else.
     *
     * A path that is not there is worse than no path: it costs a
     * request, it buries real errors in the console, and on a slow
     * connection it delays the portal that is trying to render.
     *
     * To add one: drop the file in /public/videos/ and set `video`
     * back to its path. The filenames the design called for are
     * noted on each world below.
     */
    video?: string;
    /** poster shown before the clip loads, and as the permanent
        fallback on reduced-motion / low-power devices */
    poster: string;
  };
};

export const WORLDS: World[] = [
  {
    id: "ams",
    index: "01",
    kicker: "Autonomous Managed Services",
    title: "Operations that resolve themselves",
    lede:
      "AMS closes the loop between what the estate reports and what actually gets done. Signals are correlated, causes are reasoned about, and remediation executes under policy — with a full audit trail behind every decision.",
    href: "/ams",
    nexus: "orchestration",
    accent: "#4d7cff",
    stages: [
      { label: "Signal", detail: "Telemetry, tickets, logs and traces stream in continuously." },
      { label: "Detection", detail: "Correlation across surfaces separates noise from event." },
      { label: "Analysis", detail: "Cause is reasoned about against topology and history." },
      { label: "Decision", detail: "Policy determines whether autonomy acts or escalates." },
      { label: "Orchestration", detail: "Runbooks execute across connected systems in order." },
      { label: "Resolution", detail: "State is verified, the loop closes, the model learns." },
    ],
    metrics: [
      { value: "6", label: "stages, closed loop" },
      { value: "24/7", label: "operational readiness" },
      { value: "100%", label: "decisions audited" },
    ],
    portal: { poster: "/images/dashboard.jpg" },
    // portal clip when authored: /videos/ams.mp4
  },
  {
    id: "service-desk",
    index: "02",
    kicker: "Nexyra AI Service Desk",
    title: "Understanding before resolution",
    lede:
      "An enterprise issue arrives as a sentence, not a schema. Nexyra reads intent, investigates across systems, brings specialist agents into the conversation, resolves — and folds what it learned back into the knowledge estate.",
    href: "/nexyra/service-desk",
    nexus: "collaboration",
    accent: "#7a5cff",
    stages: [
      { label: "Issue", detail: "A request arrives in the words the person actually used." },
      { label: "Understanding", detail: "Intent, entitlement and urgency are established." },
      { label: "Investigation", detail: "Systems of record are queried in parallel." },
      { label: "Collaboration", detail: "Specialist agents contribute where they hold context." },
      { label: "Resolution", detail: "The action is taken, not just recommended." },
      { label: "Learning", detail: "The path is retained so the next one is faster." },
    ],
    metrics: [
      { value: "L1–L3", label: "coverage" },
      { value: "Multi", label: "agent collaboration" },
      { value: "Continuous", label: "learning loop" },
    ],
    portal: { poster: "/images/ai-assistant.jpg" },
    // portal clip when authored: /videos/service-desk.mp4
  },
  {
    id: "nexyra-os",
    index: "03",
    kicker: "Nexyra OS",
    title: "An operating architecture, not a dashboard",
    lede:
      "Agents, memory, knowledge, workflows and connected systems assemble into one execution fabric. Nexyra OS is where enterprise intelligence is composed, governed and run — the layer beneath everything autonomous you operate.",
    href: "/nexyra/os",
    nexus: "architecture",
    accent: "#4d7cff",
    stages: [
      { label: "Agents", detail: "Purpose-built reasoners with scoped authority." },
      { label: "Memory", detail: "Durable, governed recall across every interaction." },
      { label: "Knowledge", detail: "Your documents, policies and estate, made queryable." },
      { label: "Workflows", detail: "Deterministic execution paths agents can invoke." },
      { label: "Systems", detail: "Connectors into the platforms you already run." },
      { label: "Execution", detail: "Autonomous action, bounded by policy and observable." },
    ],
    metrics: [
      { value: "6", label: "architectural layers" },
      { value: "Policy", label: "bounded autonomy" },
      { value: "Composable", label: "by design" },
    ],
    portal: { poster: "/images/automation.jpg" },
    // portal clip when authored: /videos/nexyra-os.mp4
  },
  {
    id: "security",
    index: "04",
    kicker: "Cybersecurity & Risk",
    title: "Contain it before it becomes an incident",
    lede:
      "A threat surfaces. The system detects it, intelligence analyses the blast radius, the security architecture activates, the threat is isolated and the environment stabilises — measured in seconds, not shift handovers.",
    href: "/services#security",
    nexus: "orchestration",
    accent: "#b451d8",
    stages: [
      { label: "Threat", detail: "An anomaly appears anywhere on the surface." },
      { label: "Detection", detail: "Behavioural baselines flag the deviation." },
      { label: "Analysis", detail: "Blast radius and lineage are established." },
      { label: "Activation", detail: "Controls engage across identity, network and endpoint." },
      { label: "Isolation", detail: "The threat is contained, not merely alerted on." },
      { label: "Stabilise", detail: "Environment returns to a verified good state." },
    ],
    metrics: [
      { value: "Zero", label: "trust posture" },
      { value: "Seconds", label: "to containment" },
      { value: "Continuous", label: "assurance" },
    ],
    portal: { poster: "/images/cyber.jpg" },
    // portal clip when authored: /videos/security.mp4
  },
  {
    id: "cloud",
    index: "05",
    kicker: "Cloud & Infrastructure",
    title: "Global estate, orchestrated as one",
    lede:
      "Infrastructure spread across regions, providers and generations of technology, presented and operated as a single intelligent system — where data movement, capacity and cost are decisions the platform makes continuously.",
    href: "/services#cloud",
    nexus: "activation",
    accent: "#39d0d8",
    stages: [
      { label: "Estate", detail: "Every region, provider and legacy footprint mapped." },
      { label: "Connection", detail: "Systems joined into one addressable fabric." },
      { label: "Movement", detail: "Data flows placed where latency and cost demand." },
      { label: "Orchestration", detail: "Capacity and posture tuned without a change window." },
    ],
    metrics: [
      { value: "Multi", label: "cloud by default" },
      { value: "Elastic", label: "capacity model" },
      { value: "Observable", label: "end to end" },
    ],
    portal: { poster: "/images/cloud.jpg" },
    // portal clip when authored: /videos/cloud.mp4
  },
  {
    id: "transformation",
    index: "06",
    kicker: "Digital Transformation",
    title: "From fragmented to self-governing",
    lede:
      "Transformation is a sequence, not a programme launch. Fragmented systems become connected systems; connected systems become intelligent ones; intelligent systems become an enterprise that runs itself.",
    href: "/services#transformation",
    nexus: "ecosystem",
    accent: "#e2c188",
    stages: [
      { label: "Fragmented", detail: "Disconnected platforms, manual seams, tribal knowledge." },
      { label: "Connected", detail: "Integration and a single operational truth." },
      { label: "Intelligent", detail: "Prediction and recommendation inside the workflow." },
      { label: "Autonomous", detail: "The enterprise executes and governs itself." },
    ],
    metrics: [
      { value: "4", label: "maturity horizons" },
      { value: "Measured", label: "at every stage" },
      { value: "Reversible", label: "by design" },
    ],
    portal: { poster: "/images/office.jpg" },
    // portal clip when authored: /videos/transformation.mp4
  },
];

/* ------------------------------------------------------------
   ASK NEXAF — suggested prompts
------------------------------------------------------------ */

export const NEXAF_PROMPTS = [
  "Explore AMS",
  "What is Nexyra OS?",
  "Explore Nexyra AI Service Desk",
  "How can Nexxovate transform enterprise operations?",
  "Explore our AI capabilities",
] as const;

/* ------------------------------------------------------------
   PROOF POINTS
------------------------------------------------------------ */

export const PROOF = [
  { value: "7.6+", label: "Years of enterprise delivery" },
  { value: "24/7", label: "Operational readiness" },
  { value: "6", label: "Stages of closed-loop autonomy" },
  { value: "100%", label: "Decisions with audit lineage" },
];
