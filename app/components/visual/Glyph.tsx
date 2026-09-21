/* ══════════════════════════════════════════════════════════════
   GLYPHS — fine-line emblems for the offer cards.

   These replace fourteen stock photographs (people at laptops, a
   handshake, a classroom) that sat at the top of every card on the
   Services, Talent and Training pages. Stock photography of that kind
   is the single fastest way for an enterprise site to look like every
   other enterprise site; the same images appear on thousands of them.

   The alternative a luxury brand reaches for is iconography: a small
   set of drawn marks in one hand, one weight, one palette. So each
   offering gets an original line emblem —

     · drawn on a 120-unit grid, 2-unit stroke, round caps and joins
     · steel for structure, ONE champagne element for the thing that
       matters, which is the rule the rest of the site already follows
     · coloured from band tokens, so the same glyph is champagne on
       charcoal in a dark section and bronze on white in a light one

   They are code, not images: no request, no decode, sharp at any size.
   ══════════════════════════════════════════════════════════════ */

export type GlyphId =
  | "infra" | "ai" | "shield" | "transform" | "consult" | "product"
  | "contract" | "bridge" | "permanent" | "offshore"
  | "corporate" | "online" | "classroom" | "career";

const S = "var(--color-steel)";
const C = "var(--color-champagne)";

const PATHS: Record<GlyphId, React.ReactNode> = {
  infra: (
    <>
      {[26, 52, 78].map((y) => (
        <rect key={y} x="22" y={y} width="76" height="18" rx="4" stroke={S} />
      ))}
      <circle cx="34" cy="35" r="2.4" fill={S} stroke="none" />
      <circle cx="34" cy="61" r="3.2" fill={C} stroke="none" />
      <circle cx="34" cy="87" r="2.4" fill={S} stroke="none" />
      <path d="M50 35h36M50 61h36M50 87h36" stroke={S} opacity=".5" />
    </>
  ),
  ai: (
    <>
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        const x = 60 + Math.cos(r) * 38, y = 60 + Math.sin(r) * 38;
        return (
          <g key={a}>
            <path d={`M${60 + Math.cos(r) * 13} ${60 + Math.sin(r) * 13}L${x - Math.cos(r) * 7} ${y - Math.sin(r) * 7}`} stroke={S} />
            <circle cx={x} cy={y} r="7" stroke={S} />
          </g>
        );
      })}
      <circle cx="60" cy="60" r="11" stroke={C} strokeWidth="2.6" />
      <circle cx="60" cy="60" r="3.5" fill={C} stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M60 18 94 30v26c0 22-15 36-34 44-19-8-34-22-34-44V30z" stroke={S} />
      <path d="M60 30 84 38v18c0 15-10 25-24 31" stroke={S} opacity=".45" />
      <path d="m45 60 11 11 20-22" stroke={C} strokeWidth="2.8" />
    </>
  ),
  transform: (
    <>
      <rect x="16" y="40" width="34" height="40" rx="5" stroke={S} strokeDasharray="4 5" />
      <rect x="72" y="36" width="34" height="48" rx="6" stroke={S} />
      <path d="M77 50h24M77 60h24M77 70h14" stroke={S} opacity=".5" />
      <path d="M53 60h14m-6-6 6 6-6 6" stroke={C} strokeWidth="2.6" />
    </>
  ),
  consult: (
    <>
      <circle cx="60" cy="60" r="40" stroke={S} />
      <circle cx="60" cy="60" r="30" stroke={S} opacity=".35" />
      {[0, 90, 180, 270].map((a) => {
        const r = (a * Math.PI) / 180;
        return <path key={a} d={`M${60 + Math.cos(r) * 40} ${60 + Math.sin(r) * 40}L${60 + Math.cos(r) * 46} ${60 + Math.sin(r) * 46}`} stroke={S} />;
      })}
      <path d="M60 60 76 36 64 62z" fill={C} stroke={C} strokeWidth="1.4" />
      <path d="M60 60 44 84 56 58z" stroke={S} />
    </>
  ),
  product: (
    <>
      <rect x="30" y="50" width="62" height="42" rx="6" stroke={S} opacity=".45" />
      <rect x="24" y="40" width="68" height="44" rx="6" stroke={S} opacity=".75" />
      <rect x="18" y="28" width="74" height="46" rx="6" stroke={S} />
      <path d="M18 34a6 6 0 0 1 6-6h62a6 6 0 0 1 6 6" stroke={C} strokeWidth="2.8" />
    </>
  ),
  contract: (
    <>
      <rect x="20" y="28" width="80" height="68" rx="7" stroke={S} />
      <path d="M20 46h80M40 20v14M80 20v14" stroke={S} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={34 + i * 13} cy="62" r="2.2" fill={S} stroke="none" opacity=".6" />
      ))}
      <path d="M34 80h39" stroke={C} strokeWidth="5" />
    </>
  ),
  bridge: (
    <>
      <path d="M26 96V52M94 96V52M18 96h84" stroke={S} />
      <path d="M26 52c10-26 58-26 68 0" stroke={C} strokeWidth="2.8" />
      <path d="M36 96V70M48 96V64M60 96V62M72 96V64M84 96V70" stroke={S} opacity=".4" />
    </>
  ),
  permanent: (
    <>
      <circle cx="60" cy="42" r="15" stroke={S} />
      <path d="M30 96c2-19 14-30 30-30s28 11 30 30" stroke={S} />
      <path d="m82 24 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke={C} fill={C} strokeWidth="1.4" />
    </>
  ),
  offshore: (
    <>
      <circle cx="56" cy="62" r="34" stroke={S} />
      <ellipse cx="56" cy="62" rx="15" ry="34" stroke={S} opacity=".55" />
      <path d="M22 62h68M26 46h60M26 78h60" stroke={S} opacity=".45" />
      <ellipse cx="60" cy="58" rx="50" ry="17" transform="rotate(-22 60 58)" stroke={C} strokeWidth="2.2" />
      <circle cx="101" cy="40" r="4" fill={C} stroke="none" />
    </>
  ),
  corporate: (
    <>
      <rect x="18" y="22" width="84" height="58" rx="5" stroke={S} />
      <path d="M60 80v18M44 98h32" stroke={S} />
      <path d="M34 68V56M50 68V48M66 68V52" stroke={S} strokeWidth="5" opacity=".7" />
      <path d="M82 68V36" stroke={C} strokeWidth="5" />
    </>
  ),
  online: (
    <>
      <rect x="22" y="28" width="76" height="50" rx="5" stroke={S} />
      <path d="M12 88h96l-6 8H18z" stroke={S} />
      <path d="M52 42v22l19-11z" fill={C} stroke={C} strokeWidth="1.6" />
    </>
  ),
  classroom: (
    <>
      <path d="M26 24h68" stroke={C} strokeWidth="3.2" />
      <path d="M30 24v14M90 24v14" stroke={S} opacity=".5" />
      {[54, 72, 90].map((y, r) =>
        [0, 1, 2, 3].map((i) => (
          <circle key={`${y}-${i}`} cx={33 + i * 18 + (r % 2) * 0} cy={y} r="5" stroke={S} opacity={1 - r * 0.22} />
        ))
      )}
    </>
  ),
  career: (
    <>
      <path d="M16 98h22V80h22V62h22V44h22" stroke={S} />
      <path d="M104 44V16" stroke={S} />
      <path d="M104 18h-2l-22 8 22 8" stroke={C} fill={C} strokeWidth="1.6" />
      <circle cx="27" cy="89" r="3" fill={S} stroke="none" />
    </>
  ),
};

export default function Glyph({
  id,
  size = 88,
  className = "",
  style,
}: {
  id: GlyphId;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {PATHS[id]}
    </svg>
  );
}
