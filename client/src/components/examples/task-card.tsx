import { TaskCard } from "../task-card";
import { useState } from "react";

export default function TaskCardExample() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Complete project proposal", completed: false, priority: "high" as const, dueDate: new Date(2024, 10, 15), dueTime: "2:00 PM" },
    { id: "2", title: "Review pull requests", completed: true, priority: "medium" as const, subtaskProgress: { completed: 3, total: 5 } },
    { id: "3", title: "Weekly team meeting", completed: false, priority: "low" as const, dueDate: new Date(2024, 10, 20), recurring: true },
  ]);

  const handleToggle = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-3 p-6 max-w-2xl">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          {...task}
          onToggle={handleToggle}
          onEdit={(id) => console.log('Edit task:', id)}
          onDelete={(id) => console.log('Delete task:', id)}
          onClick={(id) => console.log('Open task:', id)}
        />
      ))}
    </div>
  );
}
