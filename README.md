# SFP Recoding Box

> Professional open-source SFP/QSFP programming — sub-$30, USB-C powered, community-driven.

[![Stars](https://img.shields.io/github/stars/networkser/sfp-recoding-box?style=flat-square)](https://github.com/networkser/sfp-recoding-box/stargazers)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-recoding.innova--optics.com-blue?style=flat-square)](https://recoding.innova-optics.com)

Read, write, and reprogram any SFP, SFP+, SFP28, QSFP, QSFP28, or QSFP-DD transceiver EEPROM — 10–50× cheaper than commercial alternatives.

## Features

- All form factors: SFP (1.25G) through QSFP-DD (400G)
- USB-C powered — no wall adapter needed
- Open source: MIT-licensed firmware and CLI
- Full API: CLI, Python SDK, REST webhooks
- Bulk programming via CSV manifest
- Sub-$30 BOM

## Comparison

| | **SFP Recoding Box** | SFPTOTAL | FS BOX | Pro Optix |
|---|---|---|---|---|
| Price | **<$30** | $500–$2,000+ | $500–$1,500+ | $1,500–$3,000+ |
| Open Source | **MIT** | ❌ | ❌ | ❌ |
| QSFP-DD | **✅** | ❌ | ❌ | ✅ |
| USB-C | **✅** | ❌ | ❌ | ❌ |
| CLI/API | **Full** | Partial | ❌ | Partial |

## Quick Start

```bash
# Install CLI
pip install sfp-recoding-box

# Detect modules
sfp detect

# Read and backup
sfp read 1 -o backup.bin

# Show module info
sfp info 1

# Write new data
sfp write 1 -i new-data.json
```

## Hardware BOM

| Component | Part | Cost |
|---|---|---|
| MCU | Raspberry Pi RP2040 | ~$1 |
| SFP Cage | Molex 47272-0001 | ~$8 |
| Flash | W25Q16JV (16Mbit) | ~$1 |
| USB-C | USB4085-GF-A | ~$0.50 |
| PCB (fab) | JLCPCB 5-pack | ~$15 |
| Components | Various passives | ~$5 |

**Total BOM: ~$30 assembled.**

## Documentation

Full documentation at [recoding.innova-optics.com](https://recoding.innova-optics.com):

- [Getting Started](https://recoding.innova-optics.com/docs/getting-started/what-is-sfp-recoding/)
- [API Reference](https://recoding.innova-optics.com/docs/api-reference/command-reference/)
- [Guides](https://recoding.innova-optics.com/docs/guides/reading-sfp-eeprom/)
- [FAQ](https://recoding.innova-optics.com/docs/faq/)

## Supported Modules

- Any SFP/SFP+ (SFF-8472 compliant)
- Any SFP28 (SFF-8472 + 25G compliance)
- Any QSFP+ / QSFP28 (SFF-8636 compliant)
- QSFP-DD (CMIS 4.0+)

Tested with modules from: Finisar/II-VI, Lumentum, Innolight, Eoptolink, Hisense, and generic/white-label OEMs.

## Community

- [GitHub Discussions](https://github.com/networkser/sfp-recoding-box/discussions) — Q&A and feature requests
- [Issues](https://github.com/networkser/sfp-recoding-box/issues) — bug reports
- [Blog](https://recoding.innova-optics.com/blog/) — tutorials and case studies

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All contributions welcome — firmware, CLI, docs, hardware.

## License

MIT — see [LICENSE](LICENSE). Commercial use permitted.
