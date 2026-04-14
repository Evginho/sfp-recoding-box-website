---
title: Unboxing & Setup
description: Assemble your SFP Recoding Box, install drivers, and make your first connection.
order: 2
---

## What's in the Box

| Item | Qty | Notes |
|---|---|---|
| SFP Recoding Box PCB | 1 | RP2040-based, assembled |
| USB-C cable (1m) | 1 | Data + power |
| SFP cage (if unassembled kit) | 1 | Pre-soldered on assembled units |
| Quick start card | 1 | QR code to this page |

**Also useful but not included:**
- A test SFP module (any 1G or 10G module you own)
- Small flathead screwdriver for cage re-seating

> ⚠️ **Safety:** Always handle SFP modules by the body. Never touch the optical port aperture or electrical contacts. ESD precautions recommended for bare PCB handling.

---

## Hardware Assembly (Kit version)

If you ordered the unassembled kit, the SFP cage needs to be seated:

1. Align the SFP cage footprint with the PCB pads
2. Ensure the latch mechanism faces outward (away from RP2040)
3. Press firmly until all pins are seated
4. Solder all ground tabs and signal pins
5. Inspect under good lighting — all 20 pins should be filled

Pre-assembled units: skip to Driver Installation below.

---

## LED Indicator Meanings

| LED | Colour | State | Meaning |
|---|---|---|---|
| PWR | Green | Solid | Device powered and ready |
| RDY | Green | Blinking | Active I2C communication |
| RDY | Green | Solid | Module detected, idle |
| USB | Blue | Solid | USB host connected |
| USB | Blue | Blinking | USB data transfer |

---

## Driver Installation

### Linux

```bash
# Most modern kernels include the CDC-ACM driver — no install needed
# Verify device is detected:
ls /dev/ttyACM*

# If permission denied:
sudo usermod -a -G dialout $USER
# Log out and back in for group change to take effect
```

### macOS

```bash
# Install via Homebrew
brew install networkser/tap/sfp-recoding-box

# Verify installation
sfp --version
```

### Windows

Download the installer from the [Releases page](https://github.com/networkser/sfp-recoding-box/releases/latest).

Run the `.msi` installer, which includes:
- USB driver (WinUSB-based)
- `sfp` CLI added to `PATH`

Alternatively with winget:
```
winget install networkser.sfp-recoding-box
```

---

## First Connection

1. Connect USB-C cable from device to laptop
2. PWR LED should light green within 2 seconds
3. Open a terminal and verify:

```bash
sfp --version
# sfp-recoding-box v1.0.0

sfp detect
# Port 1: Ready (no module inserted)
```

4. Insert a test SFP module into the cage
5. Blue LED blinks briefly as module is detected

```bash
sfp detect
# Port 1: SFP module detected
#   Vendor: FINISAR CORP
#   Part:   FTLX8571D3BCL
#   Serial: ABC1234567

sfp info 1
# (full module details)
```

---

## Troubleshooting

**Device not detected:**
- Check cable supports data (some USB-C cables are charge-only)
- Try a different USB port
- On Linux: check `dmesg | tail -20` for CDC-ACM messages

**Permission denied on Linux:**
- Run `sudo usermod -a -G dialout $USER` and re-login

**Module not detected after insertion:**
- Re-seat the module (click it fully in)
- Check RDY LED — should blink on insertion

---

## Next Steps

- [First Read (Hello World)](/docs/getting-started/first-read/) — read and back up an EEPROM in under 5 minutes
- [Common Use Cases](/docs/getting-started/common-use-cases/) — ISP compatibility, data centre bulk programming, lab testing
