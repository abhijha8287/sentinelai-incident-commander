# Architecture

```mermaid
flowchart LR
  Splunk["Splunk Enterprise\nLogs, metrics, traces, alerts"]
  MCP["Splunk MCP Server\nSearch and alert tools"]
  API["FastAPI Backend\nIncident workflow API"]
  Graph["LangGraph Agent Workflow"]
  UI["Next.js Dashboard\nNOC operations view"]
  Slack["Slack API"]
  Jira["Jira API"]
  PG["PostgreSQL"]
  PM["Postmortem Export"]

  Splunk --> MCP
  MCP --> Graph
  Graph --> API
  API --> UI
  API --> PG
  Graph --> Slack
  Graph --> Jira
  Graph --> PM
```

## Agent Flow

1. Incident Detection Agent consumes Splunk alerts and anomaly scores.
2. Investigation Agent queries Splunk logs, metrics, traces, and deployment history.
3. Root Cause Agent correlates evidence and assigns confidence.
4. Impact Analysis Agent estimates service, user, and revenue impact.
5. Response Coordinator Agent evaluates rollback, scaling, restart, and escalation actions.
6. Communication Agent drafts Slack and stakeholder updates.
7. Ticket Agent creates Jira remediation work.
8. Postmortem Agent exports a final incident report.

The current implementation exposes this complete workflow through deterministic demo data so judges can see every required system interaction without needing paid external credentials.
