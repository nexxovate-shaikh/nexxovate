#!/usr/bin/env python3
"""
Generates the backdrop for the statistics band.

Brushed metal, not a photograph. Fine horizontal striations with a
broad raking light across them is the texture luxury goods are
photographed on — watch dials, pen barrels, speaker grilles — and
it is the honest choice here because the brand mark is itself
machined chrome.

Three rules:

1. It must survive being 200px tall behind large numerals. Detail
   finer than the striation reads as noise at that scale, so there
   is none.
2. The light rakes from lower-left to upper-right, so the four
   columns each sit on a slightly different value. A perfectly even
   backdrop makes four columns look like a table; an uneven one
   makes them look lit.
3. Champagne only at the peak of the sweep. Metal is grey until
   light hits it.

Output: public/images/stats-band.jpg (2400x620)
"""

import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 620
OUT = pathlib.Path("public/images")

GROUND = np.array([13, 14, 17], dtype=np.float32)
STEEL = np.array([126, 147, 172], dtype=np.float32)
PLATINUM = np.array([201, 209, 218], dtype=np.float32)
CHAMPAGNE = np.array([217, 174, 99], dtype=np.float32)

rng = np.random.default_rng(23)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    nx, ny = xx / W, yy / H

    # ── Brushed striations ──────────────────────────────────────
    # One random value per ROW, smoothed along y only. That is what
    # makes it read as brushed rather than as noise: the grain has
    # direction.
    grain = rng.normal(0.0, 1.0, size=(H, 1)).astype(np.float32)
    k = np.array([0.06, 0.12, 0.2, 0.24, 0.2, 0.12, 0.06], dtype=np.float32)
    grain = np.convolve(grain[:, 0], k, mode="same")[:, None]
    # A second, finer pass so it is not one regular frequency.
    fine = rng.normal(0.0, 0.5, size=(H, 1)).astype(np.float32)
    grain = grain * 3.2 + fine * 1.4

    # ── Raking light, lower-left to upper-right ─────────────────
    axis = (nx * 0.86 + (1.0 - ny) * 0.34)
    sweep = np.exp(-((axis - 0.72) ** 2) / 0.085)

    # A second, tighter specular line — the highlight that sells metal.
    spec = np.exp(-((axis - 0.80) ** 2) / 0.010)

    lum = 0.10 + 0.30 * sweep + 0.22 * spec

    rgb = np.zeros((H, W, 3), dtype=np.float32)
    rgb += PLATINUM * (lum * 0.30)[..., None]
    rgb += STEEL * (sweep * 0.16)[..., None]
    rgb += CHAMPAGNE * (spec * 0.20)[..., None]

    # Grain modulates the light, it does not sit on top of it —
    # unlit metal does not sparkle.
    grain2d = np.broadcast_to(grain, (H, W))
    rgb *= (1.0 + (grain2d * 0.055 * (0.25 + lum))[..., None])

    rgb += GROUND

    # ── A few constellation marks, tying it to the Nexyra field ──
    marks = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(marks)
    pts = []
    for _ in range(70):
        x = W * (0.30 + 0.72 * rng.random())
        y = rng.random() * H
        m = rng.random() ** 2.2
        r = 0.6 + m * 1.9
        col = tuple(int(v * (0.3 + 0.7 * m)) for v in PLATINUM)
        d.ellipse([x - r, y - r, x + r, y + r], fill=col)
        if m > 0.5:
            pts.append((x, y))
    for i, (x1, y1) in enumerate(pts):
        for x2, y2 in pts[i + 1 : i + 3]:
            if abs(x1 - x2) < W * 0.06 and abs(y1 - y2) < H * 0.3:
                d.line([x1, y1, x2, y2], fill=(24, 27, 31), width=1)

    marks_arr = np.asarray(marks.filter(ImageFilter.GaussianBlur(0.6)), dtype=np.float32)
    rgb += marks_arr * (0.30 + 0.70 * sweep)[..., None] * 0.40

    # ── Edge falloff so the band reads as lit, not as a lightbox ──
    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    rgb *= np.clip(1.02 - 0.34 * vx ** 2 - 0.60 * vy ** 4, 0.26, 1.0)[..., None]

    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(0.4))

    img.save(OUT / "stats-band.jpg", quality=84, optimize=True)
    print("wrote stats-band.jpg", img.size,
          f"{(OUT / 'stats-band.jpg').stat().st_size / 1024:.0f} KB")

    img.resize((1000, int(1000 * H / W))).save("/tmp/stats.png")


if __name__ == "__main__":
    main()
