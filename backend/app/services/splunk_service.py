from datetime import datetime, timezone
from app.models.schemas import SplunkEvent
from app.services.demo_store import DEMO_EVENTS


class SplunkService:
    """Service boundary for Splunk Enterprise and Splunk MCP access."""

    async def search(self, query: str) -> dict:
        matched = [
            event for event in DEMO_EVENTS
            if query.lower() in event.message.lower() or query.lower() in event.service.lower()
        ] or DEMO_EVENTS
        return {
            "query": query,
            "mode": "demo",
            "mcp_tool": "splunk.mcp.search",
            "results": matched,
            "executed_at": datetime.now(timezone.utc),
        }

    async def logs(self, service: str | None = None) -> list[SplunkEvent]:
        if service:
            return [event for event in DEMO_EVENTS if event.service.lower() == service.lower()]
        return DEMO_EVENTS

    async def metrics(self) -> list[dict]:
        return [
            {"service": "Payment Service", "metric": "error_rate", "value": 7.8, "unit": "%"},
            {"service": "PostgreSQL Database", "metric": "p95_latency", "value": 1450, "unit": "ms"},
            {"service": "Inventory Service", "metric": "retry_rate", "value": 3.1, "unit": "x"},
        ]

    async def anomalies(self) -> list[dict]:
        return [
            {"service": "Payment Service", "score": 0.94, "signal": "checkout_error_rate"},
            {"service": "PostgreSQL Database", "score": 0.91, "signal": "p95_latency"},
        ]
