# API Documentation

Base URL: `http://localhost:8000/api`

## Health

`GET /health`

Returns backend health.

## Dashboard

`GET /dashboard/summary`

Returns active incident count, mean resolution time, severity distribution, trends, and service health.

## Incidents

`GET /incidents`

Lists incidents.

`GET /incidents/{incident_id}`

Returns incident detail, timeline, evidence, root cause, impact, Slack update, Jira ticket, and postmortem.

`POST /demo/run`

Runs the deterministic Payment Service demo scenario.

## Agents

`GET /agents/activity`

Returns agent decisions, tools, confidence values, and the workflow chain.

## Splunk

`GET /splunk/search?q=Payment`

Runs a Splunk-style search through the Splunk service layer.

`GET /splunk/logs?service=Payment%20Service`

Returns operational logs.

`GET /splunk/metrics`

Returns key metrics.

`GET /splunk/anomalies`

Returns anomaly scores.

## Integrations

`POST /incidents/{incident_id}/slack`

Publishes or simulates a Slack incident update.

`POST /incidents/{incident_id}/jira`

Creates or simulates a Jira ticket.

## Postmortems

`GET /postmortems`

Lists generated reports.

`GET /postmortems/{incident_id}.md`

Downloads markdown report.
