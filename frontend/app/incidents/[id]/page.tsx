import { ArrowLeft, GitBranch, MessageSquare, TicketCheck } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/dashboard/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIncident } from "@/lib/api";
import { severityColor } from "@/lib/utils";

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const incident = await getIncident(id);

  return (
    <Shell>
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-text">
        <ArrowLeft className="h-4 w-4" />
        Overview
      </Link>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.title}</h1>
          <p className="mt-2 max-w-3xl text-muted">{incident.summary}</p>
        </div>
        <Badge className={severityColor(incident.severity)}>{incident.severity}</Badge>
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>AI Investigation Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {incident.timeline.map((item) => (
              <div key={item.id} className="rounded-md border border-border bg-panel2 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="font-semibold text-cyan">{item.agent}</p>
                  <span className="text-xs text-muted">{new Date(item.timestamp).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm text-text">{item.action}</p>
                <p className="mt-1 text-sm text-muted">{item.decision}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>{item.tool}</span>
                  <span>{Math.round(item.confidence * 100)}% confidence</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Root Cause</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-cyan/40 bg-cyan/10 text-3xl font-bold text-cyan">
                {Math.round((incident.root_cause?.confidence_score ?? 0) * 100)}%
              </div>
              <p className="text-sm text-text">{incident.root_cause?.root_cause}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Outputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-md border border-border bg-panel2 p-3">
                <MessageSquare className="mb-2 h-4 w-4 text-cyan" />
                <p className="text-muted">{incident.slack_update}</p>
              </div>
              <div className="rounded-md border border-border bg-panel2 p-3">
                <TicketCheck className="mb-2 h-4 w-4 text-amber" />
                <p className="font-semibold">{incident.ticket?.key}: {incident.ticket?.title}</p>
                <p className="mt-1 text-muted">{incident.ticket?.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Evidence Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {incident.evidence.map((item) => (
              <div key={item.title} className="rounded-md border border-border bg-panel2 p-3">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
                <p className="mt-2 text-xs uppercase text-cyan">{item.source}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dependency Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 items-center gap-3 text-center text-sm">
              {["Web Checkout", "Payment Service", "PostgreSQL", "Inventory", "Slack", "Jira"].map((node, index) => (
                <div key={node} className="rounded-md border border-border bg-panel2 p-4">
                  <GitBranch className={`mx-auto mb-2 h-5 w-5 ${index === 1 || index === 2 ? "text-red" : "text-cyan"}`} />
                  {node}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
