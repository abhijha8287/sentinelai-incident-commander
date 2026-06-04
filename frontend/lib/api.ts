import type { DashboardSummary, Incident } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getSummary(): Promise<DashboardSummary> {
  return request<DashboardSummary>("/dashboard/summary");
}

export async function getIncidents(): Promise<Incident[]> {
  return request<Incident[]>("/incidents");
}

export async function getIncident(id: string): Promise<Incident> {
  return request<Incident>(`/incidents/${id}`);
}

export async function getAgentActivity(): Promise<{ activity: Incident["timeline"] }> {
  return request<{ activity: Incident["timeline"] }>("/agents/activity");
}

export async function getPostmortems(): Promise<{ reports: NonNullable<Incident["postmortem"]>[] }> {
  return request<{ reports: NonNullable<Incident["postmortem"]>[] }>("/postmortems");
}
