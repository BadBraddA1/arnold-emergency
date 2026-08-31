# Arnold Emergency

| | |
|---|---|
| **Live site** | https://emergency.arnoldcoc.org |
| **Local** | `~/Code/arnold-emergency` |
| **Alarm app** | https://alarm.arnoldcoc.org (Arnold Alert — trigger codes) |
| **Status** | Draft SOP — leadership sign-off required |

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

```bash
pnpm run generate:classroom -- \
  --room "Room 204 — Teen class" \
  --exit "South hallway, turn left" \
  --assembly "South parking lot — flagpole"
```

Output: `generated/room-204-teen-class.md`

## Content

All pages: `src/content/docs/`

| Section | Purpose |
|---------|---------|
| Quick reference | Printable card |
| Codes | Red, Blue, all clear |
| Roles | IC, nursery, pulpit, office |
| System | Arnold Alert naming & limits |
| Classroom | Per-room handout template |

## Deploy

Cloudflare Pages — `main` branch, build command `pnpm build`, output `dist/`.

```bash
pnpm build
pnpm run deploy
```

## Related repos

- [arnold-alarm](https://github.com/BadBraddA1/arnold-alarm) — Arnold Alert campus audio system
