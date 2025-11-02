import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconBg?: string;
  iconColor?: string;
}

export function StatCard({ icon: Icon, label, value, iconBg = "bg-primary/10", iconColor = "text-primary" }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-lg ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
        </div>
      </div>
    </Card>
  );
}
