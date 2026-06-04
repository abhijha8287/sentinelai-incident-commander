import json
from pathlib import Path
import sys

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

from app.services.demo_store import DEMO_EVENTS


def main() -> None:
    out = Path(__file__).resolve().parents[2] / "demo" / "splunk-events.jsonl"
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", encoding="utf-8") as handle:
        for event in DEMO_EVENTS:
            handle.write(json.dumps(event.model_dump(mode="json")) + "\n")
    print(f"Wrote {len(DEMO_EVENTS)} Splunk demo events to {out}")


if __name__ == "__main__":
    main()
