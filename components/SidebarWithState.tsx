import { 
  LayoutDashboard, 
  CreditCard, 
  BarChart3, 
  Sparkles, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  activePage: "dashboard" | "subscriptions" | "analytics" | "ai-insights" | "settings";
  onPageChange?: (page: string) => void;
}

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { name: "Subscriptions", icon: CreditCard, key: "subscriptions" },
  { name: "Analytics", icon: BarChart3, key: "analytics" },
  { name: "AI Insights", icon: Sparkles, key: "ai-insights" },
  { name: "Settings", icon: Settings, key: "settings" },
];

export function SidebarWithState({ activePage, onPageChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-[#1E293B] border-r border-[#334155] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#334155]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white text-xl font-semibold">SubTrak</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === activePage;
            return (
              <li key={item.name}>
                <button
                  onClick={() => onPageChange?.(item.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-[#3B82F6] text-white shadow-lg"
                      : "text-gray-300 hover:bg-[#334155] hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#334155]">
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#334155] transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full"></div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">IHA</p>
            <p className="text-gray-400 text-xs">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}