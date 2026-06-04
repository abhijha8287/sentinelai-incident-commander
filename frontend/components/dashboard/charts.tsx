"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#ff5c70", "#f4b942", "#38d6c5", "#55d187"];

export function TrendChart({ data }: { data: { day: string; incidents: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid stroke="#1f3a42" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#8fb2ad" />
          <YAxis stroke="#8fb2ad" />
          <Tooltip contentStyle={{ background: "#0d1b20", border: "1px solid #1f3a42", color: "#e7f6f4" }} />
          <Bar dataKey="incidents" radius={[4, 4, 0, 0]} fill="#38d6c5" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SeverityChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).map(([name, value]) => ({ name, value }));
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={entries}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={90}
            paddingAngle={4}
            isAnimationActive={false}
          >
            {entries.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#0d1b20", border: "1px solid #1f3a42", color: "#e7f6f4" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
