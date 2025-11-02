import { StatCard } from "../stat-card";
import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      <StatCard icon={ListTodo} label="Total Tasks" value={42} />
      <StatCard icon={CheckCircle2} label="Completed" value={28} iconBg="bg-green-500/10" iconColor="text-green-600 dark:text-green-500" />
      <StatCard icon={Clock} label="In Progress" value={10} iconBg="bg-amber-500/10" iconColor="text-amber-600 dark:text-amber-500" />
      <StatCard icon={TrendingUp} label="This Week" value={14} iconBg="bg-blue-500/10" iconColor="text-blue-600 dark:text-blue-500" />
    </div>
  );
}
