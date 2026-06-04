from app.models.schemas import Incident


class SlackService:
    async def publish_update(self, incident: Incident) -> dict:
        text = incident.slack_update or f"{incident.severity.upper()} incident in {incident.affected_service}"
        return {
            "provider": "slack",
            "channel": "#incident-response",
            "status": "demo_sent",
            "message": text,
        }


class JiraService:
    async def create_ticket(self, incident: Incident) -> dict:
        ticket = incident.ticket
        return {
            "provider": "jira",
            "status": "demo_created",
            "ticket": ticket,
        }
