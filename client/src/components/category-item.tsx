import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface CategoryItemProps {
  icon: LucideIcon;
  label: string;
  count: number;
  color?: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryItem({ icon: Icon, label, count, color = "text-foreground", active, onClick }: CategoryItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 px-3 py-2 ${active ? 'bg-sidebar-accent' : ''}`}
      onClick={onClick}
      data-testid={`button-category-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className={`h-5 w-5 ${color}`} />
      <span className="flex-1 text-left font-medium">{label}</span>
      {count > 0 && (
        <Badge variant="secondary" className="h-5 px-2" data-testid={`badge-count-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {count}
        </Badge>
      )}
    </Button>
  );
}
