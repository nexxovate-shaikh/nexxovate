import Image from "next/image";
import Link from "next/link";

/* ══════════════════════════════════════════════════════════════
   SERVICE CARD — the premium card, in the same family as the
   product frames on /nexyra.

   Built on the same three moves as ProductShowcase, because those
   are what made the product frames read as expensive:

     1. A 1px GRADIENT EDGE, brightest top-left and fading out. A flat
        border is a line drawn around a thing; a fading edge reads as
        light catching a bevel. It is done with a 1px padding over a
        gradient background, since a border cannot fade.

     2. A CHAMPAGNE WASH UNDERNEATH, not an outline around. A gold
        outline reads as a selection state. A gold glow below reads
        as the card being lifted off the page. On hover it strengthens
        and the card rises 6px — the lift and the light move together,
        which is what sells the depth.

     3. THE IMAGE IS EVIDENCE. Each panel shows what the service
        produces rather than decorating it — see the note on SERVICES
        in lib/content/site.ts.

   Transform and opacity only on hover, so the compositor handles all
   of it without touching layout — this page used to lag, and the
   cards must not reintroduce that.
   ══════════════════════════════════════════════════════════════ */

export default function ServiceCard({
  index,
  title,
  desc,
  panel,
  panelAlt,
  href = "/contact",
  result,
  cta = "Talk to us about this",
  wide = false,
}: {
  index: number;
  title: string;
  desc: string;
  panel: string;
  panelAlt: string;
  href?: string;
  /** A stated outcome, shown in champagne under the title. */
  result?: string;
  cta?: string;
  /**
   * Featured layout: on large screens the panel sits beside the text
   * instead of above it, so one lead item can span a full row without
   * its panel becoming a 1280px-wide, 800px-tall slab.
   */
  wide?: boolean;
}) {
  return (
    <article className="group relative h-full">
      {/* The lift. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -bottom-5 top-10 rounded-[30px] opacity-50 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(62% 62% at 50% 100%, rgba(217,174,99,0.22), transparent 70%)",
        }}
      />

      <Link
        href={href}
        className="relative block h-full rounded-[20px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 md:rounded-[24px]"
        style={{
          padding: "1px",
          background:
            "linear-gradient(150deg, rgba(217,174,99,0.5), rgba(126,147,172,0.22) 30%, rgba(255,255,255,0.05) 62%, rgba(217,174,99,0.18))",
          boxShadow:
            "0 2px 6px rgba(4,8,18,0.35), 0 28px 64px rgba(4,8,18,0.5)",
        }}
      >
        {/* The card is pinned to its own dark band so it looks the
            same whether it sits on a light section or a dark one. */}
        <div
          data-band="dark"
          className={`flex h-full flex-col overflow-hidden rounded-[19px] md:rounded-[23px] ${
            wide ? "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center" : ""
          }`}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={panel}
              alt={panelAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 620px"
              className="object-cover"
            />
            {/* Fades the panel into the card body, so image and text
                read as one object rather than a picture on a box. */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-24 ${wide ? "lg:hidden" : ""}`}
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-ink))",
              }}
            />
          </div>

          <div className={`flex flex-1 flex-col px-7 pb-8 pt-2 md:px-9 md:pb-9 ${wide ? "lg:py-10 lg:pl-4 lg:pr-12" : ""}`}>
            <span className="font-mono-label tabular-nums text-[color:var(--color-champagne)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-4 text-[length:var(--text-h3)] font-semibold leading-tight">
              {title}
            </h3>
            {result && (
              <p className="font-display mt-3 text-[length:var(--text-h4)] font-medium text-[color:var(--color-champagne)]">
                {result}
              </p>
            )}
            <p className="mt-4 flex-1 leading-relaxed text-mute">{desc}</p>

            <span className="mt-8 inline-flex items-center gap-2.5 text-[14.5px] font-medium text-text">
              <span
                aria-hidden="true"
                className="h-px w-6 transition-[width] duration-500 ease-out group-hover:w-10"
                style={{ background: "var(--color-champagne)" }}
              />
              {cta}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
