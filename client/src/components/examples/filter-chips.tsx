import { FilterChips, type FilterType } from "../filter-chips";
import { useState } from "react";

export default function FilterChipsExample() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const counts = {
    all: 42,
    today: 8,
    upcoming: 15,
    completed: 28,
    overdue: 3,
  };

  return (
    <div className="p-6">
      <FilterChips 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        counts={counts}
      />
    </div>
  );
}
