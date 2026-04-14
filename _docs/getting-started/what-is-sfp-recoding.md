---
title: What is SFP Recoding?
description: Learn what SFP transceivers are, why you might need to reprogram one, and how the SFP Recoding Box makes it affordable and open.
order: 1
---

## Introduction

An **SFP transceiver** (Small Form-factor Pluggable) is a compact, hot-swappable optical or electrical module used in networking equipment. Every switch, router, and media converter that accepts fibre or DAC cables uses SFP modules to handle signal conversion.

The **SFP Recoding Box** lets you read, write, and reprogram the EEPROM memory inside any SFP module — changing vendor identification, calibration data, and compatibility flags — using a USB-C connection to your laptop.

### Why would you need to reprogram one?

- **Hardware compatibility** — Some switches reject "third-party" modules with vendor lock checks. Reprogramming the vendor ID unlocks compatibility.
- **Cost optimisation** — Buy generic modules at 1/10th the OEM price. Recode once, use everywhere.
- **Feature unlocking** — Enable DDM (Digital Optical Monitoring), adjust thresholds, expose hidden diagnostics.
- **Lab and testing** — Simulate module types, test firmware behaviour, verify DDM parsing in your own code.
- **Custom applications** — Embed custom serial numbers, configuration flags, or calibration data for OEM builds.

---

## SFP Form Factors

| Standard | Speed | Common Use |
|---|---|---|
| SFP | 1.25 Gbps | 1G Ethernet, SONET |
| SFP+ | 10 Gbps | 10GbE, 8G FC |
| SFP28 | 25 Gbps | 25GbE server uplinks |
| QSFP+ | 40 Gbps | 40GbE aggregation |
| QSFP28 | 100 Gbps | 100GbE spine/core |
| QSFP-DD | 400 Gbps | 400GbE data centre |

The SFP Recoding Box supports **all six form factors** with a single device.

---

## Why Recode?

### The Vendor Lock-in Problem

Major switch vendors (Cisco, Juniper, HPE, Extreme) use vendor identification bytes in the module's EEPROM to enforce "compatibility checks." A module that passes electronically may still be rejected in software because the vendor ID doesn't match a known OEM part number.

This creates a market where identical hardware sells at wildly different prices based on whose logo is printed on the label.

### The Cost Impact

A single 10G SFP+ DAC cable:
- Cisco-branded: $80–200
- Generic with correct vendor ID: $8–15

For a 48-port switch, that's a difference of $3,456–$8,880 per chassis. For a data centre with hundreds of switches, the savings are enormous.

---

## EEPROM Basics

Every SFP module contains a small **EEPROM** (Electrically Erasable Programmable Read-Only Memory) chip that stores module identity and diagnostic data. This data is read over an **I2C** interface when the module is inserted.

### What data is stored?

The SFP MSA (Multi-Source Agreement) defines the memory map:

| Byte Range | Content |
|---|---|
| 0–1 | Module identifier (SFP, SFP+, etc.) |
| 20–35 | Vendor name (ASCII) |
| 40–55 | Part number (ASCII) |
| 56–59 | Revision (ASCII) |
| 60–75 | Serial number (ASCII) |
| 84–91 | Date code |
| 96–127 | DDM thresholds and calibration |
| 128–255 | Page data (DDM real-time readings) |

---

## Tools Overview

| Tool | Price | Open Source | Form Factors |
|---|---|---|---|
| **SFP Recoding Box** | **&lt;$500** | **Yes** | **All** |
| SFPTOTAL | $2,000+ | No | SFP–SFP28 |
| FS BOX | $1,500+ | No | SFP–SFP28 |
| Pro Optix | $3,000+ | No | All |

---

## Next Steps

- [Unboxing & Setup](/docs/getting-started/unboxing-setup/) — hardware assembly and driver install
- [First Read (Hello World)](/docs/getting-started/first-read/) — read your first SFP module in under 5 minutes
