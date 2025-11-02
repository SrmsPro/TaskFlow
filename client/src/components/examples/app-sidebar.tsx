import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import { useState } from "react";

export default function AppSidebarExample() {
  const [activeCategory, setActiveCategory] = useState("all");

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <ThemeProvider>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
