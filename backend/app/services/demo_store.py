from datetime import datetime, timedelta, timezone
from app.models.schemas import (
    AgentAction,
    DashboardSummary,
    EvidenceItem,
    ImpactAnalysis,
    Incident,
    IncidentStatus,
    Postmortem,
    RootCause,
    Severity,
    SplunkEvent,
    Ticket,
)


now = datetime.now(timezone.utc)

DEMO_EVENTS: list[SplunkEvent] = [
    SplunkEvent(timestamp=now - timedelta(minutes=45), service="Payment Service", level="info", message="Deployment payment-service v2.3 completed", deployment_version="v2.3"),
    SplunkEvent(timestamp=now - timedelta(minutes=39), service="PostgreSQL Database", level="warn", message="p95 query latency crossed 1200ms", metric="db_latency_ms", value=1240),
    SplunkEvent(timestamp=now - timedelta(minutes=35), service="Payment Service", level="error", message="Checkout API timeout waiting for ledger write", metric="error_rate", value=7.8),
    SplunkEvent(timestamp=now - timedelta(minutes=31), service="Payment Service", level="critical", message="Splunk alert fired: payment error rate above threshold", metric="anomaly_score", value=0.94),
    SplunkEvent(timestamp=now - timedelta(minutes=21), service="Authentication Service", level="info", message="Token validation healthy", metric="error_rate", value=0.2),
    SplunkEvent(timestamp=now - timedelta(minutes=18), service="Inventory Service", level="warn", message="Downstream checkout retries increased", metric="retry_rate", value=3.1),
]

TIMELINE: list[AgentAction] = [
    AgentAction(id="act-001", agent="Incident Detection Agent", action="Consumed Splunk alert stream", decision="Created SEV-1 incident for Payment Service", tool="splunk.mcp.alerts.subscribe", timestamp=now - timedelta(minutes=31), confidence=0.96),
    AgentAction(id="act-002", agent="Investigation Agent", action="Queried logs, metrics, traces, and deployments", decision="Correlated failure window with v2.3 deployment", tool="splunk.mcp.search", timestamp=now - timedelta(minutes=29), confidence=0.89),
    AgentAction(id="act-003", agent="Root Cause Agent", action="Compared p95 DB latency and checkout timeout traces", decision="Likely inefficient database query introduced in deployment v2.3", tool="langgraph.root_cause_node", timestamp=now - timedelta(minutes=25), confidence=0.87),
    AgentAction(id="act-004", agent="Impact Analysis Agent", action="Calculated affected checkout sessions", decision="Estimated 18,240 users and $92,500 revenue at risk", tool="splunk.mcp.metrics.query", timestamp=now - timedelta(minutes=23), confidence=0.82),
    AgentAction(id="act-005", agent="Response Coordinator Agent", action="Evaluated rollback, restart, and scale options", decision="Recommend rollback to payment-service v2.2 and DB connection pool relief", tool="langgraph.response_plan", timestamp=now - timedelta(minutes=20), confidence=0.9),
    AgentAction(id="act-006", agent="Communication Agent", action="Generated Slack stakeholder update", decision="Published concise incident update with current hypothesis", tool="slack.chat.postMessage", timestamp=now - timedelta(minutes=19), confidence=0.93),
    AgentAction(id="act-007", agent="Ticket Agent", action="Created Jira remediation ticket", decision="Opened SRE-1042 with evidence and rollback recommendation", tool="jira.issue.create", timestamp=now - timedelta(minutes=17), confidence=0.91),
    AgentAction(id="act-008", agent="Postmortem Agent", action="Drafted postmortem markdown and PDF export", decision="Captured timeline, root cause, resolution, and prevention actions", tool="postmortem.export", timestamp=now - timedelta(minutes=8), confidence=0.88),
]

EVIDENCE: list[EvidenceItem] = [
    EvidenceItem(title="Deployment Correlation", source="Splunk deployment index", detail="Payment Service v2.3 deployed 6 minutes before DB latency spike.", timestamp=now - timedelta(minutes=45), weight=0.9),
    EvidenceItem(title="Database Latency", source="Splunk metrics", detail="PostgreSQL p95 latency increased from 280ms to 1450ms after deployment.", timestamp=now - timedelta(minutes=39), weight=0.88),
    EvidenceItem(title="Checkout Timeout Errors", source="Splunk logs", detail="Checkout write requests timed out across three API pods.", timestamp=now - timedelta(minutes=35), weight=0.84),
    EvidenceItem(title="Trace Hotspot", source="Splunk traces", detail="ledger.write transaction spent 82% of request time inside repeated account balance queries.", timestamp=now - timedelta(minutes=30), weight=0.86),
]

ROOT_CAUSE = RootCause(
    root_cause="Deployment payment-service v2.3 introduced inefficient ledger balance queries, saturating PostgreSQL and causing checkout timeouts.",
    confidence_score=0.87,
    evidence=EVIDENCE,
    recommendations=[
        "Rollback Payment Service to v2.2.",
        "Add query plan regression tests for ledger writes.",
        "Temporarily increase database connection pool and enable slow-query sampling.",
    ],
)

IMPACT = ImpactAnalysis(
    affected_services=["Payment Service", "Inventory Service", "PostgreSQL Database"],
    affected_users=18240,
    revenue_impact_estimate=92500,
    severity=Severity.critical,
)

TICKET = Ticket(
    key="SRE-1042",
    title="Rollback Payment Service v2.3 due to checkout DB latency regression",
    description="AI investigation found v2.3 introduced repeated ledger balance queries that saturated PostgreSQL. Roll back and add query regression coverage.",
    severity=Severity.critical,
    url="https://jira.example.com/browse/SRE-1042",
)

POSTMORTEM_MARKDOWN = """# Payment Service Checkout Timeout

## Summary
Payment Service deployment v2.3 caused repeated ledger database queries, increasing PostgreSQL p95 latency and checkout timeouts.

## Timeline
- 10:15 UTC: payment-service v2.3 deployed.
- 10:21 UTC: PostgreSQL latency crossed 1200ms.
- 10:25 UTC: checkout timeout errors increased.
- 10:29 UTC: Splunk alert fired and SentinelAI created the incident.
- 10:40 UTC: rollback recommendation issued.

## Root Cause
Deployment v2.3 introduced an inefficient query path in ledger writes.

## Resolution
Rollback to v2.2 and enable slow-query sampling.

## Lessons Learned
Deployment health checks need query-plan awareness for critical checkout flows.

## Preventive Actions
Add performance regression tests and deployment gates for DB latency.
"""

POSTMORTEM = Postmortem(
    incident_id="INC-2026-0604-001",
    markdown=POSTMORTEM_MARKDOWN,
    pdf_url="/api/postmortems/INC-2026-0604-001.pdf",
    created_at=now - timedelta(minutes=8),
)

INCIDENTS: list[Incident] = [
    Incident(
        incident_id="INC-2026-0604-001",
        title="Payment Service checkout timeouts after v2.3 deployment",
        severity=Severity.critical,
        status=IncidentStatus.investigating,
        affected_service="Payment Service",
        created_at=now - timedelta(minutes=31),
        updated_at=now - timedelta(minutes=3),
        mttr_minutes=None,
        anomaly_score=0.94,
        summary="Splunk detected elevated checkout errors and PostgreSQL latency shortly after payment-service v2.3 deployment.",
        timeline=TIMELINE,
        evidence=EVIDENCE,
        root_cause=ROOT_CAUSE,
        impact=IMPACT,
        recommendations=ROOT_CAUSE.recommendations,
        slack_update="SEV-1 Payment Service incident: database latency increased 400% after v2.3 deployment. AI recommends rollback to v2.2 while DB slow-query sampling is enabled.",
        ticket=TICKET,
        postmortem=POSTMORTEM,
    ),
    Incident(
        incident_id="INC-2026-0603-004",
        title="Notification worker memory leak",
        severity=Severity.medium,
        status=IncidentStatus.resolved,
        affected_service="Notification Service",
        created_at=now - timedelta(days=1, hours=2),
        updated_at=now - timedelta(days=1),
        mttr_minutes=34,
        anomaly_score=0.71,
        summary="Worker heap growth caused delayed email notifications until pods were recycled.",
        timeline=[],
        evidence=[],
        recommendations=["Patch batch serializer", "Add heap pressure alert"],
    ),
]


def list_incidents() -> list[Incident]:
    return INCIDENTS


def get_incident(incident_id: str) -> Incident | None:
    return next((incident for incident in INCIDENTS if incident.incident_id == incident_id), None)


def dashboard_summary() -> DashboardSummary:
    distribution = {severity.value: 0 for severity in Severity}
    for incident in INCIDENTS:
        distribution[incident.severity.value] += 1

    return DashboardSummary(
        active_incidents=sum(1 for incident in INCIDENTS if incident.status != IncidentStatus.resolved),
        mean_resolution_time=37.5,
        severity_distribution=distribution,
        incident_trends=[
            {"day": "Mon", "incidents": 3},
            {"day": "Tue", "incidents": 5},
            {"day": "Wed", "incidents": 2},
            {"day": "Thu", "incidents": 6},
            {"day": "Fri", "incidents": 4},
        ],
        services=[
            {"name": "Authentication", "status": "healthy", "latency": 92},
            {"name": "Payment", "status": "critical", "latency": 1450},
            {"name": "Inventory", "status": "degraded", "latency": 380},
            {"name": "Notifications", "status": "healthy", "latency": 140},
            {"name": "PostgreSQL", "status": "critical", "latency": 1320},
        ],
    )
