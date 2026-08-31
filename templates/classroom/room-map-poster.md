# Room map poster — copy template

**Use this for the printed “Emergency Routes & Plans” sheet posted in each room.**  
Drop your floor-plan art in the center; paste this copy in the footer bar.

One poster per room. Swap the map highlight (this room) and fill in assembly.

---

## Header (top of page)

**ARNOLD CHURCH OF CHRIST**  
1363 Jeffco Blvd, Arnold, MO 63010

**Emergency Routes & Plans**

**This room:** {{ROOM_NUMBER}} — {{ROOM_NAME}}

---

## Map (center)

- Insert your floor-plan graphic.
- Highlight **this room** on the map (e.g. purple outline).
- Mark exits, stairs, and first aid per your building drawing.

---

## Footer bar — EMERGENCY ACTIONS

*Room staff and class leaders only need Code Red and Code Blue. Do **not** put IC-only steps (app, fob, who ends the code) on this poster.*

```
EMERGENCY ACTIONS

CODE RED — EVACUATE
Leave building. Assembly: {{ASSEMBLY}}

CODE BLUE — LOCKDOWN
Secure room. Lights off. Stay quiet.

LIFE-THREATENING EMERGENCY: CALL 911 FIRST.
```

### Optional one-liner (only if you want it)

If leadership wants a hint without IC jargon:

```
When the emergency is over, wait for the official all clear (announcement or Code Green horns) before opening the door.
```

**Do not include:** fob buttons, Arnold Alert app steps, or “IC only” language on room posters.

---

## Per-room checklist before print

- [ ] Map shows correct floor / wing
- [ ] This room highlighted
- [ ] Nearest exit arrow matches reality
- [ ] **Assembly** filled in: {{ASSEMBLY}}
- [ ] Spell-check room number and name

---

## Variables

| Placeholder | Example |
|-------------|---------|
| `{{ROOM_NUMBER}}` | 107 |
| `{{ROOM_NAME}}` | Classroom |
| `{{ASSEMBLY}}` | South parking lot — flagpole |
| `{{MAP_IMAGE}}` | Your Illustrator / Canva art |

---

*Canonical copy lives in arnold-emergency — update here first, then regenerate room PDFs.*
