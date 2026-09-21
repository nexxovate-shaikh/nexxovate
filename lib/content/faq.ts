/* ══════════════════════════════════════════════════════════════
   FAQ content, one set per page.

   Every answer restates something the site already says — the offer
   descriptions in pages.ts, the consultation stages, the enquiry
   form's consent text. None of it adds a timeline, price, guarantee
   or client. If the business changes, change the source copy and
   this together.
   ══════════════════════════════════════════════════════════════ */

export type FaqItem = { q: string; a: string };

export const FAQ_CONSULTATION: FaqItem[] = [
  {
    q: "What does an AI consultation cover?",
    a: "Four stages. We map your estate, assess which kinds of work are ready for autonomy, design the governance around it, and agree a roadmap with a measured baseline. Each stage is written down before anything is built.",
  },
  {
    q: "What do we receive at the end?",
    a: "An opportunity map that ranks candidates for autonomy and explains why, a governance model your risk team can review, and a measured baseline of what today's work costs. Together they show what to do first and how to prove it worked.",
  },
  {
    q: "Do we need an AI strategy before we start?",
    a: "No. The work starts from how your operations run today, measured from your own data. The point is to find where autonomy belongs, and where it does not, before any tool is chosen.",
  },
  {
    q: "Who carries out the consultation?",
    a: "Engineers who have built the kind of systems they are advising on. That keeps the roadmap grounded in what can be delivered, not only in what looks good on a slide.",
  },
];

export const FAQ_CASE_STUDIES: FaqItem[] = [
  {
    q: "What kind of problems do you take on?",
    a: "Work that is slow, manual or fragile: support queues, approval workflows, reporting, and the infrastructure underneath them. The common thread is a process people repeat every day that software could run.",
  },
  {
    q: "How are results measured?",
    a: "Against a baseline agreed at the start, such as hours spent or time to resolve. Improvement is then shown as a change from that baseline rather than claimed.",
  },
  {
    q: "How do we start a similar project?",
    a: "Tell us what is slow or manual today through the contact page. We usually start with one workflow, prove it, and then scale from there.",
  },
];

export const FAQ_TALENT: FaqItem[] = [
  {
    q: "Which hiring models do you offer?",
    a: "Contract staffing, contract-to-hire, permanent hiring, and offshore or dedicated teams. They cover everything from a short, defined engagement to a squad that works as part of your organisation.",
  },
  {
    q: "How do you screen engineers?",
    a: "Against real technical depth rather than keywords on a CV. The people you meet have already shown they can do the work the role needs.",
  },
  {
    q: "Can we work with someone before hiring them permanently?",
    a: "Yes. With contract-to-hire, engineers join on contract and move to a permanent role once both sides know the fit is right.",
  },
  {
    q: "Can a team grow or shrink with our roadmap?",
    a: "Contract staff can scale up or stand down as plans change. Dedicated teams follow your process, your standards and your working hours.",
  },
];

export const FAQ_TRAINING: FaqItem[] = [
  {
    q: "Who are the programmes for?",
    a: "Whole teams rather than scattered individuals. Corporate programmes are built around your stack and delivery goals, and career programmes move people into cloud, AI and platform roles.",
  },
  {
    q: "Is training online or in a classroom?",
    a: "Both. Online modules are self-paced with practical assessment. Instructor-led workshops cover the topics that need a room, such as architecture, incident response and hands-on labs.",
  },
  {
    q: "How is progress measured?",
    a: "By what people can build, not by hours logged. Online modules include practical assessment of the work itself.",
  },
  {
    q: "Do learners get support along the way?",
    a: "Yes. Career transformation programmes include mentoring through the difficult middle of the pathway.",
  },
];

export const FAQ_CONTACT: FaqItem[] = [
  {
    q: "What should I include in my message?",
    a: "What is slow, manual or fragile today, the systems involved, and what a good result would look like. The more we know, the better we can prepare for the first conversation.",
  },
  {
    q: "Can I email you instead?",
    a: "Yes. Write to info@nexxovate.com and we will reply by email.",
  },
  {
    q: "How is my information used?",
    a: "Only to respond to your enquiry, as set out in our privacy policy.",
  },
];

export const FAQ_INSIGHTS: FaqItem[] = [
  {
    q: "What do you write about?",
    a: "Enterprise AI, operations, cybersecurity and building technology teams. Each piece comes from work on systems that have to run reliably every day.",
  },
  {
    q: "Can I discuss an article with the team?",
    a: "Yes. If an article describes something your organisation is dealing with, use the contact page and tell us which piece you read.",
  },
];
