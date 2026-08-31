---
name: Arnold Emergency
description: Read-mode emergency playbook for Arnold Church of Christ staff
colors:
  accent: "#3d9a6a"
  accent-high: "#6bc492"
  accent-low: "#1a2e24"
  status-usable-bg: "color-mix(in oklab, #3d9a6a 18%, var(--sl-color-gray-6))"
  status-wip-bg: "color-mix(in oklab, #c9a227 20%, var(--sl-color-gray-6))"
  status-wip-fg: "#d4b85c"
  status-wip-amber: "#c9a227"
typography:
  body:
    fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.55
  display:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontWeight: 600
  xs: "0.68rem"
  sm: "0.72rem"
  meta: "0.82rem"
  body-sm: "0.86rem"
  body-md: "0.9rem"
  body-lg: "0.92rem"
  section: "0.95rem"
  card-title: "1.15rem"
rounded:
  card: "0.65rem"
  list: "0.55rem"
  pill: "0.25rem"
  media: "0.35rem"
spacing:
  card-pad: "1rem 1.05rem"
  section-gap: "1.35rem"
components:
  tool-card:
    backgroundColor: "var(--sl-color-bg-sidebar)"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  site-map-status-usable:
    backgroundColor: "{colors.status-usable-bg}"
    textColor: "{colors.accent-high}"
---

## Overview

Starlight documentation site in **Read** mode: staff scan procedures under stress. Hierarchy beats decoration. Green accent signals “go / safe reference”; amber-tinted pills mean WIP/draft. Home splash is the hub; inner pages are long-form markdown.

## Colors

- **Accent** `#3d9a6a` / **accent-high** `#6bc492` — links, usable status, focus rings.
- **Accent-low** `#1a2e24` — WIP banner desktop tint.
- **Status wip amber** `#c9a227` — WIP/draft pill base (mixed into `--ae-status-wip-bg`).
- **Status:** usable = green mix; wip/draft = amber mix; reference/template = neutral gray.
- Inherit Starlight grays and hairline borders for surfaces; do not hard-code unrelated palettes.

## Typography

- **Body:** DM Sans (loaded in `astro.config.mjs`).
- **Display / h1 / card titles:** Source Serif 4.
- **Scale:** xs 0.68rem · sm 0.72rem · meta 0.82rem · body-sm 0.86rem · body-md 0.9rem · body-lg 0.92rem · section 0.95rem · card-title 1.15rem · body 1rem.

## Layout

- Home splash content max ~52rem.
- **Tool pair:** 1 column mobile, 2 columns ≥42rem.
- **Site map:** stacked list rows, not wide tables on phone.
- WIP banner: minimal on mobile (single “WIP” link), full strip ≥50rem.

## Elevation & Depth

Flat cards with 1px hairline borders; hover shifts border toward accent. No drop shadows on cards.

## Shapes

Card radius 0.65rem; list containers 0.55rem; status pills 0.25rem; native audio controls 0.35rem (`--ae-radius-media`).

## Components

| Component | Location | Notes |
|-----------|----------|-------|
| `ToolPair` | Home | Two linked cards — Emergency vs Alert |
| `SiteMapList` | Home | Grouped nav with status pills |
| `PageFrame` | Global | WIP strip above content |
| `AudioClip` | Campus audio | Card + native `<audio>`; MP3 fallback for iOS |
| Starlight `CardGrid` | Home crisis shortcuts | Stock Starlight cards |

## Do's and Don'ts

**Do:** Use status pills consistently; keep touch targets ≥44px on mobile links; mark draft pages in nav labels.

**Don't:** Use comparison tables with empty header cells on splash; nest cards; add gradient text or decorative glass on docs pages.
