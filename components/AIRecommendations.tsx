import { Sparkles, TrendingDown, Calendar, DollarSign, X } from "lucide-react";

const recommendations = [
  {
    type: "cancel",
    icon: X,
    title: "Cancel Jio Hotstar",
    description: "Unused for 45 days",
    savings: "Save ₹899/year",
    priority: "high",
  },
  {
    type: "upgrade",
    icon: Calendar,
    title: "Switch to Annual Plan",
    description: "Netflix Premium - 2 months free",
    savings: "Save ₹1,298/year",
    priority: "medium",
  },
  {
    type: "optimize",
    icon: TrendingDown,
    title: "Downgrade Spotify",
    description: "Individual plan suits your usage",
    savings: "Save ₹600/year",
    priority: "medium",
  },
  {
    type: "duplicate",
    icon: DollarSign,
    title: "Duplicate Streaming",
    description: "Netflix & Amazon Prime overlap",
    savings: "Consider canceling one",
    priority: "low",
  },
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]";
    case "medium":
      return "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]";
    case "low":
      return "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]";
    default:
      return "bg-gray-500/10 border-gray-500/20 text-gray-500";
  }
}

function getIconColor(priority: string) {
  switch (priority) {
    case "high":
      return "text-[#EF4444]";
    case "medium":
      return "text-[#F59E0B]";
    case "low":
      return "text-[#3B82F6]";
    default:
      return "text-gray-400";
  }
}

export function AIRecommendations() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-white text-lg font-semibold">AI Recommendations</h2>
        </div>
        <span className="text-[#10B981] text-sm font-medium">Potential savings: ₹2,797/year</span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div
              key={index}
              className="bg-[#334155]/30 border border-[#475569] rounded-xl p-4 hover:bg-[#334155]/50 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(rec.priority)} border`}>
                  <Icon className={`w-5 h-5 ${getIconColor(rec.priority)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium group-hover:text-[#3B82F6] transition-colors">
                      {rec.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priority)} border`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{rec.description}</p>
                  <p className="text-[#10B981] text-sm font-medium">{rec.savings}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#334155]">
        <button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-medium py-3 rounded-xl hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all duration-200 flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>Get More AI Insights</span>
        </button>
      </div>
    </div>
  );
}