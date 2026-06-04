export type Severity = "critical" | "high" | "medium" | "low";

export type AgentAction = {
  id: string;
  agent: string;
  action: string;
  decision: string;
  tool: string;
  timestamp: string;
  confidence: number;
};

export type EvidenceItem = {
  title: string;
  source: string;
  detail: string;
  timestamp: string;
  weight: number;
};

export type Incident = {
  incident_id: string;
  title: string;
  severity: Severity;
  status: "investigating" | "mitigated" | "resolved";
  affected_service: string;
  created_at: string;
  updated_at: string;
  mttr_minutes: number | null;
  anomaly_score: number;
  summary: string;
  timeline: AgentAction[];
  evidence: EvidenceItem[];
  root_cause: {
    root_cause: string;
    confidence_score: number;
    evidence: EvidenceItem[];
    recommendations: string[];
  } | null;
  impact: {
    affected_services: string[];
    affected_users: number;
    revenue_impact_estimate: number;
    severity: Severity;
  } | null;
  recommendations: string[];
  slack_update: string | null;
  ticket: {
    key: string;
    title: string;
    description: string;
    severity: Severity;
    url: string;
  } | null;
  postmortem: {
    incident_id: string;
    markdown: string;
    pdf_url: string;
    created_at: string;
  } | null;
};

export type DashboardSummary = {
  active_incidents: number;
  mean_resolution_time: number;
  severity_distribution: Record<Severity, number>;
  incident_trends: { day: string; incidents: number }[];
  services: { name: string; status: string; latency: number }[];
};
