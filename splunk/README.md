# Splunk Setup

This project is wired for Splunk Enterprise plus a Splunk MCP Server boundary.

For the hackathon demo, the backend runs in `DEMO_MODE=true` and returns realistic Splunk-shaped operational data from the demo store. To connect a real Splunk Enterprise instance:

1. Start Splunk from Docker Compose.
2. Create index `sentinel_ops`.
3. Enable HTTP Event Collector with token `sentinel-demo-token`.
4. Ingest `demo/splunk-events.jsonl`.
5. Replace the placeholder `splunk-mcp` service with the official Splunk MCP Server.
6. Set `SPLUNK_HOST`, `SPLUNK_USERNAME`, `SPLUNK_PASSWORD`, `SPLUNK_INDEX`, and `SPLUNK_MCP_URL`.

The agent layer calls Splunk through `backend/app/services/splunk_service.py`, which is intentionally isolated so real MCP tool calls can replace the demo responses without touching the dashboard.
