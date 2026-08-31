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
- **AED** (green) and **first aid** (red +) markers for the floor
- Room label banner (e.g. `Room 107 — Classroom`)

### 1. Place pins (one time per room)

```bash
pnpm run map:place
```

Open http://localhost:3456 — edits **autosave** to `data/room-map-overlay.json` (and browser storage as backup). For each room:

1. Select floor + room — **exits are labeled on the map** (blue dots); dashed gray lines show straight-line distance to every exit from your pin
2. **Pin** mode → click center of room (red **YOU ARE HERE**)
3. **Route** mode → click hallway corners — points **snap horizontal/vertical** for straight hallway lines (hold **Shift** for diagonal/free). A green dashed preview shows the next segment.
4. Or use **L-route** buttons for a one-corner path (horizontal-first or vertical-first), then tweak with more route clicks
5. Use **Pick nearest exit** to auto-select by straight-line distance, or choose manually and compare against the spreadsheet note in the sidebar
6. **Direct line** clears waypoints if the path is a straight shot to the exit
7. **Save room** → optional **Download overlay JSON** backup; file autosaves while `pnpm run map:place` is running

### Exits (once per floor)

1. **Exit** mode → select exit (or **Add exit** for a new door) → click on map
2. Optional **Exit label** (e.g. “West foyer”) — shows on map and posters
3. **Remove exit** deletes the selected exit from this floor

### AED & first aid (once per floor)

1. **AED** or **First aid** mode → select unit → click on map
2. Optional location note (e.g. “Foyer wall”)
3. **Add unit** if you have more than one per floor — autosaves with everything else

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
| `data/room-map-overlay.json` | Pin x/y, route points, exit coordinates, AED & first aid |
| `data/medical-equipment.json` | Default AED / first aid unit IDs per floor |
| `data/room-routes.csv` | Spreadsheet for IC walk-through |

## Canva (optional)

If you prefer Canva for final polish: generate PNG here, import as full-page image, or keep using duplicate-page workflow with manual arrows using `room-routes.csv` as guide.
