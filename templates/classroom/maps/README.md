# Emergency map masters — Arnold Church of Christ

| File | Floor | Rooms |
|------|-------|--------|
| `master-level-1.png` | Level 1 (main) | 101–112, nursery, cry room, foyer, offices |
| `master-level-2.png` | Level 2 | 202–215, 204–212, fellowship hall |
| `master-both-floors.pdf` | Both | Print reference |

**Assembly (all rooms):** South parking lot

## Automated posters (pin + route)

Each room poster adds:

- Red **YOU ARE HERE** pin
- Green arrow path to nearest exit
- Room label banner (e.g. `Room 107 — Classroom`)

### 1. Place pins (one time per room)

```bash
pnpm run map:place
```

Open http://localhost:3456 — for each room:

1. Select floor + room — **exits are labeled on the map** (blue dots); dashed gray lines show straight-line distance to every exit from your pin
2. **Pin** mode → click center of room (red **YOU ARE HERE**)
3. **Route** mode → click hallway waypoints toward exit (green line + arrow updates live)
4. Use **Pick nearest exit** to auto-select by straight-line distance, or choose manually and compare against the spreadsheet note in the sidebar
5. **Straight route** clears waypoints if the path is a direct shot
6. **Save room** → **Download overlay JSON** when done (merge into `data/room-map-overlay.json`)

### 2. Generate PNGs

```bash
pnpm run map:generate              # all rooms with overlay data
pnpm run map:generate -- --room 107
```

Output: `generated/posters/room-107.png` — print or drop into Canva.

## Data files

| File | Purpose |
|------|---------|
| `data/room-routes.json` | Room names, nearest exit IDs, walk notes |
| `data/room-map-overlay.json` | Pin x/y, route points, exit coordinates |
| `data/room-routes.csv` | Spreadsheet for IC walk-through |

## Canva (optional)

If you prefer Canva for final polish: generate PNG here, import as full-page image, or keep using duplicate-page workflow with manual arrows using `room-routes.csv` as guide.
