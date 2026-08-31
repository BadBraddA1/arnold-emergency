---
title: Terminology
description: Every Arnold Alert and emergency procedure term — click any highlighted word on the site to land here.
---

When you see a **dotted green link** anywhere on this site, it is a defined term. Click it for what it means and how we use it.

No one should have to guess what **Arnold Alert**, **Code Blue**, or **Fob Arm** means — if it is in the glossary, it is linked.

## A–Z

- [Alert Bells](/terminology/terms/alert-bells/) — Class bell panel
- [Alert Check](/terminology/terms/alert-check/) — Full-campus horn test
- [Alert Codes](/terminology/terms/alert-codes/) — Emergency code feature
- [Alert Control](/terminology/terms/alert-control/) — Mobile admin panel
- [Alert Countdown](/terminology/terms/alert-countdown/) — 10-second phone arming
- [Alert Desk](/terminology/terms/alert-desk/) — Admin computer console
- [Alert Emergency](/terminology/terms/alert-emergency/) — Mobile panel for codes
- [Alert Fob Link](/terminology/terms/alert-fob-link/) — Pair and arm a physical fob
- [Alert Fobs](/terminology/terms/alert-fobs/) — Physical emergency buttons
- [Alert Gateway](/terminology/terms/alert-gateway/) — On-site audio engine (Raspberry Pi)
- [Alert Line](/terminology/terms/alert-line/) — Phone extension 9090
- [Alert Line Codes](/terminology/terms/alert-line-codes/) — 9090 → 3 → PIN
- [Alert Mobile](/terminology/terms/alert-mobile/) — Staff phone app (PWA)
- [Alert Notify](/terminology/terms/alert-notify/) — Desk phone warning before horn test
- [Alert Page](/terminology/terms/alert-page/) — Convenience PA (9090 → 1)
- [Alert PIN](/terminology/terms/alert-pin/) — 6-digit staff login
- [All clear](/terminology/terms/all-clear/) — End the active code
- [Arnold Alert](/terminology/terms/arnold-alert/) — Campus bells and emergency audio system
- [Arnold Emergency](/terminology/terms/arnold-emergency/) — This website — the emergency playbook
- [Bell Ringer](/terminology/terms/bell-ringer/) — Staff PIN scope — bells only
- [Campus audio reference](/terminology/terms/campus-audio/) — SOP page with horn tone clips
- [Campus Horns](/terminology/terms/campus-horns/) — Building speakers
- [Code Blue](/terminology/terms/code-blue/) — Lockdown
- [Code Blue Active](/terminology/terms/code-blue-active/) — Blue code is live
- [Code Leader](/terminology/terms/code-leader/) — Staff PIN scope — evacuation
- [Code Red](/terminology/terms/code-red/) — Evacuate
- [Code Red Active](/terminology/terms/code-red-active/) — Red code is live
- [Desk Activity](/terminology/terms/desk-activity/) — Audit log
- [First Bell](/terminology/terms/first-bell/) — Class bell — one tone
- [Fob Arm](/terminology/terms/fob-arm/) — 3-hour fob activation window
- [Incident commander](/terminology/terms/incident-commander/) — On-site authority during a crisis
- [Medical emergency](/terminology/terms/medical-emergency/) — Serious illness or injury (not a campus code)
- [Queued (standby)](/terminology/terms/queued-standby/) — Command recorded while standby
- [Quick Page](/terminology/terms/quick-page/) — Extension 8080
- [Remote Operator](/terminology/terms/remote-operator/) — Staff PIN scope — off-campus queue
- [Second Bell](/terminology/terms/second-bell/) — Class bell — two tones
- [System Admin](/terminology/terms/system-admin/) — Staff PIN scope — full admin
- [System Arm](/terminology/terms/system-arm/) — 9090 → 5 → admin PIN
- [System Armed](/terminology/terms/system-armed/) — Horns will play
- [System Standby](/terminology/terms/system-standby/) — Horns stay silent

## For editors

Terms live in `src/data/terminology.json`. After edits, run:

```bash
pnpm run generate:terminology
```

Then commit the updated pages under `terminology/terms/`.
