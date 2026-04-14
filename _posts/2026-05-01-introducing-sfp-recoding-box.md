---
layout: post
title: "Introducing the SFP Recoding Box: Open-Source SFP Programming for Everyone"
description: We're launching the SFP Recoding Box — an open-source, USB-C powered device that lets you read and reprogram any SFP/QSFP transceiver for under $500.
date: 2026-05-01 09:00:00 +0000
category: Announcements
---

Today we're launching the **SFP Recoding Box** — the first fully open-source SFP/QSFP programmer designed for the real world.

## Why We Built This

If you've worked with managed switches long enough, you've hit the vendor lock-in wall. You buy a generic 10G module that passes every electrical test, and your Cisco switch rejects it with:

```
%PHY-4-SFP_NOT_SUPPORTED: The SFP in slot Gi1/0/1 is not supported
```

The module works fine electrically. The only problem is 16 bytes in an EEPROM that say the wrong vendor name.

Commercial solutions exist — SFPTOTAL, FS BOX, Pro Optix — but they start at $1,500 and go up from there. They're closed-source, locked to vendor support contracts, and don't support newer form factors like QSFP-DD.

We wanted something better. Open. Affordable. Hackable.

## What We Built

The SFP Recoding Box is:

- **USB-C powered** — no wall adapter, works from any laptop
- **All form factors** — SFP through QSFP-DD (400G)  
- **Sub-$500** — 10–50× cheaper than commercial alternatives
- **Fully open source** — MIT-licensed firmware and CLI
- **Complete API** — CLI, Python, webhooks for automation

The hardware is based on the RP2040 microcontroller. The firmware speaks I2C natively to SFP modules. The CLI runs on Linux, macOS, and Windows.

## Open Source Philosophy

Everything is on GitHub: firmware, CLI, hardware schematics, PCB files. You can inspect exactly what it does to your modules, modify it for your use case, and contribute improvements back.

The MIT license means you can use it commercially. No royalties, no license servers, no annual fees.

## Getting Started

- [Unboxing & Setup](/docs/getting-started/unboxing-setup/)
- [First Read (Hello World)](/docs/getting-started/first-read/)
- [GitHub Repository](https://github.com/networkser/sfp-recoding-box)

We're excited to see what the community builds with this. File issues, open pull requests, share your use cases.
