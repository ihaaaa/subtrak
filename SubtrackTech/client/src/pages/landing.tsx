import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <span className="text-2xl font-semibold">SubTrak</span>
          </div>
          <CardTitle className="text-2xl mb-2">Manage Your Subscriptions</CardTitle>
          <p className="text-muted-foreground">Track spending, get AI insights, and optimize your subscriptions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span>Track all your subscriptions in one place</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span>Get AI-powered cost saving recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span>Analyze spending patterns and trends</span>
              </div>
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full"
              data-testid="button-login"
            >
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
