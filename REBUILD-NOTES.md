# Nexxovate — cinematic rebuild

Positioning: **Beyond automation. Into autonomy.**
Supporting line: *Engineering the autonomous enterprise.*

Everything below was built into the existing Next.js 16 app. No separate demo,
no removed functionality.

---

## What was preserved

The chatbot is intact. Its step machine, OTP flow, lead capture, meeting
booking, speech synthesis and speech recognition are unchanged — only the
visual identity moved to the new system. It still calls exactly the same
endpoints:

```
POST /api/otp/send        { email }
POST /api/otp/verify      { email, code }   → { valid }
POST /api/contact/lead    { ...lead }
POST /api/contact/meeting { ...lead, meetingSlot }
```

Also untouched: the admin console and its auth (`middleware.ts`, `/api/admin/*`,
JWT, Mongo), the contact API, the Groq helper in `lib/ai.ts`, and every existing
`/api/ai*` route.

### Three real bugs fixed along the way

1. **`/api/otp/verify` never verified anything.** `verifyOTP` is async and was
   not awaited, so the route returned a `Promise`, which serialised to `{}` and
   read as truthy on the client — every code was accepted. Now awaited, with a
   strict `data.valid === true` check on the client side too.
2. **`/api/contact/meeting` did not exist.** The chatbot had always posted there
   after OTP verification, so every consultation request was silently dropped.
   The route now exists and notifies the team.
3. **`/platform/upload` posted to a route that did not exist** (`/api/upload-doc`)
   and then reported success regardless. It now posts to
   `/api/platform/knowledge`, which actually stores the document and reports
   honestly when storage is not configured.

---

## Architecture added

```
lib/
  brand.ts        navigation, positioning, the six expertise "worlds",
                  and the state machine for the signature object
  nexaf.ts        the grounded knowledge index behind Ask NEXAF
  insights.ts     the writing (index + article bodies)

app/components/webgl/
  NexusCore.tsx       THE NEXUS — the signature object
  SceneEnvironment.tsx  horizon, monoliths, dust, light rig, camera rig
  HeroScene.tsx       the homepage environment
  PortalScene.tsx     the curved video portal carousel
  Stage.tsx           one canvas wrapper owning the whole downgrade path
  shaders.ts          hand-written GLSL (no post-processing dependency)
  useCapability.ts    device/motion capability detection
  usePortalMedia.ts   poster-first video pipeline for the 3D portals

app/components/site/
  primitives.tsx  one easing curve, one reveal, one set of editorial labels
  blocks.tsx      IndexList, SplitFeature, Pillars, QuoteBand, StatRow
  Header / Footer / Hero / PageHero / AskNexaf / WorldSequence /
  CurvedMedia / PortalCarousel / ProofBand / CTASection / HomeSections
```

### The signature object — "The Nexus"

Not an orb. A machined assembly: a faceted dark-chrome core with a contained
energy shell visible through its facets, three aperture bands on independent
axes with milled index markers, twelve radial vanes for silhouette, three
travelling data arcs, and an orbital node lattice — lit by a real light rig so
the chrome has something to reflect.

It evolves through five states as you move through the site
(`activation → orchestration → collaboration → architecture → ecosystem`),
and every transition is damped, so the site feels like one continuous take.

### Curved video portals

Real cylindrical arcs in 3D, not rectangles with a perspective transform. They
orbit the Nexus; the focused portal advances toward the camera while the rest
recede above, below and behind it. The same language repeats in the DOM as
`CurvedMedia`, which clips its panel to a barrel shape with curvature falloff,
a travelling specular sheen and machined rails that follow the curve.

### Ask NEXAF

`/api/nexaf` is retrieval-first. Every answer is assembled from a curated index
built from `lib/brand.ts`; a language model is used **only to phrase material
that already exists there**, and only when `GROQ_API_KEY` is set. With no
confident match, NEXAF says so and routes to a human. Every response carries the
sources it came from. It is also the engine behind `/platform/agent`.

---

## Routes

New: `/ams`, `/nexyra`, `/nexyra/os`, `/nexyra/service-desk`,
`/insights/[slug]`, `/sitemap.xml`, plus a designed 404.

Rebuilt: `/`, `/services`, `/about`, `/staffing`, `/training`, `/insights`,
`/case-studies`, `/contact`, `/ai-consultation`, `/platform`,
`/platform/agent`, `/platform/upload`, `/client`.

Untouched: `/admin/*` and every API route not listed above.

---

## Things worth knowing

**Fonts are self-hosted.** `public/fonts/*.woff2` (Space Grotesk, Inter,
JetBrains Mono — variable cuts, SIL Open Font License) loaded via
`next/font/local`. This removes a build-time dependency on Google's servers and
means no visitor data reaches a third party. If you would rather use
`next/font/google`, swap the three `localFont()` calls in `app/layout.tsx`.

**Videos are optional.** See `public/videos/README.md` for the exact filenames
and the playback contract. Nothing breaks without them.

**`app/site.tsx` is now dead.** It exported a sitemap from a filename Next does
not recognise, so it never ran. The real one is `app/sitemap.ts`. Safe to delete.

**Performance.** WebGL is lazy-loaded and `ssr: false`; canvases stop rendering
entirely when scrolled out of view; DPR is clamped; particle counts and geometry
detail drop on narrow viewports; reduced-motion and low-power devices get a
static frame instead of a canvas. No post-processing library, no new runtime
dependencies were added to `package.json`.

**Colour.** Base is graphite/near-black; the dominant accent is electric blue,
with violet as support, magenta used sparingly and gold reserved for edges and
punctuation. Deliberately not a purple site.

---

## Running it

```bash
npm install
npm run build
npm run dev
```

Environment variables are unchanged (`.env.local`): `EMAIL_USER`, `EMAIL_PASS`,
`CRM_READ_URL`, `KV_REST_API_*`, `JWT_SECRET`, `MONGODB_URI`, `MONGODB_DB`,
`ADMIN_*`, `GROQ_API_KEY`.
