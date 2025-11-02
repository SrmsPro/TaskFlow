import { EmptyState } from "../empty-state";
import { ListTodo } from "lucide-react";

export default function EmptyStateExample() {
  return (
    <div className="p-6">
      <EmptyState
        icon={ListTodo}
        title="No tasks yet"
        description="Get started by creating your first task to stay organized and productive."
        action={{
          label: "Create Task",
          onClick: () => console.log('Create task clicked'),
        }}
      />
    </div>
  );
}
