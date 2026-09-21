import type { Metadata } from "next";
import Image from "next/image";
import { Section, Container, Kicker, Accent } from "@/app/components/ui";
import { PageHero, SectionHead, PageCTA } from "@/app/components/PageShell";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { MISSION, VISION, PRINCIPLES, TEAM } from "@/lib/content/pages";
import { REASONS, TESTIMONIALS } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About Us — Our Story and Approach",
  description:
    "Nexxovate's mission, vision, leadership and enterprise-first approach to IT, AI, cybersecurity, staffing and digital transformation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Nexxovate"
        lines={[<>Building intelligent</>, <>enterprises for</>, <>the next decade</>]}
        intro="Nexxovate is a technology and talent partner helping organisations modernise infrastructure, adopt AI responsibly and build the teams that sustain both."
        image="/images/plates/about.jpg"
        alt="About Nexxovate"
      />

      {/* ── Mission and vision ── */}
      <Section band="deep" zone="ai" className="ground-aurora">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line md:grid-cols-2">
            {[MISSION, VISION].map((item) => (
              <Reveal key={item.title}>
                <div className="h-full bg-ink p-9 md:p-12">
                  <Kicker>{item.title}</Kicker>
                  <p className="font-display mt-7 text-[clamp(1.25rem,1.8vw,1.7rem)] font-medium leading-snug text-text">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Principles ── */}
      <Section band="light" zone="security" className="ground-grid">
        <Container>
          <SectionHead
            kicker="How we work"
            title="Our core"
            accent="principles"
            intro="The values guiding how Nexxovate builds technology and partnerships."
          />

          <Stagger className="grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="glass h-full rounded-[14px] p-8">
                  <span className="font-mono-label tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-6 text-[length:var(--text-h4)] font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[14.6px] leading-relaxed text-mute">
                    {principle.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ── Team ──
          Roles are carried over exactly as they were. Two of the
          three are titles rather than names on the existing site;
          they are left that way rather than invented. */}
      <Section band="dark" zone="transformation" className="ground-dust">
        <Container>
          <SectionHead
            kicker="Leadership"
            title="Leadership &"
            accent="core team"
          />

          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
            <Stagger className="flex flex-col">
              {TEAM.map((member, i) => (
                <StaggerItem key={member.role}>
                  <div className="flex items-baseline gap-6 border-b border-line py-7 first:border-t">
                    <span className="font-mono-label tabular-nums text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[length:var(--text-h4)] font-semibold">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[14px] text-mute">{member.role}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.12}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-line">
                <Image
                  src="/images/plates/proof-talent.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Why teams choose Nexxovate ──
          Moved here off the home page. It was 527px inside the
          Careers band there, and it reads as an About-page argument
          anyway: someone asking "why you" has already decided they
          need the category. */}
      <Section band="deep" zone="security" className="ground-sheen">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <Kicker>Trusted technology partner</Kicker>
                <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
                  Why teams
                  <br />
                  choose Nexxovate
                </h2>
              </Reveal>
            </div>

            <Stagger className="border-t border-line">
              {REASONS.map((reason, i) => (
                <StaggerItem key={reason.title}>
                  <div className="group border-b border-line py-7 md:py-8">
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono-label tabular-nums text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-[length:var(--text-h3)] font-semibold transition-colors duration-300 group-hover:text-[color:var(--zone-2)]">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl pl-[3.1rem] leading-relaxed text-mute">
                      {reason.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ── Client voices ──
          Also moved off the home page. Third-party evidence sits
          better next to the leadership and the principles than
          floating between a partner marquee and a form. */}
      <Section band="light" zone="transformation" className="ground-orbit">
        <Container>
          <SectionHead
            kicker="Client voices"
            title="Trusted by"
            accent="enterprise leaders"
          />

          <Stagger gap={0.1} className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="glass flex h-full flex-col rounded-[16px] p-8">
                  <span
                    className="font-display text-[2.5rem] leading-none text-[color:var(--zone)]"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-mute">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 border-t border-line pt-6">
                    <div className="font-display font-semibold text-text">{t.name}</div>
                    <div className="mt-1 text-[13.5px] text-faint">{t.role}</div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <PageCTA
        title="Let us build"
        accent="the future together"
        intro="Partner with Nexxovate for intelligent technology, trusted delivery and scalable growth."
      />
    </>
  );
}
