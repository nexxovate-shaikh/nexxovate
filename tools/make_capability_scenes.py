#!/usr/bin/env python3
"""
Capability scenes — from the supplied 2x2 photoreal sheet.

The client supplied one 1024x559 contact sheet holding four
photographs, captioned 01-04, that map one-to-one onto CAPABILITIES:

  01  AI Automation      warehouse / inventory robotics
  02  AI Assistants      night-shift customer care
  03  Cloud Platforms    data centre + operations floor
  04  Custom AI Products clinical predictive analytics

Three things have to happen before they can sit on the page:

1. CUT.  The sheet has 6px white gutters. Each tile carries a
   burnt-in caption band across its top ("01 AI AUTOMATION:
   Streamlining Inventory Control"). The card already prints the
   ordinal and the title in the site's own type, so the band is
   cropped away rather than shown twice in two different fonts.
   What is left is 503x208 — a 2.4:1 cinematic band.

2. SOFTEN THE GIBBERISH.  The image generator wrote plausible-looking
   but garbled micro-copy on several of the screens ("STETUS
   EPCERTFRNL & CTIBLC"). Left sharp it reads as a typo; blurred it
   reads as UI at depth of field, which is what a real photograph of
   a screen behind people looks like. Only the unreadable lines are
   touched — the NEXXOVATE wordmarks and the legible chat bubble are
   left alone.

3. GRADE.  Straight out of the generator these are blue and bright;
   the site is charcoal, steel, platinum and champagne. The grade
   desaturates, rolls the blue toward steel, crushes the blacks to
   the page ground, warms only the top of the highlight range toward
   champagne, then vignettes and grains so the four sit together and
   sit with the hero.

Output: public/images/cap-scene-1..4.jpg (1206x499)
"""

import pathlib
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = pathlib.Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "/root/.claude/uploads/d9986685-8cc7-5c8b-af3a-0a94441a6b55/86479918-image.jpg"
)
OUT = pathlib.Path("public/images")

# Gutter-detected tile bounds on the supplied sheet.
COLS = ((6, 509), (515, 1018))
ROWS = ((5, 277), (282, 554))
CAPTION_BAND = 64          # burnt-in header, cropped away
TARGET_W = 1206            # 2.4x the native cut — covers a 2x card

GROUND = np.array([10, 11, 13], dtype=np.float32)      # --color-ink
STEEL = np.array([126, 147, 172], dtype=np.float32)    # --color-steel
CHAMPAGNE = np.array([217, 174, 99], dtype=np.float32) # --color-champagne

# Rectangles of garbled machine text, in tile-local coordinates
# (503x208 after the caption band is cropped). Feathered, not hard.
GIBBERISH = {
    # Kept clear of the figures — blurring a face reads as a mistake,
    # blurring a screen reads as focus.
    1: [(303, 58, 360, 92)],                 # sign bullet lines
    2: [],                                   # chat bubble is legible — keep
    3: [(316, 18, 436, 58)],                 # "traffic spike" / status lines
    4: [(136, 20, 336, 38), (250, 42, 330, 58)],
}


def cut(sheet: Image.Image, index: int) -> Image.Image:
    r, c = divmod(index, 2)
    x0, x1 = COLS[c]
    y0, y1 = ROWS[r]
    return sheet.crop((x0, y0 + CAPTION_BAND, x1, y1))


def soften(tile: Image.Image, rects) -> Image.Image:
    """Push the unreadable micro-copy out of focus, with feathered edges
    so it reads as depth of field rather than a smudged rectangle."""
    if not rects:
        return tile
    blurred = tile.filter(ImageFilter.GaussianBlur(2.6))
    mask = Image.new("L", tile.size, 0)
    d = ImageDraw.Draw(mask)
    for x0, y0, x1, y1 in rects:
        d.rectangle([x0, y0, x1, y1], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(6))
    return Image.composite(blurred, tile, mask)


def grade(tile: Image.Image, seed: int) -> Image.Image:
    a = np.asarray(tile, dtype=np.float32) / 255.0
    h, w, _ = a.shape

    lum = (a * (0.2126, 0.7152, 0.0722)).sum(axis=2, keepdims=True)

    # Desaturate toward luminance — the source is far more colourful
    # than anything else on the page.
    a = lum + (a - lum) * 0.52

    # Roll what colour is left toward steel rather than electric blue.
    a = a * 0.86 + (lum * (STEEL / 255.0)) * 0.14

    # Match exposure across the four. Two were shot in a bright office
    # and two at night; left alone the row reads as a mood swing.
    lum_n = (a * (0.2126, 0.7152, 0.0722)).sum(axis=2)
    p60 = float(np.percentile(lum_n, 60))
    a *= float(np.clip(0.34 / max(p60, 1e-3), 0.62, 1.30))
    a = np.clip(a, 0.0, 1.0)

    # Filmic contrast about mid grey, then crush the floor to the
    # page ground so the plate has no seam against the card.
    a = np.clip((a - 0.46) * 1.26 + 0.46, 0.0, 1.0)
    a = (GROUND / 255.0) + a * (1.0 - (GROUND / 255.0)) * 0.98

    # Champagne only in the top of the highlight range — a warm key,
    # not an overall wash.
    lum2 = (a * (0.2126, 0.7152, 0.0722)).sum(axis=2, keepdims=True)
    key = np.clip((lum2 - 0.62) / 0.38, 0.0, 1.0) ** 1.6
    a = a + key * ((CHAMPAGNE / 255.0) - a) * 0.30

    # Vignette, weighted to the lower edge where the title sits.
    vx = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    vy = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    vig = np.clip(1.04 - 0.36 * (vx ** 2) - 0.30 * (vy ** 2), 0.30, 1.0)
    a *= vig[..., None]

    # A shallow floor gradient — the card's own overlay lands here too,
    # and baking part of it in keeps the type off busy pixels.
    floor = np.clip((vy + 0.35) / 1.35, 0.0, 1.0) ** 2.2
    a *= (1.0 - 0.34 * floor)[..., None]

    rng = np.random.default_rng(seed)
    a += rng.normal(0.0, 0.0075, size=(h, w, 1)).astype(np.float32)

    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"source sheet not found: {SRC}")

    OUT.mkdir(parents=True, exist_ok=True)
    sheet = Image.open(SRC).convert("RGB")

    print("capability scenes:")
    for i in range(4):
        n = i + 1
        tile = cut(sheet, i)
        tile = soften(tile, GIBBERISH[n])

        # Resample before grading so the grain is generated at output
        # resolution rather than being magnified into blotches.
        scale = TARGET_W / tile.width
        tile = tile.resize(
            (TARGET_W, round(tile.height * scale)), Image.LANCZOS
        )
        tile = tile.filter(ImageFilter.UnsharpMask(radius=1.5, percent=64, threshold=3))

        out = grade(tile, seed=40 + n)
        name = f"cap-scene-{n}.jpg"
        out.save(OUT / name, quality=86, optimize=True, progressive=True)
        print(f"  {name}  {out.size[0]}x{out.size[1]}  "
              f"{(OUT / name).stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
