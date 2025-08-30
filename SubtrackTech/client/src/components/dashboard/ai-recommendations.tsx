import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ApiRecommendation } from "@/lib/queryClient";

export default function AIRecommendations() {
  const { data: recommendations, isLoading } = useQuery<ApiRecommendation[]>({
    queryKey: ["/api/ai/recommendations"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations?.map((rec: any) => (
          <div key={rec.id} className="p-4 bg-secondary/30 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                rec.type === 'cancel' ? 'bg-warning/10' : 'bg-success/10'
              }`}>
                {rec.icon === 'warning' ? (
                  <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                ) : (
                  <span className="text-xs">✨</span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground" data-testid={`text-recommendation-title-${rec.id}`}>
                  {rec.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1" data-testid={`text-recommendation-description-${rec.id}`}>
                  {rec.description}
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-xs text-primary hover:text-primary/80 mt-2 p-0 h-auto font-medium"
                  data-testid={`button-recommendation-action-${rec.id}`}
                >
                  {rec.action === 'review' ? 'Review' : 'Apply'} →
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-secondary/30 rounded-lg border border-border opacity-60">
          <div className="text-center">
            <div className="w-8 h-8 bg-muted/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">More recommendations loading...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
