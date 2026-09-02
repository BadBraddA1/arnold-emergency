---
name: Arnold Emergency
description: Read-mode emergency playbook for Arnold Church of Christ staff
colors:
  accent: "#3d9a6a"
  accent-high: "#6bc492"
  accent-low: "#1a2e24"
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
  btn: "0.4rem"
  focus: "0.25rem"
  media: "0.35rem"
  title-icon: "0.45rem"
spacing:
  card-pad: "1rem 1.05rem"
  section-gap: "1.35rem"
components:
  tool-card:
    backgroundColor: "var(--ae-surface)"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  ae-btn:
    rounded: "{rounded.btn}"
---

## Overview

Starlight documentation site in **Read** mode: staff scan procedures under stress. Hierarchy beats decoration. Green accent signals “go / safe reference.” Code Red/Blue/amber accents appear only on emergency shortcut icons — not body copy. One shared card/list/button surface language site-wide (`--ae-surface`, `--ae-border`, `.ae-btn`).

## Colors

- **Accent** `#3d9a6a` / **accent-high** `#6bc492` — links, focus rings, primary buttons.
- **Accent-low** `#1a2e24` — primary button fill, subtle tints.
- **Code Red** fg `#f87171` / bg `#dc2626` — evacuate icons and crisis cards.
- **Code Blue** fg `#60a5fa` / bg `#2563eb` — lockdown icons and crisis cards.
- **Code amber** fg `#fbbf24` / bg `#d97706` — 911 / medical icons.
- CSS variables: `--ae-code-red-fg/bg`, `--ae-code-blue-fg/bg`, `--ae-code-amber-fg/bg` (hex literals).
- Surfaces: `--ae-surface` (sidebar bg), `--ae-border` (hairline).
- Inherit Starlight grays for text.

## Typography

- **Body:** DM Sans via `@fontsource/dm-sans` (self-hosted, no Google Fonts CDN).
- **Display / h1 / card titles:** Source Serif 4 via `@fontsource/source-serif-4`.
- **Scale:** xs 0.68rem · sm 0.72rem · meta 0.82rem · body-sm 0.86rem · body-md 0.9rem · body-lg 0.92rem · section 0.95rem · card-title 1.15rem · body 1rem.

## Layout

- Home splash content max ~52rem.
- **Tool pair:** 1 column mobile, 2 columns ≥42rem.
- **Site map / terminology:** stacked list rows with icons, not wide tables on phone.
- **Icons:** Google Material Symbols, outlined weight 400. Swap names in `symbols.ts`.

## Elevation & Depth

Flat cards with 1px hairline borders; hover shifts border toward accent. No drop shadows on cards.

## Shapes

Card `--ae-radius-card` 0.65rem; list `--ae-radius-list` 0.55rem; button `--ae-radius-btn` 0.4rem; media / icon box 0.35rem; page-title icon 0.45rem.

## Components

| Component | Location | Notes |
|-----------|----------|-------|
| `ToolPair` | Home | Know / Do cards — shared surface |
| `SiteMapList` | Home | Grouped nav rows with icons |
| `TerminologyList` | Terminology index | A–Z list with icons |
| `CrisisCard` | Home | Same surface as tool cards; tone only on icon |
| `EmergencyIcon` | Global | Material Symbols via `@material-symbols/svg-400` |
| `PageTitle` | Inner pages | Auto icon from `iconForPath()` |
| `Hero` | Home splash | Custom hero actions with `EmergencyIcon` |
| `SidebarSublist` | Sidebar | Starlight override — icons on nav links |
| `AudioClip` | Campus audio | Same card surface + `<audio>` |
| `.ae-btn` | Galleries | Shared Print / Open buttons |

## Do's and Don'ts

**Do:** Use `--ae-surface` / `--ae-border` / `.ae-btn` for any new interactive chrome; keep touch targets ≥44px on mobile links; use code-color tokens for Red/Blue/911 icons only.

**Don't:** Invent a second card style (no black crisis panels); nest cards; hard-code code colors outside CSS variables; put editor terminal commands on public pages; use gradient text or decorative glass.
