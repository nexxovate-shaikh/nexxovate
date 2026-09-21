import type { Metadata } from "next";
import { Section, Container, Kicker, Accent, Button } from "@/app/components/ui";
import { EcosystemCard } from "@/app/components/EcosystemCard";
import { PageCTA } from "@/app/components/PageShell";
import { Reveal, Stagger, StaggerItem, MaskText } from "@/lib/motion";
import { NEXYRA_PRODUCTS } from "@/lib/content/site";
import { NexyraLockup } from "@/app/components/visual/NexyraMark";
import ProductShowcase from "@/app/components/visual/ProductShowcase";

export const metadata: Metadata = {
  title: "Nexyra — Four AI Products, One Layer",
  description:
    "Nexyra by Nexxovate: network monitoring, an autonomous service desk, website auditing and an AI assistant grounded in your own data.",
};

export default function NexyraPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section band="dark" zone="ai" className="!pt-[88px]">
        <Container className="pb-10 pt-4 md:pb-14 md:pt-6">
          <div className="relative isolate overflow-hidden rounded-[20px] border border-line md:rounded-[28px]">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-[position:70%_center]"
              style={{ backgroundImage: "url('/images/nexyra-field.jpg')" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
            />

            <div className="relative flex min-h-[440px] flex-col justify-end p-8 sm:p-10 md:min-h-[560px] md:p-16">
              {/* The full lockup, not the mark: this is a dark ground
                  and it is the one placement with room for the
                  wordmark. `bare` because the band is already ink —
                  the component's own plate would be a box on a box. */}
              <span className="mb-8 inline-flex">
                <NexyraLockup width={230} bare />
              </span>
              <Kicker>The Nexyra ecosystem</Kicker>

              <MaskText
                as="h1"
                className="font-display mt-7 max-w-[14ch] text-[clamp(2.5rem,5.4vw,5rem)] font-semibold"
                delay={0.1}
                lines={[<>Nexyra</>, <Accent>Four products, one layer</Accent>]}
              />

              <Reveal delay={0.35}>
                <p className="mt-7 max-w-[48ch] text-[length:var(--text-lead)] leading-relaxed text-mute">
                  Our agentic AI ecosystem for the modern enterprise. Nexyra
                  watches the infrastructure, resolves the tickets, audits the
                  estate and answers the questions — on one intelligence layer,
                  inside your boundary.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/contact">Book a walkthrough</Button>
                  <Button href="/services" variant="ghost">
                    See the services around it
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The four products ── */}
      <Section band="deep" zone="ai" className="ground-dust">
        <Container>
          <div className="mb-10 grid gap-8 md:mb-14 md:grid-cols-2 md:items-end">
            <Reveal>
              <Kicker>The suite</Kicker>
              <h2 className="font-display mt-6 text-[length:var(--text-h2)] font-semibold">
                What Nexyra runs
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[length:var(--text-lead)] leading-relaxed text-mute md:ml-auto md:max-w-md md:text-right">
                Each product stands alone. Together they share one model of your
                estate, so what the monitor sees the service desk can act on.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {NEXYRA_PRODUCTS.map((product, i) => (
              <EcosystemCard
                key={product.id}
                id={product.id}
                name={product.name}
                tagline={product.line}
                href={product.href}
                label="Read more"
                size="small"
                shift={i * 13}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Detail ──────────────────────────────────────────────
          Each product gets one block, and the two that have a real
          capture lead with it.

          WHY THE SCREENSHOT IS THE POINT
          This section used to be four rows of prose. For software a
          buyer has never seen, prose is the weakest case you can
          make: "AI Service Desk Agent — autonomous IT support" is a
          claim, while a picture of the console with the incident
          list open is evidence. The first question anyone asks about
          a product is "what will my team be looking at all day", and
          a paragraph cannot answer it.

          The blocks alternate sides so the eye has to travel, which
          is what stops four similar rows reading as a table. Below
          lg they collapse to one column with the capture first —
          on a phone the picture is the thing worth leading with.

          The two products WITHOUT a capture keep the old full-width
          treatment. No greyed-out placeholder, no "coming soon"
          panel: on an enterprise page that reads as a product that
          does not exist yet, which is worse than saying nothing.
          ─────────────────────────────────────────────────────── */}
      <Section band="light" zone="security" className="ground-sheen">
        <Container>
          <Stagger className="flex flex-col gap-4 md:gap-6">
            {NEXYRA_PRODUCTS.map((product, i) => {
              const shot = product.shot;
              /* Alternate, counted across ALL four rather than only
                 the ones with a picture — otherwise adding a capture
                 later would silently flip every block beneath it. */
              const flip = i % 2 === 1;

              return (
                <StaggerItem key={product.id}>
                  <article
                    id={`${product.id}-detail`}
                    className="scroll-mt-28 border-b border-line py-12 first:border-t md:py-16"
                  >
                    <div
                      className={
                        shot
                          ? "grid items-center gap-9 lg:grid-cols-2 lg:gap-16"
                          : "grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16"
                      }
                    >
                      {shot && (
                        <div
                          className={
                            /* order-first on mobile, and on desktop
                               the odd rows put it on the right. */
                            flip ? "lg:order-2" : "lg:order-1"
                          }
                        >
                          <ProductShowcase
                            name={product.name}
                            src={shot.src}
                            width={shot.width}
                            height={shot.height}
                            alt={shot.alt}
                            mark={shot.mark}
                            status={shot.status}
                            caption={shot.caption}
                            href={product.live?.href}
                          />
                        </div>
                      )}

                      <div className={shot && flip ? "lg:order-1" : undefined}>
                        <span className="font-mono-label tabular-nums text-faint">
                          {String(i + 1).padStart(2, "0")} — {product.tag}
                        </span>
                        <h3 className="font-display mt-5 text-[length:var(--text-h3)] font-semibold">
                          {product.name}
                        </h3>
                        <p className="font-display mt-3 text-[length:var(--text-h4)] text-[color:var(--zone-2)]">
                          {product.line}
                        </p>

                        <p className="mt-6 max-w-2xl leading-relaxed text-mute">
                          {product.desc}
                        </p>

                        <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                          {product.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-center gap-2.5 text-[14.4px] text-mute"
                            >
                              <span
                                className="h-1 w-1 shrink-0 rounded-full"
                                style={{ background: "var(--zone-2)" }}
                                aria-hidden="true"
                              />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                          {/* A self-serve product leads with trying it.
                              Asking someone to book a call for a tool
                              they could run in ten seconds is the
                              fastest way to lose them. */}
                          {product.live && (
                            <Button href={product.live.href}>
                              {product.live.label}
                            </Button>
                          )}
                          <Button href="/contact" variant="ghost">
                            See it on your estate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      <PageCTA
        title="See Nexyra on"
        accent="your own estate"
        intro="A walkthrough uses your systems, not a demo tenant. Tell us what is noisy and we will show you what it looks like handled."
        label="Book a walkthrough"
      />
    </>
  );
}
