import { TrendingUp, TrendingDown, Bell } from "lucide-react";

const metrics = [
  {
    title: "Total Spent - Last 30 Days",
    value: "₹2,847",
    icon: TrendingUp,
    gradient: "from-[#3B82F6] to-[#1D4ED8]",
    sparkline: [2100, 2300, 2150, 2400, 2600, 2847],
    trend: null,
  },
  {
    title: "Savings Achieved",
    value: "₹640",
    icon: TrendingUp,
    gradient: "from-[#10B981] to-[#059669]",
    trend: "+12.5%",
    trendColor: "text-[#10B981]",
  },
  {
    title: "Predicted Wasted Next 30 Days",
    value: "₹450",
    icon: Bell,
    gradient: "from-[#EF4444] to-[#DC2626]",
    trend: "High Risk",
    trendColor: "text-[#EF4444]",
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {metric.trend && (
                <span className={`text-sm font-medium ${metric.trendColor}`}>
                  {metric.trend}
                </span>
              )}
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-2">{metric.title}</h3>
            <div className="flex items-end justify-between">
              <p className="text-white text-2xl font-bold">{metric.value}</p>
              
              {/* Mini sparkline for first card */}
              {metric.sparkline && (
                <div className="flex items-end space-x-1 h-8">
                  {metric.sparkline.map((value, i) => (
                    <div
                      key={i}
                      className="bg-[#3B82F6] rounded-sm w-1"
                      style={{
                        height: `${(value / Math.max(...metric.sparkline)) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}