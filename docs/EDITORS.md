# Editors guide

Repo-only — not published on emergency.arnoldcoc.org. Staff see procedures on the live site; this file is for people updating the repo.

## Live site

**https://emergency.arnoldcoc.org** — built from `main` on every push.

## Clone and dev

```bash
git clone https://github.com/BadBraddA1/arnold-emergency.git
cd arnold-emergency
pnpm install
pnpm dev    # http://localhost:4321
```

## Where content lives

All public procedures: `src/content/docs/`

Edit in your editor or on GitHub. Do **not** add terminal commands or repo paths to those pages — keep editor workflow here or in `README.md`.

## Publish changes

1. Edit markdown on a branch (or directly on `main` for small fixes).
2. Open a pull request — another leader reviews.
3. Merge to `main` — Cloudflare Pages redeploys in ~1 minute.

Manual deploy fallback:

```bash
pnpm build
pnpm run deploy
```

## Terminology

Terms live in `src/data/terminology.json`. After edits:

```bash
pnpm run generate:terminology
```

Commit the updated pages under `terminology/terms/` and `terminology/index.mdx`.

## Room pages & check-in tracking

Each room has a page at `/rooms/{id}/` (QR on the door card). Staff can tap **I’ve reviewed this room**. Counts live in Cloudflare KV (`ROOM_READS`).

- Index: https://emergency.arnoldcoc.org/rooms/
- Stats (PIN): https://emergency.arnoldcoc.org/rooms/stats/
- Default stats PIN: `arnold-rooms` (change via `ROOM_STATS_PIN` in `wrangler.toml` or Pages → Settings → Variables)

Regenerate room QRs after adding rooms:

```bash
pnpm run generate:room-qr
```

## Room pages & check-in tracking

Each room has a page at `/rooms/{id}/` (QR on the door card). Members check in with their **Arnold Alert 6-digit PIN** (same roster as alarm.arnoldcoc.org). System Admins view stats at `/rooms/stats/`.

- Index: https://emergency.arnoldcoc.org/rooms/
- Stats: https://emergency.arnoldcoc.org/rooms/stats/
- Verify API on alarm: `POST /api/auth/verify` (secret `EMERGENCY_VERIFY_SECRET` on both projects)

Regenerate room QRs after adding rooms:

```bash
pnpm run generate:room-qr
```

## Campus audio clips

Production horn clips live in `public/audio/`. Refresh from the Pi:

```bash
cd ~/Code/arnold-emergency
./scripts/sync-campus-audio.sh
pnpm run deploy
```

## Classroom handouts

**Map posters** — place pins and regenerate:

```bash
pnpm run map:place
pnpm run map:generate
```

Commit `public/posters/` and push. Staff browse at `/classroom/room-posters/`.

**Door cards** — routes in `data/room-routes.json` (or CSV). Optional CLI export:

```bash
pnpm run generate:classroom -- \
  --room "Room 107 — Classroom" \
  --exit "Out door → east → EXIT on right wall" \
  --assembly "South parking lot"
```

Output: `generated/<slug>.md` (local only).

**Map poster CLI** (legacy):

```bash
pnpm run generate:classroom-map -- \
  --number 107 \
  --name "Classroom" \
  --assembly "South parking lot — flagpole"
```

## Link from Arnold Alert

| Site | Purpose |
|------|---------|
| [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org) | **Know** — SOP, roles, classrooms |
| [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org) | **Do** — trigger codes, bells |

## Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
- [Cloudflare Pages](https://pages.cloudflare.com) — `emergency.arnoldcoc.org`
