# Cinematic video slots

The site is built to carry cinematic footage inside its 3D and curved-display
surfaces. Nothing here is required — every surface falls back to its poster
image, so the site ships and looks complete without a single video file.

Drop MP4s (H.264, no audio track needed, 1920×1080 or 2560×1440, ~8–15 s,
seamless loop, 3–8 MB each) at these exact paths and they will appear
automatically:

| Path                              | Where it appears                          |
| --------------------------------- | ----------------------------------------- |
| `/videos/ams.mp4`                 | AMS portal + AMS world sequence           |
| `/videos/ams-detection.mp4`       | AMS → Signal & detection                  |
| `/videos/ams-resolution.mp4`      | AMS → Autonomous resolution               |
| `/videos/service-desk.mp4`        | Nexyra AI Service Desk portal + sequence  |
| `/videos/desk-understanding.mp4`  | Service Desk → Understanding              |
| `/videos/desk-collab.mp4`         | Service Desk → Agent collaboration        |
| `/videos/nexyra-os.mp4`           | Nexyra OS portal + sequence               |
| `/videos/nexyra-connect.mp4`      | Nexyra OS → Connected systems             |
| `/videos/nexyra-exec.mp4`         | Nexyra OS → Autonomous execution          |
| `/videos/security.mp4`            | Cybersecurity portal + sequence           |
| `/videos/cloud.mp4`               | Cloud & Infrastructure portal + sequence  |
| `/videos/transformation.mp4`      | Digital Transformation portal + sequence  |
| `/videos/ai.mp4`                  | Services → AI & Intelligent Automation    |
| `/videos/team.mp4`                | About → Who we are                        |
| `/videos/office.mp4`              | About → Mission & vision                  |
| `/videos/talent.mp4`              | Talent Solutions → How we select          |
| `/videos/training.mp4`            | Training → How we teach                   |
| `/videos/case-support.mp4`        | Case studies → AI service assistant       |
| `/videos/case-workflow.mp4`       | Case studies → Workflow automation        |
| `/videos/case-analytics.mp4`      | Case studies → Operational intelligence   |

## How playback behaves

- The poster image renders first and is never removed — it is the permanent
  fallback.
- A clip is only fetched when its surface is on screen (and, in the 3D
  carousel, only when its portal is the focused one).
- Playback pauses the moment the surface leaves the viewport.
- Reduced-motion, low-power devices and narrow viewports never fetch video at
  all.
- A missing or unplayable file is not an error state: the poster simply stays.

Poster images live in `/public/images/` and are set per surface in
`lib/brand.ts` (`portal.poster`) and in each page's `SplitFeature` block.
