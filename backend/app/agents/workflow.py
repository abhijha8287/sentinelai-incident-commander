from app.models.schemas import AgentAction, Incident
from app.services.demo_store import get_incident


class IncidentCommanderWorkflow:
    """LangGraph-ready workflow facade used by the API and dashboard demo."""

    def __init__(self) -> None:
        self.graph_name = "sentinelai_incident_commander"

    async def run_demo_scenario(self) -> Incident:
        incident = get_incident("INC-2026-0604-001")
        if incident is None:
            raise RuntimeError("Demo incident is missing")
        return incident

    async def agent_activity(self) -> list[AgentAction]:
        incident = await self.run_demo_scenario()
        return incident.timeline

    async def explain_chain(self) -> dict:
        incident = await self.run_demo_scenario()
        return {
            "workflow": self.graph_name,
            "nodes": [
                "incident_detection",
                "investigation",
                "root_cause",
                "impact_analysis",
                "response_coordination",
                "communication",
                "ticket_creation",
                "postmortem",
            ],
            "state": incident,
        }
