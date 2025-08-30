import { AnalyticsHeader } from "./AnalyticsHeader";
import { MetricCards } from "./cards/MetricCards";
import { SpendTrendChart } from "./charts/SpendTrendChart";
import { CategoryChart } from "./charts/CategoryChart";
import { Top5ServicesChart } from "./charts/Top5ServicesChart";

export function Analytics() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Analytics Header */}
      <AnalyticsHeader />
      
      {/* Main Analytics Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Row 1 - Metric Cards */}
          <MetricCards />
          
          {/* Row 2 - Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Spend Trend Chart (2/3 width) */}
            <div className="lg:col-span-2">
              <SpendTrendChart />
            </div>
            
            {/* Right Column - Category and Top Services Charts (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              <CategoryChart />
              <Top5ServicesChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}