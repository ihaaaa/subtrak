import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { ApiStats } from "@/lib/queryClient";

export default function SpendingCards() {
  const { data: stats, isLoading } = useQuery<ApiStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-muted rounded-lg mb-4"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Monthly Cost Card */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="text-total-monthly-cost">
            ₹{stats?.totalMonthlyCost || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Total Monthly Cost</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-muted-foreground">+2.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* This Month's Savings Card */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-success mb-2" data-testid="text-monthly-savings">
            ₹{stats?.monthlySavings || 0}
          </h3>
          <p className="text-sm text-muted-foreground">This Month's Savings</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-success">Great progress!</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Subscriptions Card */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1m0-1h1m-1 1H7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="text-active-subscriptions">
            {stats?.activeSubscriptions || 0}
          </h3>
          <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-muted-foreground">2 expiring soon</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
