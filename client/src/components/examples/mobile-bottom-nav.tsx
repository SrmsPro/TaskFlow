import { MobileBottomNav } from "../mobile-bottom-nav";
import { useState } from "react";

export default function MobileBottomNavExample() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-2">Mobile Bottom Navigation</h2>
        <p className="text-muted-foreground">
          Active tab: <span className="font-semibold">{activeTab}</span>
        </p>
      </div>
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
