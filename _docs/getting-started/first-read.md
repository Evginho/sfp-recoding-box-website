---
title: First Read (Hello World)
description: Read your first SFP module EEPROM and create a backup in under 5 minutes.
order: 3
---

This guide walks through reading a module EEPROM for the first time. You'll need:
- SFP Recoding Box connected via USB-C
- Any SFP/SFP+ module inserted in the cage

---

## 1. Verify Device and Module

```bash
sfp detect
# Port 1: SFP module detected
#   Vendor: FINISAR CORP
#   Part:   FTLX8571D3BCL
#   Serial: ABC1234567
#   Type:   SFP+ (10 Gbps)
```

---

## 2. Read the EEPROM

```bash
# Read and display module information
sfp info 1

# Output:
# Identifier:    0x03 (SFP)
# Connector:     0x07 (LC)
# Speed:         10 Gbps
# Vendor:        FINISAR CORP
# Part Number:   FTLX8571D3BCL
# Revision:      A
# Serial Number: ABC1234567
# Date Code:     230415
# Temp (now):    42.3°C
# Vcc (now):     3.31V
# Tx Power:      -2.4 dBm
# Rx Power:      -3.1 dBm
```

---

## 3. Create a Binary Backup

**Always back up before writing.** This is the raw 256-byte EEPROM dump:

```bash
sfp read 1 -o backup.bin
# Reading port 1 EEPROM...
# 256 bytes read in 0.12s
# Saved to: backup.bin
```

---

## 4. View the Raw Data

```bash
# Hex dump (requires xxd or hexdump)
xxd backup.bin | head -20

# Or export as JSON for easy parsing
sfp read 1 --format json -o backup.json
cat backup.json
```

---

## 5. Compare Against a Reference

```bash
# After any write, verify the result matches your intended data:
sfp compare 1 backup.bin
# All bytes match — no differences found.
```

---

## Understanding the Output

The first 128 bytes (low memory, A0h address) contain identity and calibration:

| Offset | Field | Example |
|---|---|---|
| 0 | Identifier | `0x03` = SFP |
| 1 | Extended ID | `0x04` |
| 2 | Connector | `0x07` = LC |
| 3–10 | Compliance | 10GBASE-SR flags |
| 20–35 | Vendor name | `FINISAR CORP   ` |
| 40–55 | Part number | `FTLX8571D3BCL  ` |
| 60–75 | Serial | `ABC1234567     ` |
| 84–91 | Date code | `230415  ` |

The second 128 bytes (high memory / page 0, A2h) contain DDM diagnostics.

---

## Next Steps

- [Reading SFP EEPROM (Guide)](/docs/guides/reading-sfp-eeprom/) — deep dive with hex interpretation
- [Writing Module Codes](/docs/guides/writing-module-codes/) — how to modify and write back
- [Command Reference](/docs/api-reference/command-reference/) — all CLI commands
