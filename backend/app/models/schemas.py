from datetime import datetime
from enum import StrEnum
from pydantic import BaseModel, Field


class Severity(StrEnum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"


class IncidentStatus(StrEnum):
    investigating = "investigating"
    mitigated = "mitigated"
    resolved = "resolved"


class SplunkEvent(BaseModel):
    timestamp: datetime
    service: str
    level: str
    message: str
    metric: str | None = None
    value: float | None = None
    deployment_version: str | None = None


class AgentAction(BaseModel):
    id: str
    agent: str
    action: str
    decision: str
    tool: str
    timestamp: datetime
    confidence: float = Field(ge=0, le=1)


class EvidenceItem(BaseModel):
    title: str
    source: str
    detail: str
    timestamp: datetime
    weight: float = Field(ge=0, le=1)


class RootCause(BaseModel):
    root_cause: str
    confidence_score: float = Field(ge=0, le=1)
    evidence: list[EvidenceItem]
    recommendations: list[str]


class ImpactAnalysis(BaseModel):
    affected_services: list[str]
    affected_users: int
    revenue_impact_estimate: float
    severity: Severity


class Ticket(BaseModel):
    key: str
    title: str
    description: str
    severity: Severity
    url: str


class Postmortem(BaseModel):
    incident_id: str
    markdown: str
    pdf_url: str
    created_at: datetime


class Incident(BaseModel):
    incident_id: str
    title: str
    severity: Severity
    status: IncidentStatus
    affected_service: str
    created_at: datetime
    updated_at: datetime
    mttr_minutes: int | None = None
    anomaly_score: float
    summary: str
    timeline: list[AgentAction]
    evidence: list[EvidenceItem]
    root_cause: RootCause | None = None
    impact: ImpactAnalysis | None = None
    recommendations: list[str] = []
    slack_update: str | None = None
    ticket: Ticket | None = None
    postmortem: Postmortem | None = None


class DashboardSummary(BaseModel):
    active_incidents: int
    mean_resolution_time: float
    severity_distribution: dict[str, int]
    incident_trends: list[dict[str, int | str]]
    services: list[dict[str, str | float]]
