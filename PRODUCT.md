# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 + Starlight 0.41, static site on Cloudflare Pages (`pnpm build` → `dist/`). Content in `src/content/docs/` (markdown/MDX). Glossary from `src/data/terminology.json`. Campus audio in `public/audio/`.

## Users

**Primary:** Arnold Church of Christ staff and volunteers during normal operations and emergencies — especially incident commander, area leads, nursery, pulpit, and anyone with an Alert PIN.

**Secondary:** Leadership reviewing/signing the SOP; facilities running empty-building tests; new volunteers onboarding.

**Situation:** Mid-crisis (need fast, correct human response) or pre-crisis (training, drills, printing room handouts).

## Product Purpose

Arnold Emergency is the **human playbook** — who does what when Code Red or Code Blue sounds, plus supporting process (roles, training, post-incident). It is explicitly **not** the campus horn system; that is Arnold Alert at alarm.arnoldcoc.org.

Success: staff can find the right procedure in seconds; leadership can sign off a single source of truth; classroom handouts can be generated from templates.

## Positioning

**emergency.arnoldcoc.org = know** · **alarm.arnoldcoc.org = do** — one site for procedures and terminology, separate from triggering bells/codes.

## Operating Context

- Published at emergency.arnoldcoc.org (noindex while in draft review).
- Edited as markdown in git; merge to `main` deploys via Cloudflare Pages.
- Pairs with Arnold Alert (Pi gateway, UniFi horns, mobile PWA, Alert Desk).
- Leadership sign-off tracked on `/approval/` — **not yet signed** (inferred from site copy; confirm names/dates when ready).

## Capabilities and Constraints

**In scope:** Code Red/Blue/all clear procedures; roles; triggers; medical emergency (draft); Arnold Alert system docs; campus audio reference; terminology A–Z with auto-links; classroom handout generator; WIP site map on home.

**Out of scope:** Triggering alarms (Arnold Alert); 911 dispatch; door locks; parent SMS; TV/slide takeover (backlog on alarm repo).

**Open decisions (intentional blanks):** Assembly areas; nursery/pulpit/office/spokesperson names; medical/AED policy; many `_[fill in]_` fields. **Filled:** Allan Miller (always IC + deacon over security); elders Jason Powers, Kevin Isenberg, Shannon Davidson; System Admin Adin Bradd.

## Brand Commitments

- Product name: **Arnold Emergency** (playbook) vs **Arnold Alert** (system) — see `/system/naming/`.
- Voice: plain, directive, church-staff audience; no jargon without glossary link.
- Visual: green accent on dark-friendly Starlight docs theme; DM Sans + Source Serif 4 (headings).

## Evidence on Hand

- Live campus audio clips in `public/audio/` (synced from Pi via `scripts/sync-campus-audio.sh`).
- Terminology JSON drives 40+ term pages.
- Related repo: `arnold-alarm` (BadBraddA1).

## Product Principles

1. **Procedures before polish** — ship accurate drafts; mark WIP honestly.
2. **One front door** — home page links to everything with completion status.
3. **Do not fake policy** — leave blanks rather than invent assembly areas or medical rules.
4. **Terminology is load-bearing** — dotted glossary links everywhere.
5. **Separate know from do** — never confuse this site with the alarm app.

## Accessibility & Inclusion

Read-mode documentation: clear hierarchy, mobile-first site map, keyboard-focusable cards, campus audio with native `<audio controls>`. Target WCAG AA for staff on phones in hallways. **Standard not formally certified** (open).
