import { useState } from "react";
import { StatCard } from "@/components/stat-card";
import { SearchBar } from "@/components/search-bar";
import { FilterChips, type FilterType } from "@/components/filter-chips";
import { TaskCard } from "@/components/task-card";
import { TaskDetailPanel } from "@/components/task-detail-panel";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileHeader } from "@/components/mobile-header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileSearchModal } from "@/components/mobile-search-modal";
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  TrendingUp,
  Plus,
  ListFilter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockTasks = [
  {
    id: "1",
    title: "Complete project proposal for Q4",
    completed: false,
    priority: "high" as const,
    dueDate: new Date(2024, 10, 15),
    dueTime: "2:00 PM",
    category: "work",
  },
  {
    id: "2",
    title: "Review pull requests from team",
    completed: true,
    priority: "medium" as const,
    subtaskProgress: { completed: 3, total: 5 },
    category: "work",
  },
  {
    id: "3",
    title: "Weekly team standup meeting",
    completed: false,
    priority: "low" as const,
    dueDate: new Date(2024, 10, 20),
    recurring: true,
    category: "work",
  },
  {
    id: "4",
    title: "Prepare presentation slides",
    completed: false,
    priority: "critical" as const,
    dueDate: new Date(2024, 10, 12),
    dueTime: "10:00 AM",
    subtaskProgress: { completed: 2, total: 8 },
    category: "work",
  },
  {
    id: "5",
    title: "Schedule dental appointment",
    completed: false,
    priority: "medium" as const,
    category: "personal",
  },
  {
    id: "6",
    title: "Buy groceries",
    completed: false,
    priority: "low" as const,
    category: "personal",
  },
  {
    id: "7",
    title: "Finish homework assignment",
    completed: false,
    priority: "high" as const,
    dueDate: new Date(2024, 10, 18),
    category: "school",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [mobileTab, setMobileTab] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleOpenTask = (id: string) => {
    setSelectedTaskId(id);
    setIsPanelOpen(true);
  };

  const handleNewTask = () => {
    setSelectedTaskId(null);
    setIsPanelOpen(true);
  };

  const handleMobileTabChange = (tab: string) => {
    setMobileTab(tab);
    if (tab === "all") setActiveFilter("all");
    else if (tab === "today") setActiveFilter("today");
    else if (tab === "completed") setActiveFilter("completed");
  };

  const selectedTask = selectedTaskId 
    ? tasks.find(t => t.id === selectedTaskId) 
      ? {
          ...tasks.find(t => t.id === selectedTaskId)!,
          dueDate: tasks.find(t => t.id === selectedTaskId)!.dueDate?.toISOString().split('T')[0],
        }
      : undefined
    : undefined;

  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeFilter === "completed") return task.completed;
    if (activeFilter === "today") {
      const today = new Date();
      return task.dueDate?.toDateString() === today.toDateString();
    }
    return true;
  });

  const filterCounts = {
    all: tasks.length,
    today: tasks.filter(t => {
      const today = new Date();
      return t.dueDate?.toDateString() === today.toDateString();
    }).length,
    upcoming: tasks.filter(t => t.dueDate && t.dueDate > new Date()).length,
    completed: tasks.filter(t => t.completed).length,
    overdue: tasks.filter(t => t.dueDate && t.dueDate < new Date() && !t.completed).length,
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between p-4 border-b h-16">
        <div className="flex items-center gap-3">
          <SidebarTrigger data-testid="button-sidebar-toggle" />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader onSearchClick={() => setIsSearchModalOpen(true)} />

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
          {/* Welcome Section - Desktop Only */}
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
            <p className="text-muted-foreground">Here's what you need to focus on today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard icon={ListTodo} label="Total" value={tasks.length} />
            <StatCard 
              icon={CheckCircle2} 
              label="Done" 
              value={tasks.filter(t => t.completed).length}
              iconBg="bg-green-500/10" 
              iconColor="text-green-600 dark:text-green-500" 
            />
            <StatCard 
              icon={Clock} 
              label="Active" 
              value={tasks.filter(t => !t.completed).length}
              iconBg="bg-amber-500/10" 
              iconColor="text-amber-600 dark:text-amber-500" 
            />
            <StatCard 
              icon={TrendingUp} 
              label="Week" 
              value={14}
              iconBg="bg-blue-500/10" 
              iconColor="text-blue-600 dark:text-blue-500" 
            />
          </div>

          {/* Search and Filters - Desktop Only */}
          <div className="hidden md:block space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <FilterChips 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={filterCounts}
              />
              
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <ListFilter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={handleNewTask} className="gap-2" data-testid="button-new-task">
                  <Plus className="h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {activeFilter === "all" && "All Tasks"}
                {activeFilter === "today" && "Today"}
                {activeFilter === "completed" && "Completed"}
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] h-9" data-testid="select-sort-mobile">
                  <ListFilter className="h-4 w-4 mr-1" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <EmptyState
                icon={ListTodo}
                title={searchQuery ? "No tasks found" : "No tasks yet"}
                description={searchQuery ? "Try adjusting your search or filters." : "Get started by creating your first task."}
                action={{
                  label: "Create Task",
                  onClick: handleNewTask,
                }}
              />
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onToggle={handleToggleTask}
                  onClick={handleOpenTask}
                  onEdit={handleOpenTask}
                  onDelete={(id) => console.log('Delete:', id)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button - Mobile Only */}
      <Button
        onClick={handleNewTask}
        size="icon"
        className="md:hidden fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg z-30"
        data-testid="button-fab-new-task"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={mobileTab} onTabChange={handleMobileTabChange} />

      {/* Task Detail Panel */}
      <TaskDetailPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        task={selectedTask}
        onSave={(task) => console.log('Save:', task)}
        onDelete={() => console.log('Delete')}
      />
    </div>
  );
}
