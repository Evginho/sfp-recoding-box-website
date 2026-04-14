---
title: Command Reference
description: Full reference for all sfp CLI commands, parameters, and examples.
order: 1
---

## Global Options

```
sfp [global options] <command> [command options]

Global Options:
  --port, -p <n>     Device port (default: 1)
  --verbose, -v      Verbose output
  --json             Force JSON output
  --help, -h         Show help
  --version          Show version
```

---

## sfp --version

Show the installed version.

```bash
sfp --version
# sfp-recoding-box v1.0.0
```

---

## sfp detect

Detect connected devices and inserted modules.

```bash
sfp detect [--all]

Options:
  --all    Show all ports, including empty ones

Examples:
sfp detect
# Port 1: SFP module detected
#   Vendor: FINISAR CORP
#   Part:   FTLX8571D3BCL

sfp detect --all
# Port 1: SFP module detected  (...)
# Port 2: Empty
# Port 3: Empty
# Port 4: Empty
```

---

## sfp info

Display full module information parsed from EEPROM.

```bash
sfp info <port>

Examples:
sfp info 1
# Identifier:    SFP
# Connector:     LC
# Speed:         10 Gbps
# Vendor:        FINISAR CORP
# Part Number:   FTLX8571D3BCL
# Serial Number: ABC1234567
# Date Code:     230415
# Temp:          42.3°C
# Vcc:           3.31V
# Tx Power:      -2.4 dBm
# Rx Power:      -3.1 dBm
```

---

## sfp read

Read the full EEPROM and save to a file.

```bash
sfp read <port> [options]

Options:
  -o, --output <file>    Output file path (required)
  --format <fmt>         Output format: bin (default), json, hex
  --page <n>             Read specific page (0 = A0h, 1 = A2h, all = both)

Examples:
sfp read 1 -o backup.bin
sfp read 1 --format json -o backup.json
sfp read 1 --format hex
sfp read 1 --page all -o full-dump.bin
```

---

## sfp write

Write data to the module EEPROM.

```bash
sfp write <port> [options]

Options:
  -i, --input <file>     Input file (bin or json)
  --offset <n>           Start writing at byte offset (default: 0)
  --length <n>           Number of bytes to write
  --dry-run              Validate without writing

Examples:
sfp write 1 -i new-data.json
sfp write 1 -i new-data.bin --offset 20 --length 16
sfp write 1 -i new-data.bin --dry-run
```

> ⚠️ **Warning:** Always create a backup with `sfp read` before writing. An interrupted write can corrupt the EEPROM.

---

## sfp compare

Compare current EEPROM against a reference file.

```bash
sfp compare <port> <file>

Examples:
sfp compare 1 backup.bin
# All 256 bytes match.

sfp compare 1 expected.json
# Diff at offset 0x14 (20): expected 46 49 4E, got 43 49 53
```

---

## sfp backup

Convenience alias for `sfp read` — saves to `~/.sfp/backups/` with a timestamp.

```bash
sfp backup <port>

Examples:
sfp backup 1
# Saved: ~/.sfp/backups/port1-FTLX8571D3BCL-20260414-140523.bin
```

---

## sfp restore

Write a previously saved backup back to a module.

```bash
sfp restore <port> -i <file>

Examples:
sfp restore 1 -i backup.bin
sfp restore 1 -i ~/.sfp/backups/port1-FTLX8571D3BCL-20260414-140523.bin
```

---

## sfp erase

Erase all EEPROM contents (fills with 0xFF).

```bash
sfp erase <port> [--confirm]

Examples:
sfp erase 1 --confirm
# ⚠️ Erasing EEPROM on port 1...
# Done.
```

---

## sfp set-vendor

Set the vendor name field (bytes 20–35) without rewriting the full EEPROM.

```bash
sfp set-vendor <port> <vendor-id>

Examples:
sfp set-vendor 1 "CISCO-SFP    "
# Vendor field updated. New value: CISCO-SFP
```

---

## sfp bulk-program

Program multiple modules from a CSV manifest file.

```bash
sfp bulk-program <manifest> [options]

Options:
  --ports <range>    Port range to use (e.g., 1-4, default: all)
  --log <file>       Save log to file
  --skip-errors      Continue on error (default: stop on first error)

Manifest format (CSV):
  port,input_file,verify
  1,module-a.json,true
  2,module-b.json,true

Examples:
sfp bulk-program manifest.csv --ports 1-4 --log bulk-log.txt
```

---

## sfp set-vendor-code

Set-vendor shorthand for common vendor IDs.

```bash
sfp set-vendor-code <port> <code>

Codes:
  cisco    → "CISCO-SFP       "
  juniper  → "JUNIPER-SFP     "
  finisar  → "FINISAR CORP    "
  generic  → "                " (blank)

Examples:
sfp set-vendor-code 1 cisco
```

---

## Exit Codes

| Code | Meaning |
|---|---|
| 0 | Success |
| 1 | Device not found |
| 2 | Module not detected |
| 3 | Read error |
| 4 | Write error (EEPROM protected or interrupted) |
| 5 | Verify mismatch |
| 6 | Invalid input file |
| 10 | Unknown error |

---

## See Also

- [Response Formats](/docs/api-reference/response-formats/)
- [Error Codes](/docs/api-reference/error-codes/)
- [Code Examples](/docs/api-reference/code-examples/)
