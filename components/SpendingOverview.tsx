import { TrendingUp, TrendingDown, CreditCard } from "lucide-react";

const cards = [
  {
    title: "Total Monthly Cost",
    value: "₹2,847",
    icon: CreditCard,
    gradient: "from-[#3B82F6] to-[#1D4ED8]",
    trend: null,
  },
  {
    title: "This Month's Savings",
    value: "₹640",
    icon: TrendingDown,
    gradient: "from-[#10B981] to-[#059669]",
    trend: "+12.5%",
    trendColor: "text-[#10B981]",
  },
  {
    title: "Active Subscriptions",
    value: "12",
    icon: TrendingUp,
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
    trend: "+2 this month",
    trendColor: "text-[#8B5CF6]",
  },
];

export function SpendingOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] transition-all duration-200 hover:shadow-lg hover:shadow-[#0F172A]/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {card.trend && (
                <span className={`text-sm font-medium ${card.trendColor}`}>
                  {card.trend}
                </span>
              )}
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">{card.title}</h3>
            <p className="text-white text-2xl font-bold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}