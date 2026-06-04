import { Download, FileText } from "lucide-react";
import { Shell } from "@/components/dashboard/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPostmortems } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export default async function PostmortemsPage() {
  const { reports } = await getPostmortems();

  return (
    <Shell>
      <h1 className="mb-2 text-3xl font-bold">Postmortems</h1>
      <p className="mb-6 max-w-3xl text-muted">Generated incident reports with markdown export and PDF-ready hooks.</p>
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.incident_id}>
            <CardHeader>
              <CardTitle>{report.incident_id}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-5 w-5 text-cyan" />
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-sm text-muted">{report.markdown}</pre>
              </div>
              <a
                href={`${API_URL}/postmortems/${report.incident_id}.md`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan hover:bg-cyan/20"
              >
                <Download className="h-4 w-4" />
                Markdown
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
