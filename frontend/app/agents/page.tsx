import { Bot, Wrench } from "lucide-react";
import { Shell } from "@/components/dashboard/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAgentActivity } from "@/lib/api";

export default async function AgentsPage() {
  const { activity } = await getAgentActivity();

  return (
    <Shell>
      <h1 className="mb-2 text-3xl font-bold">Agent Activity</h1>
      <p className="mb-6 max-w-3xl text-muted">
        Live audit trail of autonomous decisions, Splunk MCP calls, response coordination, and external system actions.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Investigation Chain</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-2">
          {activity.map((item) => (
            <div key={item.id} className="rounded-md border border-border bg-panel2 p-4">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-cyan" />
                <p className="font-semibold">{item.agent}</p>
              </div>
              <p className="mt-3 text-sm text-text">{item.decision}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Wrench className="h-3.5 w-3.5" />
                {item.tool}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </Shell>
  );
}
