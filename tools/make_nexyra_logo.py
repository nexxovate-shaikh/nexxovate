#!/usr/bin/env python3
"""
Cuts the supplied Nexyra logo out of its presentation mock-up.

The file you sent is a photograph of the logo on a dark brushed-metal
wall, with a vignette, a lighting gradient and a generator watermark
in the corner. Dropped into the site as-is it would arrive as a dark
rectangle — fine on the charcoal bands, a grey box on the white ones,
and always slightly the wrong black. So it has to be matted out.

Why a plain circular crop was not good enough: the emblem is not a
disc. The robot figure's head, shoulder and left arm break outside
the ring on the left, and a circle mask shears them off. What is
here instead is a real matte:

  1. Model the wall. It is a smooth gradient, so for every row the
     background is estimated from clean margin strips either side of
     the artwork and interpolated across. That removes the vignette
     as well as the base tone — a single global threshold leaves the
     corners muddy.
  2. Alpha from the distance above that background, with a soft
     shoulder so edges stay anti-aliased rather than stair-stepping.
  3. Fill the interior. The dark navy and near-black passages inside
     the emblem sit at wall luminance and would punch holes straight
     through the mark; binary_fill_holes closes anything fully
     enclosed by the bright metal edge, which is exactly those.
  4. Spill suppression. Pixels that survived only weakly are pulled
     toward the artwork's own colour instead of keeping a grey rim.

Two outputs, because a 19px inline mark and a hero lockup are not
the same picture:

  nexyra-mark.png    the emblem alone, square, transparent
  nexyra-lockup.png  emblem + NEXYRA + tagline, transparent

Both are written with a premultiplied-safe straight alpha so they
composite correctly on white as well as charcoal.
"""

import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = pathlib.Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "/root/.claude/uploads/d9986685-8cc7-5c8b-af3a-0a94441a6b55/d71ea202-image.png"
)
OUT = pathlib.Path("public")

# Measured off the source by luminance profile.
EMBLEM = (491, 118, 867, 441)     # robot + ring
TYPE = (388, 478, 1003, 638)      # NEXYRA + tagline
WATERMARK = (1270, 650, 1380, 753)

# Everything the wall model must ignore.
ARTWORK = (360, 100, 1030, 660)


def smoothstep(x, a, b):
    t = np.clip((x - a) / max(b - a, 1e-6), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def wall(lum: np.ndarray) -> np.ndarray:
    """A 2-D estimate of the background.

    The first attempt interpolated horizontally between the left and
    right margins, and it failed in a way worth recording: the wall is
    lit by a soft spotlight behind the logo, so the centre is brighter
    than either margin predicts, and whole rectangles of wall survived
    the matte. Normalised convolution — blur the masked image, blur the
    mask, divide — fits the vignette as well as the base tone, and the
    residual across the wall then sits inside ±8 levels.
    """
    mask = np.ones(lum.shape, dtype=np.float32)
    x0, y0, x1, y1 = ARTWORK
    mask[y0:y1, x0:x1] = 0.0
    wx0, wy0, wx1, wy1 = WATERMARK
    mask[wy0:wy1, wx0:wx1] = 0.0

    num = ndimage.gaussian_filter(lum * mask, 70)
    den = ndimage.gaussian_filter(mask, 70)
    return num / np.maximum(den, 1e-4)


def matte(rgb, bg, box, fill: str, lo=9.0, hi=26.0, use_sat=True) -> Image.Image:
    """Cut one region out of the wall.

    `fill` decides what happens to enclosed dark areas:
      "solid"  every hole is interior — used for the emblem, whose
               navy passages sit at wall luminance and would otherwise
               punch straight through the mark;
      "none"   holes are real — used for the type, where the counters
               of e, a and g must stay transparent or the wordmark
               turns into a row of blobs on the white band.
    """
    x0, y0, x1, y1 = box
    sub = rgb[y0:y1, x0:x1]
    sbg = bg[y0:y1, x0:x1]
    lum = sub @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    sat = sub.max(axis=2) - sub.min(axis=2)

    # Two cues, because neither alone covers the artwork: the silver is
    # bright but neutral, the navy is dark but saturated. The wall is
    # both dim and neutral, so it fails both tests.
    alpha = smoothstep(lum - sbg, lo, hi)
    if use_sat:
        alpha = np.maximum(alpha, smoothstep(sat, 22.0, 38.0))

    solid = ndimage.binary_closing(alpha > 0.45, np.ones((5, 5)))
    if fill == "solid":
        solid = ndimage.binary_fill_holes(solid)

    lab, n = ndimage.label(solid)
    if n:
        areas = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
        keep = [i + 1 for i, a in enumerate(areas) if a >= 120]
        solid = np.isin(lab, keep)

    alpha = np.maximum(
        alpha * ndimage.binary_dilation(solid, np.ones((3, 3))),
        solid.astype(np.float32),
    )

    # Un-spill: a partially covered pixel is a blend of artwork and
    # wall, so remove the wall's share rather than leaving a grey rim
    # that is invisible on charcoal and obvious on paper.
    a3 = alpha[..., None]
    bg3 = np.repeat(sbg[..., None], 3, axis=2)
    art = np.clip(np.where(a3 > 0.03, (sub - bg3 * (1 - a3)) / np.maximum(a3, 0.03), sub), 0, 255)

    img = Image.fromarray(np.dstack([art, alpha * 255]).astype(np.uint8), "RGBA")
    r, g, b, al = img.split()
    return Image.merge("RGBA", (r, g, b, al.filter(ImageFilter.GaussianBlur(0.5))))


def square(img: Image.Image, size: int) -> Image.Image:
    """Centre on a transparent square canvas, then scale."""
    side = max(img.size)
    pad = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    pad.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    return pad.resize((size, size), Image.LANCZOS)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"source not found: {SRC}")
    OUT.mkdir(parents=True, exist_ok=True)

    rgb = np.asarray(Image.open(SRC).convert("RGB"), dtype=np.float32)
    lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    bg = wall(lum)

    # 320px, not 512. The largest placement is 52px, so 320 covers a
    # 3x display with room to spare; 512 was a third of a megabyte of
    # detail no screen would ever resolve.
    emblem = matte(rgb, bg, EMBLEM, fill="solid")
    square(emblem, 320).save(OUT / "nexyra-mark.png", optimize=True)

    # Lockup: the two mattes recomposed at their original spacing, so
    # the relationship between mark and wordmark is the one you drew.
    # The type needs a different matte from the emblem. Its letters are
    # neutral silver, so the saturation cue contributes nothing but the
    # wall's own colour noise, and the drop shadow under each letter
    # sits just above the wall — at the emblem's threshold it survived
    # as a ragged dark fringe that was invisible on charcoal and
    # unmistakable on paper. Luminance only, and a higher floor.
    type_ = matte(rgb, bg, TYPE, fill="none", lo=26.0, hi=52.0, use_sat=False)
    lx0 = min(EMBLEM[0], TYPE[0])
    ly0 = min(EMBLEM[1], TYPE[1])
    lx1 = max(EMBLEM[2], TYPE[2])
    ly1 = max(EMBLEM[3], TYPE[3])
    lock = Image.new("RGBA", (lx1 - lx0, ly1 - ly0), (0, 0, 0, 0))
    lock.alpha_composite(emblem, (EMBLEM[0] - lx0, EMBLEM[1] - ly0))
    lock.alpha_composite(type_, (TYPE[0] - lx0, TYPE[1] - ly0))
    lock = lock.resize((640, round(lock.height * 640 / lock.width)), Image.LANCZOS)
    lock.save(OUT / "nexyra-lockup.png", optimize=True)

    for f in ("nexyra-mark.png", "nexyra-lockup.png"):
        q = OUT / f
        with Image.open(q) as i:
            print(f"  {f}  {i.size[0]}x{i.size[1]}  {q.stat().st_size/1024:.0f} KB")


if __name__ == "__main__":
    print("nexyra logo:")
    main()
