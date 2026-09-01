# Arnold Emergency

| | |
|---|---|
| **Live site** | https://emergency.arnoldcoc.org |
| **Local** | `~/Code/arnold-emergency` |
| **Alarm app** | https://alarm.arnoldcoc.org (Arnold Alert — trigger codes) |
| **Status** | Staff-only (**noindex** + `robots.txt` Disallow) |

## Impeccable (design system)

| File | Purpose |
|------|---------|
| `PRODUCT.md` | Product truth — users, scope, open decisions |
| `DESIGN.md` | Visual system — tokens, components, do/don't |
| `.impeccable/config.json` | Workflow defaults (`buildPath: code`, design hook on) |

Emergency response **playbook** for Arnold Church of Christ — markdown in git, published as a docs site. Clone it, edit procedures, merge to `main`, site updates.

**emergency.arnoldcoc.org = know** · **alarm.arnoldcoc.org = do**

## Quick start

```bash
cd ~/Code/arnold-emergency
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static site → dist/
```

## Generate a classroom handout

**Map poster** (floor plan + footer — Red / Blue / 911 only):

```bash
pnpm run generate:classroom-map -- \
  --number 107 \
  --name "Classroom" \
  --assembly "South parking lot — flagpole"
```

**Door card** (text checklist):

```bash
pnpm run generate:classroom -- \
  --room "Room 204 — Teen class" \
  --exit "South hallway, turn left" \
  --assembly "South parking lot — flagpole"
```

Templates: `templates/classroom/room-map-poster.md` · `templates/classroom/handout.md`  
Master maps: `templates/classroom/maps/` · Room routes: `data/room-routes.json`  
**Pin + posters:** `pnpm run map:place` then `pnpm run map:generate` → files in `public/posters/` (tracked in git; browse at [/classroom/room-posters/](/classroom/room-posters/))

## Content

All pages: `src/content/docs/`

| Section | Purpose |
|---------|---------|
| Quick reference | Printable card |
| **Terminology** | A–Z glossary — auto-linked across every page |
| Codes | Red, Blue, all clear |
| Other | Medical emergency |
| Roles | IC, nursery, pulpit, office — roster on `/roles/`; canonical names in `data/leadership.json` |
| System | Arnold Alert naming & limits |
| Classroom | Map posters + door cards — browse & print on site |

### Campus audio

Production horn clips live in `public/audio/` (synced from the Pi). Reference page: [Campus audio](/system/campus-audio/) — MDX `AudioClip` cards with MP3 fallbacks for iPhone.

```bash
./scripts/sync-campus-audio.sh   # refresh from gateway + ~/.config/arnold-alarm/audio
```

### Glossary / auto-links

Defined terms live in `src/data/terminology.json`. Run `pnpm run generate:terminology` to refresh term pages, then build. Any matching word in procedure pages becomes a **dotted green link** to its definition.

## Deploy

Cloudflare Pages — push to `main` runs GitHub Actions (`.github/workflows/deploy.yml`; needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets). Manual fallback:

```bash
pnpm build
pnpm run deploy
```

## Related repos

- [arnold-alarm](https://github.com/BadBraddA1/arnold-alarm) — Arnold Alert campus audio system
