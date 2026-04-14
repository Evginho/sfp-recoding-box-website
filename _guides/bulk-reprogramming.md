---
title: Bulk Reprogramming
description: Program dozens or hundreds of modules efficiently using the bulk-program command and CSV manifests.
order: 3
---

## Overview

The `sfp bulk-program` command automates programming of multiple modules using a CSV manifest. Designed for data centre deployments, ISP provisioning, and OEM production runs.

---

## Prepare a Manifest CSV

Create a file listing what to write to each port on each insertion:

```csv
port,input_file,verify,label
1,templates/cisco-10g-sr.json,true,row-A
1,templates/cisco-10g-sr.json,true,row-A
2,templates/juniper-10g-lr.json,true,row-B
```

Each row = one module insertion. The same port appears multiple times as you swap modules.

---

## Run Bulk Program

```bash
sfp bulk-program manifest.csv --ports 1-4 --log bulk-$(date +%Y%m%d).txt
```

The CLI will:
1. Wait for a module to be inserted on the specified port
2. Read current EEPROM (auto-backup)
3. Write target data
4. Verify
5. Prompt to remove and insert next module
6. Log all results

---

## Interactive Flow

```
[1/48] Port 1 — Ready. Insert module now...
✓ Module detected: GENERIC SFP+ 10G
  Writing template: cisco-10g-sr.json
  Writing...  Done (0.43s)
  Verifying... Pass
  Remove module and insert next (or press Q to quit)

[2/48] Port 1 — Ready. Insert module now...
...
```

---

## Skip Errors

By default, `bulk-program` stops on the first failure. To continue:

```bash
sfp bulk-program manifest.csv --skip-errors --log bulk.txt
```

Failed modules are logged with their port, timestamp, and error code.

---

## Reviewing Results

```bash
# Summary from log
grep -E "Pass|FAIL" bulk-20260414.txt | sort | uniq -c

# Failed modules only
grep "FAIL" bulk-20260414.txt
```

---

## Multi-Port Parallel Programming

If your device has 4 ports, you can load 4 modules simultaneously:

```bash
sfp bulk-program manifest.csv --ports 1-4 --parallel
```

In parallel mode the CLI waits for all 4 ports to be loaded, programs them simultaneously, then prompts for the next batch.

---

## Template Library

Maintain a directory of reference JSON templates:

```
templates/
  cisco-sfp-10g-sr.json
  cisco-sfp-10g-lr.json
  juniper-sfp-10g-sr.json
  generic-blank.json
```

---

## Next Steps

- [Backup & Restore](/docs/guides/backup-restore/)
- [Code Examples](/docs/api-reference/code-examples/)
