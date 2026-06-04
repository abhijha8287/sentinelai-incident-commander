import Link from "next/link";
import { AlertTriangle, Bot, Clock, DatabaseZap, RadioTower } from "lucide-react";
import { Shell } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityChart, TrendChart } from "@/components/dashboard/charts";
import { getIncidents, getSummary } from "@/lib/api";
import { severityColor } from "@/lib/utils";

export default async function OverviewPage() {
  const [summary, incidents] = await Promise.all([getSummary(), getIncidents()]);

  return (
    <Shell>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-cyan">Splunk-powered autonomous operations</p>
          <h1 className="mt-2 text-3xl font-bold text-text">Incident Command Center</h1>
        </div>
        <Badge className="border-cyan/40 bg-cyan/10 text-cyan">Splunk MCP Connected</Badge>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Active Incidents</p>
              <p className="mt-2 text-3xl font-bold">{summary.active_incidents}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Mean Resolution Time</p>
              <p className="mt-2 text-3xl font-bold">{summary.mean_resolution_time}m</p>
            </div>
            <Clock className="h-8 w-8 text-amber" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Agent Chain</p>
              <p className="mt-2 text-3xl font-bold">8</p>
            </div>
            <Bot className="h-8 w-8 text-cyan" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Splunk Signals</p>
              <p className="mt-2 text-3xl font-bold">24k</p>
            </div>
            <RadioTower className="h-8 w-8 text-green" />
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={summary.incident_trends} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SeverityChart data={summary.severity_distribution} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Active Investigation Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {incidents.map((incident) => (
              <Link
                href={`/incidents/${incident.incident_id}`}
                key={incident.incident_id}
                className="block rounded-md border border-border bg-panel2 p-4 hover:border-cyan/60"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-text">{incident.title}</p>
                    <p className="mt-1 text-sm text-muted">{incident.summary}</p>
                  </div>
                  <Badge className={severityColor(incident.severity)}>{incident.severity}</Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.services.map((service) => (
              <div key={service.name} className="flex items-center justify-between rounded-md border border-border bg-panel2 px-3 py-2">
                <div className="flex items-center gap-3">
                  <DatabaseZap className="h-4 w-4 text-cyan" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm">{service.latency}ms</p>
                  <p className="text-xs uppercase text-muted">{service.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
