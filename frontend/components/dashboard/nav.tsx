import Link from "next/link";
import { Activity, FileText, Radar, Siren } from "lucide-react";

const items = [
  { href: "/", label: "Overview", icon: Radar },
  { href: "/agents", label: "Agents", icon: Activity },
  { href: "/postmortems", label: "Postmortems", icon: FileText }
];

export function Nav() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-border bg-[#08171b] p-5 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan/40 bg-cyan/10">
          <Siren className="h-5 w-5 text-cyan" />
        </div>
        <div>
          <p className="text-sm font-bold text-text">SentinelAI</p>
          <p className="text-xs text-muted">Incident Commander</p>
        </div>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-panel2 hover:text-text"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
