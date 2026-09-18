#!/usr/bin/env python3
"""
Generates the backdrop the hero panel sits ON.

The panel is contained, so only a frame of this is ever visible:
the strip above it behind the nav, the margins either side, and
the area below the ask bar. That constraint drives the whole
design — the interest has to live at the EDGES, because the middle
is covered.

So: a wide circuit-lattice that runs off all four sides, densest
around the outside, with the centre deliberately emptied. Two soft
champagne pools sit top-right and bottom-left, on the diagonal, so
the frame is lit unevenly and the panel appears to rest on
something rather than float on flat colour.

Very low contrast throughout. This is the surface under the
object, not a second object.

Output: public/images/hero-backdrop.jpg (2400x1500)
"""

import math
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1500
OUT = pathlib.Path("public/images")

GROUND = np.array([10, 11, 13], dtype=np.float32)
STEEL = np.array([126, 147, 172], dtype=np.float32)
PLATINUM = np.array([201, 209, 218], dtype=np.float32)
CHAMPAGNE = np.array([217, 174, 99], dtype=np.float32)

rng = np.random.default_rng(41)


def edge_weight(w, h):
    """1 at the edges, ~0 in the middle. The panel covers the middle."""
    x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    y = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    d = np.maximum(np.abs(x) ** 1.6, np.abs(y) ** 1.6)
    return np.clip((d - 0.30) / 0.62, 0.0, 1.0)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    nx, ny = xx / W, yy / H
    frame = edge_weight(W, H)

    # ── Two pools on the diagonal ───────────────────────────────
    rgb = np.zeros((H, W, 3), dtype=np.float32)
    for cx, cy, sx, sy, col, amt in [
        (0.88, 0.14, 0.10, 0.10, CHAMPAGNE, 0.34),
        (0.10, 0.90, 0.12, 0.12, STEEL, 0.26),
        (0.50, -0.06, 0.30, 0.03, PLATINUM, 0.10),
    ]:
        d = ((nx - cx) ** 2) / sx + ((ny - cy) ** 2) / sy
        rgb += col * (np.exp(-d)[..., None] * amt)

    rgb *= (0.35 + 0.65 * frame)[..., None]
    base = Image.fromarray(np.clip(rgb + GROUND, 0, 255).astype(np.uint8))
    base = base.filter(ImageFilter.GaussianBlur(40))

    # ── Circuit lattice ─────────────────────────────────────────
    # Orthogonal runs with mitred corners, the way a board is laid
    # out — not the organic web used elsewhere. It reads as
    # infrastructure, which is what sits under an enterprise
    # product, and it distinguishes this surface from the Nexyra
    # star field.
    lat = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(lat)

    for _ in range(150):
        # Start near an edge, run inward, then turn.
        side = rng.integers(0, 4)
        if side == 0:
            x, y = rng.random() * W, -20
            dx, dy = 0, 1
        elif side == 1:
            x, y = W + 20, rng.random() * H
            dx, dy = -1, 0
        elif side == 2:
            x, y = rng.random() * W, H + 20
            dx, dy = 0, -1
        else:
            x, y = -20, rng.random() * H
            dx, dy = 1, 0

        pts = [(x, y)]
        for _ in range(rng.integers(2, 5)):
            step = rng.integers(60, 300)
            x, y = x + dx * step, y + dy * step
            pts.append((x, y))
            # Turn 90 degrees, board-style.
            if dx:
                dx, dy = 0, (1 if rng.random() < 0.5 else -1)
            else:
                dx, dy = (1 if rng.random() < 0.5 else -1), 0
            if not (-200 < x < W + 200 and -200 < y < H + 200):
                break

        warm = rng.random() < 0.18
        col = (34, 28, 18) if warm else (20, 24, 30)
        d.line(pts, fill=col, width=2, joint="curve")

        # A pad at the end of the run.
        if rng.random() < 0.45:
            r = 3.5
            pad = (58, 46, 28) if warm else (34, 40, 50)
            d.ellipse([pts[-1][0] - r, pts[-1][1] - r,
                       pts[-1][0] + r, pts[-1][1] + r], fill=pad)

    lat = lat.filter(ImageFilter.GaussianBlur(0.7))
    lat_arr = np.asarray(lat, dtype=np.float32)

    glow = np.asarray(lat.filter(ImageFilter.GaussianBlur(16)), dtype=np.float32)

    out = (
        np.asarray(base, dtype=np.float32)
        + lat_arr * frame[..., None] * 1.0
        + glow * frame[..., None] * 0.9
    )

    # Final vignette so the corners settle back into the page ground.
    vx = np.linspace(-1, 1, W, dtype=np.float32)[None, :]
    vy = np.linspace(-1, 1, H, dtype=np.float32)[:, None]
    out *= np.clip(1.04 - 0.22 * (vx ** 2 + vy ** 2), 0.5, 1.0)[..., None]

    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    img.save(OUT / "hero-backdrop.jpg", quality=80, optimize=True)
    print("wrote hero-backdrop.jpg", img.size,
          f"{(OUT / 'hero-backdrop.jpg').stat().st_size / 1024:.0f} KB")

    img.resize((1000, int(1000 * H / W))).save("/tmp/backdrop.png")


if __name__ == "__main__":
    main()
