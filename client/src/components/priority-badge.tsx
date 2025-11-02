import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";

export type Priority = "low" | "medium" | "high" | "critical";

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig = {
  low: { label: "Low", className: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20" },
  medium: { label: "Medium", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" },
  high: { label: "High", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" },
  critical: { label: "Critical", className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <Badge variant="outline" className={`${config.className} gap-1`} data-testid={`badge-priority-${priority}`}>
      <Flag className="w-3 h-3" />
      <span className="text-xs font-semibold uppercase tracking-wide">{config.label}</span>
    </Badge>
  );
}
