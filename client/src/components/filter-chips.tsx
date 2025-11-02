import { Button } from "@/components/ui/button";

export type FilterType = "all" | "today" | "upcoming" | "completed" | "overdue";

interface FilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts?: Record<FilterType, number>;
}

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All Tasks" },
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "overdue", label: "Overdue" },
];

export function FilterChips({ activeFilter, onFilterChange, counts }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="whitespace-nowrap"
          data-testid={`button-filter-${filter.id}`}
        >
          {filter.label}
          {counts && counts[filter.id] > 0 && (
            <span className="ml-1.5 text-xs">({counts[filter.id]})</span>
          )}
        </Button>
      ))}
    </div>
  );
}
