---
title: Common Use Cases
description: Real-world scenarios where the SFP Recoding Box saves time, money, and headaches.
order: 4
---

## ISP Network Expansion

**Scenario:** You're deploying new switches and need compatible SFPs, but your vendor-branded modules cost $120 each. Generic equivalents cost $11.

**Solution:**
1. Purchase generic SFP+ SR modules
2. Read EEPROM from a known-good vendor module
3. Write vendor ID to generic modules using `sfp write`
4. Test compatibility in your switch before bulk deployment

**Result:** 90% cost reduction per module.

---

## Data Centre Compatibility Testing

**Scenario:** You're deploying a new switch model and need to validate which modules are electrically compatible before committing to a bulk order.

**Solution:**
1. Use `sfp read` to capture the EEPROM of modules that are known-compatible
2. Compare the compliance bytes and vendor identifiers
3. Use `sfp bulk-program` to prepare a test batch of modules
4. Validate in staging before production rollout

---

## Lab and Maker Space Projects

**Scenario:** You're building custom network equipment and need SFP modules with specific configurations.

**Solution:**
- Set custom vendor IDs for your own OEM project
- Modify DDM threshold alerts for your specific operating environment
- Embed custom serial numbers for asset tracking
- Test I2C protocol implementations against known-good EEPROM data

---

## Backup and Restore Library

Build a reference library of EEPROM dumps from every module type in your inventory:

```bash
# Read and name by module type
sfp read 1 --format json -o "FTLX8571D3BCL-v1.json"
sfp read 1 --format json -o "SFP-10G-LR-cisco.json"

# Restore from library when reprogramming
sfp restore 1 -i "FTLX8571D3BCL-v1.json"
```

---

## Firmware Development and Testing

If you're writing firmware that parses SFP EEPROM data, use the SFP Recoding Box to:
- Generate test fixtures with known-good data
- Simulate edge cases (unusual vendor strings, non-standard calibration)
- Validate your parser against real modules and crafted edge cases

---

## Next Steps

- [Hardware Overview](/docs/hardware/component-overview/)
- [Firmware Installation](/docs/software/firmware-installation/)
- [API Reference](/docs/api-reference/command-reference/)
