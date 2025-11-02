import { PriorityBadge } from "../priority-badge";

export default function PriorityBadgeExample() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <PriorityBadge priority="low" />
      <PriorityBadge priority="medium" />
      <PriorityBadge priority="high" />
      <PriorityBadge priority="critical" />
    </div>
  );
}
