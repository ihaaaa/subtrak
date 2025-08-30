import { useState } from "react";
import { SidebarWithState } from "./components/SidebarWithState";
import { Dashboard } from "./components/Dashboard";
import { Analytics } from "./components/Analytics";

export default function App() {
  const [activePage, setActivePage] = useState<"dashboard" | "subscriptions" | "analytics" | "ai-insights" | "settings">("analytics");

  const renderMainContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      case "subscriptions":
      case "ai-insights":
      case "settings":
        // For now, show dashboard as placeholder for other pages
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <SidebarWithState 
        activePage={activePage} 
        onPageChange={(page) => setActivePage(page as any)}
      />
      
      {/* Main Content */}
      {renderMainContent()}
    </div>
  );
}