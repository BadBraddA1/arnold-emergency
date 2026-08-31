---
title: Classroom handout template
description: Per-room emergency sheets — map posters and door cards.
---

Two print formats for classrooms and offices:

| Format | Where | On the site |
|--------|-------|-------------|
| **Room map poster** | Wall — floor plan + evacuation route | **[Room evacuation posters →](/classroom/room-posters/)** |
| **Door card** | Door — text checklist (Red / Blue / 911) | **[Door cards →](/classroom/door-cards/)** |

**Map posters** show the floor plan with YOU ARE HERE, route, exits, AED, and first aid. Room numbers and names are already on the building drawing — no extra title banner.

**Door cards** pull exit steps and assembly from `data/room-routes.json`. Post one at each door; laminate if you can.

Neither format includes IC steps (app, fob, who ends the code). Teachers wait for the official all clear.

---

## Door cards (recommended)

1. Open **[Door cards](/classroom/door-cards/)**
2. Find the room → **Print**
3. Tape or laminate at the door

To change exit wording for all rooms, edit `data/room-routes.json` (or the CSV) and redeploy.

### CLI (optional markdown export)

```bash
pnpm run generate:classroom -- \
  --room "Room 107 — Classroom" \
  --exit "Out door → east → EXIT on right wall" \
  --assembly "South parking lot"
```

Output: `generated/room-107-classroom.md` (local only — the site pages above are the staff-facing copy).

---

## Map posters

1. Place pins: `pnpm run map:place`
2. Regenerate: `pnpm run map:generate`
3. Browse & print: **[Room evacuation posters](/classroom/room-posters/)**

---

## Door card copy reference

**CODE RED — EVACUATE**  
Leave the building now. **Exit:** _[route]_ → **Assembly:** South parking lot  
Take roster. Count everyone at assembly.

**CODE BLUE — LOCKDOWN**  
Lock door, lights off, phones silent. Stay quiet. Do not leave.

**911** when life is at risk. Horns do not call police for you.

- Arnold Alert: [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org)
- Full playbook: [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org)

---

*Update when exits or assembly areas change.*
