import { Bell, Search, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-[#1E293B] border-b border-[#334155] flex items-center justify-between px-6">
      {/* Left side - Welcome message */}
      <div>
        <h1 className="text-white text-xl font-semibold">Welcome back, IHA</h1>
        <p className="text-gray-400 text-sm">Here's your subscription overview for December 2024</p>
      </div>

      {/* Right side - Search, notifications, and profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="bg-[#334155] text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-[#475569] focus:border-[#3B82F6] focus:outline-none transition-colors w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 bg-[#334155] rounded-lg hover:bg-[#475569] transition-colors">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full"></span>
        </button>

        {/* Profile dropdown */}
        <div className="flex items-center space-x-3 bg-[#334155] rounded-lg p-2 hover:bg-[#475569] transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full"></div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">IHA</p>
            <p className="text-gray-400 text-xs">iha@example.com</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}