---
title: Reading SFP EEPROM
description: Deep dive into reading and interpreting SFP EEPROM data — hex layout, field definitions, and DDM diagnostics.
order: 1
---

## Overview

This guide walks through a complete EEPROM read and data interpretation. You'll learn the memory layout and how to read every field.

**Prerequisites:** Device connected, module inserted, `sfp` CLI installed.

---

## Step 1: Connect and Insert Module

```bash
sfp detect
# Port 1: SFP module detected
#   Vendor: FINISAR CORP
#   Part:   FTLX8571D3BCL
```

---

## Step 2: Read and Backup

```bash
sfp read 1 -o backup.bin
# Reading port 1 EEPROM...
# 256 bytes read in 0.14s
# Saved to: backup.bin
```

Store this backup safely before doing anything else.

---

## Step 3: View Hex Output

```bash
xxd backup.bin | head -16
```

Example output:
```
00000000: 0304 0700 0000 0000 0000 0000 0000 0000  ................
00000010: 0000 0000 4649 4e49 5341 5220 434f 5250  ....FINISAR CORP
00000020: 2020 2020 0046 544c 5838 3537 3144 3342  .....FTLX8571D3B
00000030: 434c 2020 2020 2020 4100 4142 4331 3233  CL      A.ABC123
```

---

## Memory Map: Low Memory (A0h, bytes 0–127)

| Bytes | Field | Description |
|---|---|---|
| 0 | Identifier | `0x03` = SFP, `0x0D` = SFP+, `0x11` = QSFP28 |
| 1 | Ext Identifier | Extended module type flags |
| 2 | Connector | `0x07` = LC, `0x0B` = RJ45, `0x21` = MPO |
| 3–10 | Transceiver | Compliance codes (10GbE, FC, etc.) |
| 11 | Encoding | `0x03` = NRZ, `0x06` = PAM4 |
| 12 | BR Nominal | Baud rate × 100 MBd |
| 13 | Rate ID | Rate select capability |
| 14 | Length SMF km | Single-mode fibre length (km) |
| 15 | Length SMF 100m | Single-mode fibre length (×100m) |
| 16 | Length OM2 | 50µm fibre length (×10m) |
| 17 | Length OM1 | 62.5µm fibre length (×10m) |
| 18 | Length copper | Copper/DAC length (m) |
| 20–35 | Vendor Name | ASCII, space-padded |
| 36 | Transceiver 2 | Additional compliance codes |
| 37–39 | Vendor OUI | IEEE OUI (3 bytes) |
| 40–55 | Vendor PN | ASCII part number, space-padded |
| 56–59 | Vendor Rev | ASCII revision, space-padded |
| 60–63 | Wavelength | Nominal wavelength (nm × 20) |
| 64–75 | Reserved | |
| 76–83 | Vendor SN | ASCII serial number, space-padded |
| 84–91 | Date Code | ASCII YYMMDD + lot code |
| 92 | Diag Type | `0x68` = DDM internally calibrated |
| 93 | Enhanced Options | Feature flags |
| 94 | SFF-8472 Compl. | `0x09` = SFF-8472 rev 11 |
| 95 | CC_BASE | Checksum (bytes 0–94) |
| 96–127 | Calibration | DDM calibration constants |

---

## Memory Map: High Memory (A2h, bytes 128–255)

The high memory page holds real-time DDM diagnostics:

| Bytes | Field | Units |
|---|---|---|
| 128–129 | Temp high alarm | °C × 256 |
| 130–131 | Temp low alarm | °C × 256 |
| 132–133 | Temp high warning | °C × 256 |
| 134–135 | Temp low warning | °C × 256 |
| 136–137 | Vcc high alarm | Vcc × 10000 |
| ... | ... | ... |
| 160–161 | Temperature | Current temp, °C × 256 |
| 162–163 | Vcc | Current Vcc, 100µV |
| 164–165 | Tx Bias | Current, 2µA |
| 166–167 | Tx Power | mW × 10000 |
| 168–169 | Rx Power | mW × 10000 |

---

## Step 4: Export to JSON

For scripting and further analysis:

```bash
sfp read 1 --format json -o backup.json
```

The JSON output includes all decoded fields with human-readable values:

```json
{
  "identifier": "SFP",
  "connector": "LC",
  "vendor": "FINISAR CORP",
  "part_number": "FTLX8571D3BCL",
  "revision": "A",
  "serial_number": "ABC1234567",
  "date_code": "230415",
  "wavelength_nm": 850,
  "ddm": {
    "temperature": 42.3,
    "vcc": 3.31,
    "tx_bias_ma": 6.52,
    "tx_power_dbm": -2.4,
    "rx_power_dbm": -3.1
  }
}
```

---

## Backing Up to a Library

```bash
PART=$(sfp info 1 --json | python3 -c "import json,sys; print(json.load(sys.stdin)['part_number'].strip())")
sfp read 1 -o "$HOME/.sfp/backups/${PART}-$(date +%Y%m%d).bin"
```

---

## Next Steps

- [Writing Module Codes](/docs/guides/writing-module-codes/)
- [Bulk Reprogramming](/docs/guides/bulk-reprogramming/)
