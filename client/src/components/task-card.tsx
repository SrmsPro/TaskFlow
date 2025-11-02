import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PriorityBadge, type Priority } from "./priority-badge";
import { Calendar, Clock, MoreVertical, Repeat } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  dueTime?: string;
  subtaskProgress?: { completed: number; total: number };
  recurring?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function TaskCard({
  id,
  title,
  completed,
  priority,
  dueDate,
  dueTime,
  subtaskProgress,
  recurring,
  onToggle,
  onEdit,
  onDelete,
  onClick,
}: TaskCardProps) {
  return (
    <Card className="p-4 hover-elevate cursor-pointer" onClick={() => onClick?.(id)} data-testid={`card-task-${id}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle?.(id)}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5"
          data-testid={`checkbox-task-${id}`}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${completed ? "line-through text-muted-foreground" : ""}`} data-testid={`text-task-title-${id}`}>
              {title}
            </h3>
            <div className="flex items-center gap-1">
              <PriorityBadge priority={priority} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-task-menu-${id}`}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(id); }} data-testid={`button-edit-${id}`}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(id); }} className="text-destructive" data-testid={`button-delete-${id}`}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            {dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{format(dueDate, "MMM d, yyyy")}</span>
              </div>
            )}
            {dueTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{dueTime}</span>
              </div>
            )}
            {recurring && (
              <div className="flex items-center gap-1">
                <Repeat className="w-3 h-3" />
                <span>Recurring</span>
              </div>
            )}
          </div>
          
          {subtaskProgress && subtaskProgress.total > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Subtasks</span>
                <span>{subtaskProgress.completed}/{subtaskProgress.total}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div 
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(subtaskProgress.completed / subtaskProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
