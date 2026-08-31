---
title: Classroom handout template
description: Per-room emergency sheets — map posters and door cards.
---

Two print formats for classrooms and offices:

| Format | Use | Template |
|--------|-----|----------|
| **Room map poster** | Floor plan + emergency footer on the wall | [`room-map-poster.md`](https://github.com/BadBraddA1/arnold-emergency/blob/main/templates/classroom/room-map-poster.md) |
| **Door card** | Text-only checklist near the door | `handout.md` (below) |

**Room map posters** show only **Code Red**, **Code Blue**, and **911** — not IC steps (app, fob, who ends the code). Teachers wait for the official all clear; that lives in the full playbook.

---

## Generate map poster copy

Add your floor-plan art in Canva or Illustrator; use this for the footer text:

```bash
pnpm run generate:classroom-map -- \
  --number 107 \
  --name "Classroom" \
  --assembly "South parking lot — flagpole"
```

Output: `generated/maps/room-107-classroom.md`

### Footer copy (paste into your design)

```
EMERGENCY ACTIONS

CODE RED — EVACUATE
Leave building. Assembly: [fill in]

CODE BLUE — LOCKDOWN
Secure room. Lights off. Stay quiet.

LIFE-THREATENING EMERGENCY: CALL 911 FIRST.
```

---

## Generate door card (text handout)

```bash
pnpm run generate:classroom -- \
  --room "Room 107 — Classroom" \
  --exit "South hallway, turn left" \
  --assembly "South parking lot — flagpole" \
  --out ./generated
```

---

## Door card template (fill in per room)

### {{ROOM}}

**Arnold Church of Christ — In-room emergency card**

**CODE RED — EVACUATE**  
Leave the building now. **Exit:** {{EXIT}} → **Assembly:** {{ASSEMBLY}}  
Take roster. Count everyone at assembly.

**CODE BLUE — LOCKDOWN**  
Lock door, lights off, phones silent. Stay quiet. Do not leave.

**911** when life is at risk. Horns do not call police for you.

- Arnold Alert: [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org)
- Full playbook: [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org)

---

*Update when exits or assembly areas change.*
