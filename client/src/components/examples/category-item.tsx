import { CategoryItem } from "../category-item";
import { Briefcase, Home, GraduationCap, Heart } from "lucide-react";
import { useState } from "react";

export default function CategoryItemExample() {
  const [activeCategory, setActiveCategory] = useState("work");

  const categories = [
    { id: "work", icon: Briefcase, label: "Work", count: 12, color: "text-blue-600 dark:text-blue-400" },
    { id: "personal", icon: Home, label: "Personal", count: 8, color: "text-green-600 dark:text-green-400" },
    { id: "school", icon: GraduationCap, label: "School", count: 5, color: "text-purple-600 dark:text-purple-400" },
    { id: "health", icon: Heart, label: "Health", count: 3, color: "text-red-600 dark:text-red-400" },
  ];

  return (
    <div className="w-64 space-y-1 p-4">
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          {...category}
          active={activeCategory === category.id}
          onClick={() => setActiveCategory(category.id)}
        />
      ))}
    </div>
  );
}
