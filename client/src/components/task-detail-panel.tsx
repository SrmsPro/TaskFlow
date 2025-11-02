import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Trash2, Plus, ChevronLeft } from "lucide-react";
import { type Priority } from "./priority-badge";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task?: {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    dueDate?: string;
    dueTime?: string;
    category?: string;
    subtasks?: Subtask[];
  };
  onSave?: (task: any) => void;
  onDelete?: () => void;
}

export function TaskDetailPanel({ isOpen, onClose, task, onSave, onDelete }: TaskDetailPanelProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<Priority>(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [dueTime, setDueTime] = useState(task?.dueTime || "");
  const [category, setCategory] = useState(task?.category || "work");
  const [subtasks, setSubtasks] = useState<Subtask[]>(task?.subtasks || []);

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    const newSubtask = {
      id: `subtask-${Date.now()}`,
      title: "",
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSave = () => {
    onSave?.({
      id: task?.id,
      title,
      description,
      priority,
      dueDate,
      dueTime,
      category,
      subtasks,
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      
      {/* Desktop Panel - Slide from right */}
      <div className="hidden md:flex fixed right-0 top-0 bottom-0 w-[400px] bg-background border-l z-50 flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">{task ? "Edit Task" : "New Task"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-panel">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              data-testid="input-task-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="min-h-32 resize-none"
              data-testid="input-task-description"
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup value={priority} onValueChange={(val) => setPriority(val as Priority)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" data-testid="radio-priority-low" />
                <Label htmlFor="low" className="font-normal cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" data-testid="radio-priority-medium" />
                <Label htmlFor="medium" className="font-normal cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" data-testid="radio-priority-high" />
                <Label htmlFor="high" className="font-normal cursor-pointer">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="critical" id="critical" data-testid="radio-priority-critical" />
                <Label htmlFor="critical" className="font-normal cursor-pointer">Critical</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                data-testid="input-due-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime">Time</Label>
              <Input
                id="dueTime"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                data-testid="input-due-time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Subtasks</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddSubtask}
                data-testid="button-add-subtask"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={subtask.id} className="flex items-center gap-2 p-2 rounded-lg border">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => handleToggleSubtask(subtask.id)}
                    data-testid={`checkbox-subtask-${index}`}
                  />
                  <Input
                    value={subtask.title}
                    onChange={(e) => {
                      const updated = subtasks.map(st =>
                        st.id === subtask.id ? { ...st, title: e.target.value } : st
                      );
                      setSubtasks(updated);
                    }}
                    placeholder="Subtask title..."
                    className="flex-1 border-0 h-8 px-2 focus-visible:ring-0"
                    data-testid={`input-subtask-${index}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemoveSubtask(subtask.id)}
                    data-testid={`button-remove-subtask-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex items-center justify-between">
          {task && (
            <Button variant="destructive" onClick={onDelete} data-testid="button-delete-task">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={onClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-save-task">
              Save Task
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Panel - Full screen from bottom */}
      <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
        <div className="p-4 border-b flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-panel-mobile">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">{task ? "Edit Task" : "New Task"}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title-mobile">Task Title</Label>
            <Input
              id="title-mobile"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="text-base"
              data-testid="input-task-title-mobile"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description-mobile">Description</Label>
            <Textarea
              id="description-mobile"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="min-h-32 resize-none text-base"
              data-testid="input-task-description-mobile"
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup value={priority} onValueChange={(val) => setPriority(val as Priority)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="low" id="low-mobile" />
                <Label htmlFor="low-mobile" className="font-normal cursor-pointer flex-1">Low</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="medium" id="medium-mobile" />
                <Label htmlFor="medium-mobile" className="font-normal cursor-pointer flex-1">Medium</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="high" id="high-mobile" />
                <Label htmlFor="high-mobile" className="font-normal cursor-pointer flex-1">High</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border">
                <RadioGroupItem value="critical" id="critical-mobile" />
                <Label htmlFor="critical-mobile" className="font-normal cursor-pointer flex-1">Critical</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate-mobile">Due Date</Label>
              <Input
                id="dueDate-mobile"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime-mobile">Time</Label>
              <Input
                id="dueTime-mobile"
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-mobile">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Subtasks</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddSubtask}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={subtask.id} className="flex items-center gap-2 p-3 rounded-lg border">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => handleToggleSubtask(subtask.id)}
                  />
                  <Input
                    value={subtask.title}
                    onChange={(e) => {
                      const updated = subtasks.map(st =>
                        st.id === subtask.id ? { ...st, title: e.target.value } : st
                      );
                      setSubtasks(updated);
                    }}
                    placeholder="Subtask title..."
                    className="flex-1 border-0 h-auto px-2 focus-visible:ring-0 text-base"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSubtask(subtask.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t space-y-3">
          {task && (
            <Button variant="destructive" onClick={onDelete} className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Task
            </Button>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Task
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
