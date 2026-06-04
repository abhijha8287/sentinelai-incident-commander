import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function severityColor(severity: string) {
  return {
    critical: "text-red border-red/40 bg-red/10",
    high: "text-amber border-amber/40 bg-amber/10",
    medium: "text-cyan border-cyan/40 bg-cyan/10",
    low: "text-green border-green/40 bg-green/10"
  }[severity] ?? "text-muted border-border bg-panel";
}
