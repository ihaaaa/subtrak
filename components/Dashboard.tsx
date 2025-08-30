import { Header } from "./Header";
import { SpendingOverview } from "./SpendingOverview";
import { SubscriptionsTable } from "./SubscriptionsTable";
import { AIRecommendations } from "./AIRecommendations";
import { FloatingActionButtons } from "./FloatingActionButtons";

export function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Spending Overview Cards */}
        <SpendingOverview />
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Subscriptions Table */}
          <div className="lg:col-span-2">
            <SubscriptionsTable />
          </div>
          
          {/* Right Column - AI Recommendations */}
          <div className="lg:col-span-1">
            <AIRecommendations />
          </div>
        </div>
      </main>
      
      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </div>
  );
}