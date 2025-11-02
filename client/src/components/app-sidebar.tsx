import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CategoryItem } from "./category-item";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ListTodo, 
  Briefcase, 
  Home, 
  GraduationCap, 
  Heart,
  Settings,
  Plus,
  LogOut
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface AppSidebarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function AppSidebar({ activeCategory = "all", onCategoryChange }: AppSidebarProps) {
  const categories = [
    { id: "all", icon: ListTodo, label: "All Tasks", count: 42, color: "text-foreground" },
    { id: "work", icon: Briefcase, label: "Work", count: 12, color: "text-blue-600 dark:text-blue-400" },
    { id: "personal", icon: Home, label: "Personal", count: 8, color: "text-green-600 dark:text-green-400" },
    { id: "school", icon: GraduationCap, label: "School", count: 5, color: "text-purple-600 dark:text-purple-400" },
    { id: "health", icon: Heart, label: "Health", count: 3, color: "text-red-600 dark:text-red-400" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <ListTodo className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">TaskFlow</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <CategoryItem
                    {...category}
                    active={activeCategory === category.id}
                    onClick={() => onCategoryChange?.(category.id)}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Button className="w-full gap-2" data-testid="button-add-category">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" data-testid="button-settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
