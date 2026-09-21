import type { Metadata } from "next";
import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import {
  PageHero,
  SectionHead,
  OfferGrid,
  ProofList,
  PageCTA,
} from "@/app/components/PageShell";
import ServiceCard from "@/app/components/visual/ServiceCard";
import { SERVICE_OFFERS, SERVICE_PROOF } from "@/lib/content/pages";
import { SERVICES, PROCESS_STEPS } from "@/lib/content/site";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

/* ══════════════════════════════════════════════════════════════
   SERVICES.

   What was here: the other rebuild's page, running a WebGL
   "WorldSequence" per service — a curved portal frame around stock
   AI imagery with a scanline overlay. It was the page that lagged
   on scroll, and the images were the ones you said you disliked.

   What is here: this site's own system, no WebGL, and the six
   services as premium framed cards — the same construction as the
   product frames on /nexyra — each leading with a panel that shows
   what the service PRODUCES rather than decorating it.

   Every section has its own ground, so the page never reads as the
   same dark rectangle repeated:

     hero            the page hero's own image
     services        .ground-dust    — the glitter, at the edges
     process         .ground-grid    — structure, for a sequence
     why us          .ground-aurora  — warmth behind the argument
     portfolio       .ground-sheen   — a slow travelling highlight

   Nothing was removed: the portfolio, the proof list and the
   four-step process are all still here, re-grounded.
   ══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Enterprise Services for the Intelligent Era",
  description:
    "Enterprise IT and managed infrastructure, AI and intelligent automation, cybersecurity, digital transformation, talent and training from Nexxovate.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Enterprise technology services"
        lines={[<>Enterprise services</>, <Accent>for the intelligent era</Accent>]}
        intro="From IT modernisation to AI-powered transformation, Nexxovate delivers the infrastructure, intelligence and security that enterprise operations depend on."
        image="/images/plates/services.jpg"
        alt="Enterprise services"
        cta="/contact"
        ctaLabel="Scope an engagement"
      />

      {/* ── The six services ── */}
      <Section band="deep" zone="ai" className="ground-dust">
        <Container>
          <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-2 md:items-end">
            <Reveal>
              <Kicker>What we do</Kicker>
              <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
                Six capabilities,
                {" "}<br />
                <Accent>one delivery standard</Accent>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md md:text-right">
                Each panel shows what the work produces — the dashboard,
                the timeline, the team — not a picture of a server room.
              </p>
            </Reveal>
          </div>

          {/* Two columns, not three: at three the panels drop to about
              400px wide and their type becomes decoration. At two they
              stay readable, which is the whole reason they are there. */}
          <Stagger className="grid gap-8 md:gap-10 lg:grid-cols-2">
            {SERVICES.map((svc, i) =>
              svc.panel ? (
                <StaggerItem key={svc.title}>
                  <ServiceCard
                    index={i}
                    title={svc.title}
                    desc={svc.desc}
                    panel={svc.panel}
                    panelAlt={svc.panelAlt ?? ""}
                  />
                </StaggerItem>
              ) : null
            )}
          </Stagger>

          <p className="mt-10 text-[13px] text-faint">
            Panels are illustrative of each service&apos;s output; figures
            shown are examples, not client results.
          </p>
        </Container>
      </Section>

      {/* ── How we work ── */}
      <Section band="light" zone="transformation" className="ground-grid">
        <Container>
          <Reveal className="mb-9 max-w-2xl md:mb-11">
            <Kicker>The process</Kicker>
            <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
              How Nexxovate works
            </h2>
          </Reveal>

          <Stagger className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <StaggerItem key={step.title} className="bg-ink">
                <div className="flex h-full flex-col p-7 md:p-8">
                  <span className="font-mono-label tabular-nums text-[color:var(--color-champagne)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-[length:var(--text-h4)] font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.6px] leading-relaxed text-mute">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section band="deep" zone="security" className="ground-aurora">
        <Container>
          <ProofList
            kicker="Why Nexxovate"
            title="Why enterprises"
            accent="choose us"
            points={SERVICE_PROOF}
            image="/images/plates/proof-services.jpg"
            alt="Enterprise delivery"
          />
        </Container>
      </Section>

      <Section band="dark" zone="ai" className="ground-sheen">
        <Container>
          <SectionHead
            kicker="Engagement models"
            title="How we"
            accent="engage"
            intro="Enterprise-grade delivery models designed for scale and complexity."
          />
          <OfferGrid offers={SERVICE_OFFERS} />
        </Container>
      </Section>

      <PageCTA
        title="Let us design your"
        accent="transformation roadmap"
        intro="Engage with Nexxovate experts to modernise, secure and scale your organisation."
        label="Talk to our experts"
      />
    </>
  );
}
