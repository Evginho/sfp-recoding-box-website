---
title: Code Examples
description: Python, JavaScript, and bash examples for automating SFP Recoding Box operations.
order: 4
---

## Python

### Read module info

```python
import subprocess
import json

result = subprocess.run(
    ["sfp", "info", "1", "--json"],
    capture_output=True, text=True
)
module = json.loads(result.stdout)
print(f"Vendor: {module['vendor']}")
print(f"Part:   {module['part_number']}")
print(f"Temp:   {module['ddm']['temperature']}°C")
```

### Backup all modules

```python
import subprocess, os, datetime

backup_dir = os.path.expanduser("~/.sfp/backups")
os.makedirs(backup_dir, exist_ok=True)
stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")

for port in range(1, 5):
    result = subprocess.run(
        ["sfp", "detect", "--json", "--port", str(port)],
        capture_output=True, text=True
    )
    info = json.loads(result.stdout)
    if info.get("status") == "module_detected":
        part = info["part_number"].strip()
        out = f"{backup_dir}/port{port}-{part}-{stamp}.bin"
        subprocess.run(["sfp", "read", str(port), "-o", out])
        print(f"Port {port}: backed up to {out}")
```

### Bulk reprogram from manifest

```python
import csv, subprocess

with open("manifest.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        port = row["port"]
        src  = row["input_file"]
        print(f"Programming port {port} from {src}...")
        r = subprocess.run(["sfp", "write", port, "-i", src])
        if r.returncode != 0:
            print(f"  ERROR on port {port}")
        else:
            # Verify
            subprocess.run(["sfp", "compare", port, src])
```

---

## JavaScript (Node.js)

### Read module info

```javascript
const { execSync } = require('child_process');

function getModuleInfo(port = 1) {
  const output = execSync(`sfp info ${port} --json`, { encoding: 'utf8' });
  return JSON.parse(output);
}

const info = getModuleInfo(1);
console.log(`Vendor: ${info.vendor}`);
console.log(`Part:   ${info.part_number}`);
```

### Monitor DDM in real-time

```javascript
const { spawn } = require('child_process');

const proc = spawn('sfp', ['info', '1', '--json', '--watch', '1']);
proc.stdout.on('data', (data) => {
  const module = JSON.parse(data.toString());
  const { temperature, tx_power, rx_power } = module.ddm;
  console.log(`Temp: ${temperature}°C | Tx: ${tx_power} dBm | Rx: ${rx_power} dBm`);
});
```

---

## Bash

### Backup and label by date

```bash
#!/bin/bash
BACKUP_DIR="$HOME/.sfp/backups"
STAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"

for PORT in 1 2 3 4; do
  if sfp detect --port "$PORT" --quiet; then
    PART=$(sfp info "$PORT" --json | jq -r '.part_number' | tr -d ' ')
    OUT="$BACKUP_DIR/port${PORT}-${PART}-${STAMP}.bin"
    sfp read "$PORT" -o "$OUT" && echo "Port $PORT: $OUT"
  fi
done
```

### Verify all ports match reference

```bash
#!/bin/bash
PASS=0; FAIL=0
for PORT in 1 2 3 4; do
  REF="references/port${PORT}.bin"
  if [ -f "$REF" ]; then
    if sfp compare "$PORT" "$REF" --quiet; then
      echo "Port $PORT: PASS"
      ((PASS++))
    else
      echo "Port $PORT: FAIL — mismatch detected"
      ((FAIL++))
    fi
  fi
done
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]  # exit 0 if all pass
```

---

## See Also

- [Command Reference](/docs/api-reference/command-reference/)
- [Response Formats](/docs/api-reference/response-formats/)
- [Bulk Reprogramming Guide](/docs/guides/bulk-reprogramming/)
