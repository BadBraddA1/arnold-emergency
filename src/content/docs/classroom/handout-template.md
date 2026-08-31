---
title: Classroom handout template
description: Per-room emergency sheet for teachers and volunteers.
---

Use this template for each classroom, nursery room, and office suite. Post near the door.

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

**Arnold Church of Christ — Emergency room card**

| Code | What it means | What this room does |
|------|---------------|---------------------|
| **Code Red** | Evacuate | Line up at door → **Exit:** {{EXIT}} → **Assembly:** {{ASSEMBLY}} |
| **Code Blue** | Lockdown | Lock door, lights off, silence phones, stay away from windows |
| **All clear** | Emergency over | Wait for leadership announcement — do not open for strangers |

### Before class

- [ ] Know today's roster / attendance sheet location
- [ ] Walk the exit route once a quarter
- [ ] Know nursery IC contact: _______________

### Code Red — this room

1. Calm voice: *"We're leaving the building — follow me."*
2. Take roster; line up at {{EXIT}}
3. Go to {{ASSEMBLY}}
4. Count every person; report missing to incident commander

### Code Blue — this room

1. Lock door if possible
2. Lights off; everyone on floor away from door/windows
3. Silence phones
4. Do not open door until official all clear

### 911

Call **911** first when life is at risk. Arnold Alert horns announce the code — they do not call police for you.

### Tools

- **Arnold Alert** (staff PIN): [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org)
- **Full playbook:** [emergency.arnoldcoc.org](https://emergency.arnoldcoc.org)

---

*Generated from arnold-emergency — update when exits or assembly areas change.*
