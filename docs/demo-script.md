# Demo Script

## Scenario

Payment Service deployment v2.3 introduces inefficient ledger database queries.

1. Open `http://localhost:3000`.
2. Show Overview metrics: active incidents, severity distribution, MTTR, Splunk signal volume, and service health.
3. Open `Payment Service checkout timeouts after v2.3 deployment`.
4. Walk through the AI Investigation Timeline:
   - Detection from Splunk alert stream.
   - Splunk MCP searches across logs, metrics, traces, and deployments.
   - Root cause confidence calculation.
   - Impact analysis.
   - Response recommendation.
   - Slack update.
   - Jira ticket.
   - Postmortem generation.
5. Open Agent Activity and show the full autonomous chain.
6. Open Postmortems and download the markdown report.

## Judge Talking Points

- This is not a chatbot. It is a stateful agentic workflow that takes operational signals and produces incident response artifacts.
- Splunk is the operational source of truth.
- Splunk MCP is the tool boundary agents use for evidence gathering.
- Slack, Jira, and postmortem outputs are generated automatically from the evidence package.
- Demo mode makes the full story visible without external credentials, while the service boundaries are ready for real APIs.
