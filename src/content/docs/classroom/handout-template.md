---
title: Classroom handout template
description: Per-room emergency sheet for teachers and volunteers.
---

Use this template for each classroom, nursery room, and office suite. **Post near the door.**

## Generate a handout

```bash
git clone https://github.com/BadBraddA1/arnold-emergency.git
cd arnold-emergency
pnpm install
pnpm run generate:classroom -- \
  --room "Room 204 — Teen class" \
  --exit "South hallway, turn left" \
  --assembly "South parking lot — flagpole" \
  --out ./generated/room-204.md
```

Print from the generated markdown or export to PDF.

---

## Template (fill in per room)

### {{ROOM}}

**Arnold Church of Christ — In-room emergency card**  
*Post near the door. Fill in blanks before printing.*

---

#### At a glance

**CODE RED — EVACUATE**  
Leave the building now. Calm voice: *"We're leaving — follow me."*  
**Exit:** {{EXIT}} → **Assembly:** {{ASSEMBLY}}  
Take your roster. Line up at the door. Count every person at assembly. Report missing to the incident commander.

**CODE BLUE — LOCKDOWN**  
Secure this room: lock the door, lights off, phones on silent.  
Everyone away from the door and windows. Stay quiet. Do not leave.  
Do not open the door for anyone except law enforcement or verified IC.

**ALL CLEAR — WAIT FOR IC**  
You will hear **Code Green** (two tones) or get a direct announcement from leadership.  
**Only the incident commander** may end the code (Arnold Alert app or fob button 4).  
**Room staff do not press all clear.** Do not open for strangers.

---

#### This room

| Code | You do |
|------|--------|
| **Code Red** | Exit {{EXIT}} → assemble at {{ASSEMBLY}} |
| **Code Blue** | Lock, lights off, silence, shelter in place |
| **All clear** | Wait for Code Green or IC — then resume normal |

#### Before class

- [ ] Know today's roster / attendance sheet location
- [ ] Walk the exit route once a quarter
- [ ] Nursery / IC contact: _______________

#### 911

Call **911** first when life is at risk. Campus horns announce the code — they do **not** call police for you.

#### Tools

- **Arnold Alert** (staff PIN): [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org)
- **Full playbook:** [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org)

---

*Generated from arnold-emergency — update when exits or assembly areas change.*
