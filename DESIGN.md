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
  code-red-fg: "#f87171"
  code-red-bg: "#dc2626"
  code-blue-fg: "#60a5fa"
  code-blue-bg: "#2563eb"
  code-amber-fg: "#fbbf24"
  code-amber-bg: "#d97706"
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
  title-icon: "0.45rem"
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

Starlight documentation site in **Read** mode: staff scan procedures under stress. Hierarchy beats decoration. Green accent signals “go / safe reference”; amber-tinted pills mean WIP/draft. Code Red/Blue/amber accents appear only on emergency shortcuts and icons — not body copy.

## Colors

- **Accent** `#3d9a6a` / **accent-high** `#6bc492` — links, usable status, focus rings.
- **Accent-low** `#1a2e24` — WIP banner desktop tint.
- **Status wip amber** `#c9a227` — WIP/draft pill base (`--ae-status-wip-amber`).
- **Code Red** fg `#f87171` / bg `#dc2626` — evacuate icons and crisis cards.
- **Code Blue** fg `#60a5fa` / bg `#2563eb` — lockdown icons and crisis cards.
- **Code amber** fg `#fbbf24` / bg `#d97706` — 911 / medical icons.
- CSS variables: `--ae-code-red-fg`, `--ae-code-red-bg`, `--ae-code-blue-fg`, `--ae-code-blue-bg`, `--ae-code-amber-fg`, `--ae-code-amber-bg`.
- Inherit Starlight grays and hairline borders for surfaces.

## Typography

- **Body:** DM Sans via `@fontsource/dm-sans` (self-hosted, no Google Fonts CDN).
- **Display / h1 / card titles:** Source Serif 4 via `@fontsource/source-serif-4`.
- **Scale:** xs 0.68rem · sm 0.72rem · meta 0.82rem · body-sm 0.86rem · body-md 0.9rem · body-lg 0.92rem · section 0.95rem · card-title 1.15rem · body 1rem.

## Layout

- Home splash content max ~52rem.
- **Tool pair:** 1 column mobile, 2 columns ≥42rem.
- **Site map:** stacked list rows with icons, not wide tables on phone.
- **Sidebar:** link icons from `pathIconMap` + `termIconMap` when href matches.
- WIP banner: minimal on mobile (single “WIP” link), full strip ≥50rem.

## Elevation & Depth

Flat cards with 1px hairline borders; hover shifts border toward accent. No drop shadows on cards.

## Shapes

Card 0.65rem; list 0.55rem; status pills 0.25rem; audio controls 0.35rem (`--ae-radius-media`); page-title icon 0.45rem (`--ae-radius-title-icon`).

## Components

| Component | Location | Notes |
|-----------|----------|-------|
| `ToolPair` | Home | Know / Do cards with playbook + alert icons |
| `SiteMapList` | Home | Grouped nav with status pills + per-row icons |
| `TerminologyList` | Terminology index | A–Z list with icons |
| `CrisisCard` | Home | Code-colored shortcut cards (`tone`: red/blue/green/amber) |
| `EmergencyIcon` | Global | 24px SVG set — `src/components/icons/registry.ts` |
| `PageTitle` | Inner pages | Auto icon from `iconForPath()` |
| `Hero` | Home splash | Custom hero actions with `EmergencyIcon` |
| `SidebarSublist` | Sidebar | Starlight override — icons on nav links |
| `PageFrame` | Global | WIP strip above content |
| `AudioClip` | Campus audio | Card + `<audio>`; MP3 fallback for iOS |

## Do's and Don'ts

**Do:** Use status pills consistently; keep touch targets ≥44px on mobile links; use code-color tokens for Red/Blue/911 icons only.

**Don't:** Use comparison tables with empty header cells on splash; nest cards; hard-code code colors outside CSS variables; use gradient text or decorative glass on docs pages.
