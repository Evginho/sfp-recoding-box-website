---
title: FAQ
description: Frequently asked questions about the SFP Recoding Box.
permalink: /docs/faq/
order: 1
---

## General

### What devices can this program?

Any SFP, SFP+, SFP28, QSFP+, QSFP28, or QSFP-DD module that exposes an I2C EEPROM (A0h/A2h). This covers the vast majority of commercially available transceivers and DAC cables.

Write-protected modules (where the EEPROM protection bit is set) can be read but not written without first clearing the write-protect bit.

### Is this legal to use?

Programming an SFP module you own is legal in most jurisdictions. The EEPROM is user data — there's no DRM or security feature that constitutes circumvention under DMCA or similar laws.

Using reprogrammed modules to deceive a vendor's support contract or warranty process may violate your service agreement. Check your contracts.

The SFP Recoding Box firmware and CLI are MIT-licensed open source.

### What's the success rate?

For standard non-write-protected modules: effectively 100% read, 99%+ write with verify. The 1% write failures are typically due to:
- Marginal power delivery (use a quality USB-C cable)
- Modules with wear-levelled EEPROMs that need a pre-erase step

### Can I recover from a bad write?

Yes, if you have a backup. This is why every guide starts with `sfp read -o backup.bin`. If the module is in an indeterminate state after a failed write, use `sfp erase` then `sfp write` from your backup.

---

## Compatibility

### Does it work with [vendor] modules?

If the module conforms to the SFP MSA standard (SFF-8472, SFF-8636, etc.) — yes. The vast majority of modules from Finisar/II-VI, Lumentum, Innolight, Eoptolink, Hisense, and generic manufacturers are supported.

Proprietary modules with non-standard memory maps (some Cisco XFP, some early Brocade) may have limited write support.

### What about proprietary modules?

Read-only access works on almost all modules. Write access requires a writeable EEPROM. Some OEM modules set the write-protect bit permanently — these cannot be reprogrammed.

### Can I read write-protected modules?

Yes. The write-protect bit only affects write operations. All read and diagnostic (DDM) operations work regardless of write-protect status.

### What about future form factors?

OSFP and QSFP-DD800 support is on the roadmap. The hardware supports the I2C protocol used by all current and announced form factors. Firmware updates will add format-specific parsing as new standards are ratified.

---

## Troubleshooting

### Why can't it detect my module?

1. Re-seat the module — it needs to click fully into the cage
2. Try a different module to confirm the device itself is working
3. Check `sfp detect --all` — the port should show as "Ready" at minimum
4. Check LED status: PWR (green) = power OK, USB (blue) = host connected
5. Try unplugging and re-plugging the USB-C cable

### What does error code X mean?

See the [Error Codes reference](/docs/api-reference/error-codes/).

### Why is it so slow?

Read operations should take 0.1–0.3s. If reads are taking >2s:
- Try a different USB cable (charge-only cables don't pass data)
- Try a different USB port (avoid USB hubs if possible)
- On Linux: check for USB power management: `echo on | sudo tee /sys/bus/usb/devices/*/power/control`

### How do I fix a corrupted EEPROM?

If you have a backup: `sfp restore 1 -i backup.bin`

If you don't have a backup:
1. Use `sfp erase 1 --confirm` to zero out the EEPROM
2. Find a reference dump for your module model online or from a working unit
3. Restore from the reference dump
4. Adjust the serial number and date code if needed

---

## Advanced

### Can I modify the firmware?

Yes — it's MIT-licensed. The firmware source is at [`github.com/networkser/sfp-recoding-box`](https://github.com/networkser/sfp-recoding-box). Build instructions are in [`CONTRIBUTING.md`](https://github.com/networkser/sfp-recoding-box/blob/main/CONTRIBUTING.md).

### How do I contribute code?

See [Contributing Guidelines](/docs/contributing/contribution-guidelines/).

### What about commercial licensing?

The MIT license permits commercial use, modification, and redistribution with no royalties. You can use this in a commercial product or service. Attribution (keeping the copyright notice) is the only requirement.

### Performance benchmarks

| Operation | Time |
|---|---|
| Module detect | ~50ms |
| Full EEPROM read (256 bytes) | 120–180ms |
| Full EEPROM write (256 bytes) | 350–500ms |
| Write + verify | 500–700ms |
| Bulk program (100 modules, 4 ports) | ~20 minutes |
