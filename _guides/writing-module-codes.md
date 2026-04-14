---
title: Writing Module Codes
description: How to safely write EEPROM data to an SFP module, including pre-write checklist and verification.
order: 2
---

## Before You Write

> ⚠️ **BACK UP FIRST.** An interrupted write can leave a module in an unreadable state. Run `sfp backup 1` before anything else.

Pre-write checklist:
1. ✅ Backup created: `sfp backup <port>`
2. ✅ Module is not write-protected: `sfp info <port>` — check "Write Protect" field
3. ✅ Input file validated: `sfp write <port> -i data.json --dry-run`
4. ✅ Target module is in compatible equipment for post-write test

---

## Step 1: Prepare Your Data File

You can write from either a binary dump or a JSON file.

**JSON is recommended** — it's human-readable and error-prone to formatting mistakes.

Example: change vendor name only

```json
{
  "vendor": "CISCO-SFP       ",
  "part_number": "SFP-10G-SR      "
}
```

Only fields present in the JSON will be written. All other bytes are preserved.

For a full EEPROM replacement, use a binary `.bin` file from `sfp read`.

---

## Step 2: Dry Run

Always validate before committing:

```bash
sfp write 1 -i new-data.json --dry-run
# Dry run — no changes written
# Would update:
#   Bytes 20–35 (vendor): "FINISAR CORP    " → "CISCO-SFP       "
#   Bytes 40–55 (part):   "FTLX8571D3BCL   " → "SFP-10G-SR      "
#   Checksum (byte 95):   0xAB → 0xC4 (auto-computed)
```

Verify the diff looks correct.

---

## Step 3: Write

```bash
sfp write 1 -i new-data.json
# Writing to port 1...
# 32 bytes updated
# Write complete (0.41s)
```

**Do not unplug or remove the module during a write.**

---

## Step 4: Verify

```bash
sfp compare 1 new-data.json
# All target fields match.

# Or do a full EEPROM verify against expected output:
sfp compare 1 expected-final.bin
# All 256 bytes match.
```

Also run `sfp info 1` to confirm the parsed fields are correct.

---

## Common Write Operations

### Change vendor ID

```bash
sfp set-vendor 1 "CISCO-SFP       "
# Vendor name updated (bytes 20–35)
# Checksum recalculated
```

### Use a preset vendor code

```bash
sfp set-vendor-code 1 cisco
sfp set-vendor-code 1 juniper
sfp set-vendor-code 1 finisar
```

### Full EEPROM clone from another module

```bash
# Read source module on port 2
sfp read 2 -o source.bin

# Write to target module on port 1 (after swapping modules)
sfp write 1 -i source.bin
sfp compare 1 source.bin
```

---

## Write-Protected Modules

If `sfp info` shows "Write Protect: enabled", the EEPROM protection bit is set. To clear it:

```bash
sfp write 1 --clear-write-protect
```

This writes `0x00` to the write-protect byte (address 0x5C on A2h page). Not all modules honour this — some have hardware-level protection.

---

## Recovery

If a write fails mid-operation:

```bash
# Attempt a full restore from backup
sfp restore 1 -i backup.bin

# If module is unresponsive, try erase first
sfp erase 1 --confirm
sfp write 1 -i backup.bin
```

---

## Next Steps

- [Bulk Reprogramming](/docs/guides/bulk-reprogramming/)
- [Backup & Restore](/docs/guides/backup-restore/)
