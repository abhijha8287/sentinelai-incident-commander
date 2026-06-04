from fastapi import APIRouter, HTTPException, Response
from app.agents.workflow import IncidentCommanderWorkflow
from app.models.schemas import DashboardSummary, Incident
from app.services.demo_store import dashboard_summary, get_incident, list_incidents
from app.services.notification_service import JiraService, SlackService
from app.services.splunk_service import SplunkService

router = APIRouter()
splunk = SplunkService()
workflow = IncidentCommanderWorkflow()
slack = SlackService()
jira = JiraService()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "sentinelai-api"}


@router.get("/dashboard/summary", response_model=DashboardSummary)
async def get_dashboard_summary() -> DashboardSummary:
    return dashboard_summary()


@router.get("/incidents", response_model=list[Incident])
async def get_incidents() -> list[Incident]:
    return list_incidents()


@router.get("/incidents/{incident_id}", response_model=Incident)
async def get_incident_detail(incident_id: str) -> Incident:
    incident = get_incident(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident


@router.post("/demo/run", response_model=Incident)
async def run_demo() -> Incident:
    return await workflow.run_demo_scenario()


@router.get("/agents/activity")
async def get_agent_activity() -> dict:
    return {"activity": await workflow.agent_activity(), "chain": await workflow.explain_chain()}


@router.get("/splunk/search")
async def splunk_search(q: str = "Payment Service") -> dict:
    return await splunk.search(q)


@router.get("/splunk/logs")
async def splunk_logs(service: str | None = None) -> dict:
    return {"results": await splunk.logs(service)}


@router.get("/splunk/metrics")
async def splunk_metrics() -> dict:
    return {"results": await splunk.metrics()}


@router.get("/splunk/anomalies")
async def splunk_anomalies() -> dict:
    return {"results": await splunk.anomalies()}


@router.post("/incidents/{incident_id}/slack")
async def publish_slack_update(incident_id: str) -> dict:
    incident = get_incident(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return await slack.publish_update(incident)


@router.post("/incidents/{incident_id}/jira")
async def create_jira_ticket(incident_id: str) -> dict:
    incident = get_incident(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return await jira.create_ticket(incident)


@router.get("/postmortems")
async def get_postmortems() -> dict:
    return {"reports": [incident.postmortem for incident in list_incidents() if incident.postmortem]}


@router.get("/postmortems/{incident_id}.md")
async def download_postmortem_markdown(incident_id: str) -> Response:
    incident = get_incident(incident_id)
    if incident is None or incident.postmortem is None:
        raise HTTPException(status_code=404, detail="Postmortem not found")
    return Response(
        content=incident.postmortem.markdown,
        media_type="text/markdown",
        headers={"Content-Disposition": f'attachment; filename="{incident_id}-postmortem.md"'},
    )
