---
title: Naming guide
description: Arnold Alert component names for staff training and UI.
---

:::tip[Full glossary]
Every name below is also a **clickable term** across this site. Browse the full A–Z list: [Terminology](/terminology/).
:::

**Platform:** **Arnold Alert** — *Campus bells & emergency codes — Arnold Church of Christ*

| Layer | Pattern | Example |
|-------|---------|---------|
| Staff apps | Alert + role | Alert Mobile, Alert Desk |
| Features | Alert + function | Alert Emergency, Alert Bells |
| Hardware | Alert + device | Alert Gateway, Alert Fobs |
| Codes | Industry standard | Code Red, Code Blue, All clear |

## Apps

| Name | URL |
|------|-----|
| **Alert Mobile** | [alarm.arnoldcoc.org](https://alarm.arnoldcoc.org) |
| **Alert Desk** | [alarm.arnoldcoc.org/desk/](https://alarm.arnoldcoc.org/desk/) |

## PIN scopes

| Internal | Staff name | Can do |
|----------|------------|--------|
| `bells` | **Bell Ringer** | Alert Bells only |
| `evacuate` | **Code Leader** | Alert Emergency + fobs |
| `admin` | **System Admin** | Alert Desk + arm/disarm |
| `remote` | **Remote Operator** | Off-campus queue (rare) |

## System states

| State | Name |
|-------|------|
| Armed | **System Armed** |
| Unarmed | **System Standby** |
| Red active | **Code Red Active** |
| Blue active | **Code Blue Active** |

## Printable

```
ARNOLD ALERT — campus safety system

Alert Mobile     phone app (codes, bells, fob)
Alert Desk       admin computer console

Code Red         evacuate
Code Blue        lockdown
All clear        IC only — ends active code

Alert Line       ext 9090 (page & menu — NOT for codes in crisis)
Campus Horns     building speakers
Alert Fobs       physical buttons — arm first

System Armed     horns play  |  System Standby  horns silent
```

Full guide lives in the [arnold-alarm repo](https://github.com/BadBraddA1/arnold-alarm/blob/main/docs/NAMING.md).
