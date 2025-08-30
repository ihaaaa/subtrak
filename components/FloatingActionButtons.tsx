import { Plus, MessageSquare } from "lucide-react";

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
      {/* Ask AI Button */}
      <button className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center group">
        <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Add Subscription Button */}
      <button className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center group">
        <Plus className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Tooltips on hover */}
      <div className="absolute right-20 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[#1E293B] text-white text-sm px-3 py-2 rounded-lg border border-[#334155] whitespace-nowrap">
          Ask AI
        </div>
      </div>
      <div className="absolute right-20 bottom-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[#1E293B] text-white text-sm px-3 py-2 rounded-lg border border-[#334155] whitespace-nowrap">
          Add Subscription
        </div>
      </div>
    </div>
  );
}