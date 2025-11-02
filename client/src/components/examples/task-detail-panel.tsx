import { TaskDetailPanel } from "../task-detail-panel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TaskDetailPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  const sampleTask = {
    id: "1",
    title: "Complete project proposal",
    description: "Draft and finalize the Q4 project proposal for the new client",
    priority: "high" as const,
    dueDate: "2024-11-15",
    dueTime: "14:00",
    category: "work",
    subtasks: [
      { id: "s1", title: "Research requirements", completed: true },
      { id: "s2", title: "Create outline", completed: false },
    ],
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-panel">
        Open Task Panel
      </Button>
      <TaskDetailPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        task={sampleTask}
        onSave={(task) => {
          console.log('Saved task:', task);
          setIsOpen(false);
        }}
        onDelete={() => {
          console.log('Deleted task');
          setIsOpen(false);
        }}
      />
    </div>
  );
}
