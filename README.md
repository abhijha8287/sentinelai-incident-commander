# SentinelAI Incident Commander

Autonomous SRE and Incident Commander platform for Splunk-powered production operations. SentinelAI monitors incidents, investigates evidence, identifies root cause, coordinates response, generates Slack/Jira outputs, and produces postmortems.

## Stack

- Frontend: Next.js 15, TypeScript, TailwindCSS, shadcn-style components, Recharts
- Backend: FastAPI, Python 3.12
- Agent layer: LangGraph-ready workflow facade, LangChain/OpenAI dependencies
- Data: PostgreSQL
- Observability: Splunk Enterprise and Splunk MCP Server boundary
- Integrations: Slack API, Jira API
- Deployment: Docker Compose

## Quick Start

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Open:

- Dashboard: `http://localhost:3000`
- API docs: `http://localhost:8000/docs`
- Splunk UI: `http://localhost:8001`

Default Splunk credentials in Docker are `admin` / `changeme`.

## Local Development

Backend:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Frontend:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

## Demo Data

Generate Splunk-shaped JSONL events:

```powershell
cd backend
.\.venv\Scripts\python.exe scripts\generate_demo_data.py
```

Output: `demo/splunk-events.jsonl`

## Project Structure

```text
backend/
  app/
    agents/          LangGraph-ready autonomous workflow facade
    api/             FastAPI routes
    core/            Settings and environment config
    models/          Pydantic API schemas
    services/        Splunk, Slack, Jira, and demo data service layers
  scripts/           Demo data generator
frontend/
  app/               Next.js app router pages
  components/        Dashboard and shadcn-style UI primitives
  lib/               API client, types, utilities
docs/                Architecture, API, and demo script
splunk/              Splunk and MCP setup notes
demo/                Generated demo artifacts
```

## Production Integration Notes

The current app defaults to deterministic demo mode so hackathon judges can see the full autonomous flow immediately. To move beyond demo mode:

1. Replace `SplunkService` demo responses with real Splunk MCP tool calls.
2. Add persistent incident storage using SQLAlchemy models or SQLModel.
3. Connect `SlackService` to `chat.postMessage`.
4. Connect `JiraService` to Jira issue creation.
5. Wire `IncidentCommanderWorkflow` to a real LangGraph `StateGraph`.
6. Store generated postmortem PDFs in object storage.

## Documentation

- [Architecture](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Demo Script](docs/demo-script.md)
- [Splunk Setup](splunk/README.md)
