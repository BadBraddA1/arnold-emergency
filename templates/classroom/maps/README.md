# Emergency map masters — Arnold Church of Christ

| File | Floor | Rooms |
|------|-------|--------|
| `master-level-1.png` | Level 1 (main) | 101–112, nursery, cry room, foyer, offices |
| `master-level-2.png` | Level 2 | 204–212, fellowship hall |
| `master-both-floors.pdf` | Both | Print reference |

**Assembly (all rooms):** South parking lot

**Do not use Canva AI for exit arrows.** Duplicate the master in Canva, highlight one room, draw one path to the nearest red EXIT, export PDF.

## Per-room data

See [`../../data/room-routes.json`](../../data/room-routes.json) — nearest exit, walk path notes, and `verified` flag after a physical walk-through.

## Canva workflow (recommended)

1. Import `master-level-1.png` or `master-level-2.png` as the map layer (lock it).
2. Add locked layers: header, footer (EMERGENCY ACTIONS), yellow 911 bar.
3. **Duplicate page** per room from `room-routes.json`.
4. On each page:
   - Purple outline on **this room**
   - Green or yellow **arrow** along the corridor path to **nearest exit** (see `nearestExit` in JSON)
   - Text: `Room 107 — Classroom` (or whatever applies)
5. Export all pages as PDF → print shop or office printer.

## Generate footer text only

```bash
pnpm run generate:classroom-map -- --number 107 --name Classroom --assembly "South parking lot"
```

## After routes are verified

Set `"verified": true` in `room-routes.json` for each room IC has walked.
