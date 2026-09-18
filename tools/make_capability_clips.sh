#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════
# Capability clips — the four films you supplied, prepared for the
# capability cards.
#
# Four things happen to each source, and each one has a reason:
#
# 1. CROP THE CAPTION. Clip 02 carries a burnt-in "02 AI ASSISTANTS:
#    Ensuring Uninterrupted Customer Care" band across the top for
#    its whole duration. The card already prints the ordinal and the
#    title in the site's own type; two headlines in two typefaces on
#    one card is what made the earlier version look like a stock
#    slide. Measured: the band reaches ~153px, so clip 02 is cropped
#    from y=175 and the rest from y=100.
#
# 2. CROP TO 2.4:1. That is the plate's aspect. Doing it here rather
#    than with object-cover means we choose what leaves the frame
#    instead of the browser choosing, and we stop shipping 45% of
#    the pixels only to clip them at render time.
#
# 3. GRADE. Straight out of the generator these are blue and bright;
#    the site is charcoal, steel, platinum and champagne. Desaturate,
#    cool the blue toward steel, lift contrast a touch, vignette.
#    The same move the stills got, so a card that shows its poster
#    before the clip loads does not jump when the clip arrives.
#
# 4. SHRINK, HARD. Four autoplaying videos in one section is exactly
#    the thing that quietly ruins a page — it is why these were
#    stills in the first place. 960 wide (the plate renders at ~590
#    CSS px), CRF 32, no audio, faststart. That lands each clip near
#    600 KB instead of 3.8 MB: the whole set costs less than the
#    original single file.
#
# The poster is pulled from the clip's own first frame AFTER the
# grade, so poster and first video frame are identical and the
# hand-off is invisible.
#
# Output: public/video/cap/cap-clip-1..4.mp4 + .jpg
# ══════════════════════════════════════════════════════════════
set -euo pipefail

SRC_DIR="${1:-/root/.claude/uploads/d9986685-8cc7-5c8b-af3a-0a94441a6b55}"
OUT="public/video/cap"
mkdir -p "$OUT"

SRC=(
  "656b25a6-gemini_generated_video_7cf04d62.mp4"   # 01 AI Automation
  "3a720975-gemini_generated_video_e2c9601d.mp4"   # 02 AI Assistants
  "159ca49e-gemini_generated_video_f18b7070.mp4"   # 03 Cloud Platforms
  "9a103840-gemini_generated_video_0aed9ad4.mp4"   # 04 Custom AI Products
)
# Where each clip starts, and where its 1280x533 window sits.
#   01  t=3, y=115  caption gone; framed low, ceiling is dead space
#   02  t=0, y=175  caption never fades, so it is cropped out; her
#                   head is below y=175, so nothing is lost
#   03  t=3, y=45   caption gone; her head starts near y=81
#   04  t=3, y=65   caption gone; the clinicians' heads start ~y=163
#
# Each offset carries ~25px more headroom than the composition needs,
# because the plate renders at scale 1.06 for the pointer tilt — that
# is another 3% off the top and bottom at rest, and a head that just
# fits the encoded frame does not fit the rendered one.
START=(3 0 3 3)
CROP_Y=(115 175 45 65)

GRADE="eq=saturation=0.55:contrast=1.10:brightness=-0.015,\
colorbalance=rs=-0.015:gs=-0.005:bs=0.02:rm=0.03:bm=-0.025,\
vignette=PI/5.2,\
format=yuv420p"

for i in 0 1 2 3; do
  n=$((i + 1))
  in="$SRC_DIR/${SRC[$i]}"
  y="${CROP_Y[$i]}"
  ss="${START[$i]}"
  echo "clip $n  (start ${ss}s, crop y=$y)"

  ffmpeg -v error -y -ss "$ss" -i "$in" \
    -vf "crop=1280:533:0:${y},scale=960:-2,${GRADE}" \
    -an -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    "$OUT/cap-clip-${n}.mp4"

  # Poster from the graded clip itself — identical to frame one.
  ffmpeg -v error -y -i "$OUT/cap-clip-${n}.mp4" \
    -frames:v 1 -q:v 4 "$OUT/cap-clip-${n}.jpg"

  printf '  %s  %s KB   poster %s KB\n' \
    "cap-clip-${n}.mp4" \
    "$(( $(stat -c%s "$OUT/cap-clip-${n}.mp4") / 1024 ))" \
    "$(( $(stat -c%s "$OUT/cap-clip-${n}.jpg") / 1024 ))"
done
