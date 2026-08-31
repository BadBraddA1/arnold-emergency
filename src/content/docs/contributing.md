---
title: Edit & publish
description: How to update emergency procedures — clone, edit, deploy.
---

## Live site

**https://emergency.arnoldcoc.org** — built from `main` on every push.

## Clone the repo

```bash
git clone https://github.com/BadBraddA1/arnold-emergency.git
cd arnold-emergency
pnpm install
pnpm dev    # http://localhost:4321
```

## Where content lives

All procedures are markdown under:

```
src/content/docs/
```

Edit in your editor or on GitHub (each page has an **Edit page** link).

## Publish changes

1. Edit markdown on a branch (or directly on `main` for small fixes).
2. Open a pull request — another leader reviews.
3. Merge to `main` — Cloudflare Pages redeploys in ~1 minute.

## Generate classroom handouts

```bash
pnpm run generate:classroom -- \
  --room "Fellowship Room B" \
  --exit "East door to parking lot" \
  --assembly "South parking lot — flagpole"
```

Output: `generated/<slug>.md` — print or PDF from there.

## Link from Arnold Alert

The alarm app and desk console should link here for *"Emergency procedures"* — playbook vs. tool:

| Site | Purpose |
|------|---------|
| [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org) | **Know** — SOP, roles, classrooms |
| [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org) | **Do** — trigger codes, bells |

## Stack

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) — markdown docs
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting at `emergency.arnoldcoc.org`
