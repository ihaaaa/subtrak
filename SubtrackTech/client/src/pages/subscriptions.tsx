import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import SubscriptionModal from "@/components/modals/subscription-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Subscription } from "@shared/schema";
import type { ApiSubscription } from "@/lib/queryClient";

export default function Subscriptions() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery<ApiSubscription[]>({
    queryKey: ["/api/subscriptions"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setSubscriptionModalOpen(true);
  };

  const handleCloseModal = () => {
    setSubscriptionModalOpen(false);
    setEditingSubscription(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Subscriptions</h1>
              <p className="text-muted-foreground">Manage all your subscriptions</p>
            </div>
            <Button 
              onClick={() => setSubscriptionModalOpen(true)}
              data-testid="button-add-subscription"
            >
              Add Subscription
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {subscriptionsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : !subscriptions?.length ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No subscriptions found</p>
                  <Button 
                    onClick={() => setSubscriptionModalOpen(true)}
                    data-testid="button-add-first-subscription"
                  >
                    Add Your First Subscription
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subscriptions.map((subscription: ApiSubscription) => (
                    <Card key={subscription.id} className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {subscription.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground" data-testid={`text-subscription-name-${subscription.id}`}>
                                {subscription.name}
                              </h3>
                              <p className="text-xs text-muted-foreground" data-testid={`text-category-${subscription.id}`}>
                                {subscription.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(subscription)}
                              data-testid={`button-edit-${subscription.id}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost:</span>
                            <span className="font-medium" data-testid={`text-cost-${subscription.id}`}>
                              ₹{subscription.cost}/{subscription.frequency}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next billing:</span>
                            <span data-testid={`text-billing-date-${subscription.id}`}>
                              {new Date(subscription.billingDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status:</span>
                            <span 
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                subscription.status === 'active' 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-muted/10 text-muted-foreground'
                              }`}
                              data-testid={`text-status-${subscription.id}`}
                            >
                              <span className={`status-dot ${subscription.status === 'active' ? 'status-active' : 'status-inactive'}`}></span>
                              {subscription.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      <SubscriptionModal 
        isOpen={subscriptionModalOpen}
        onClose={handleCloseModal}
        subscription={editingSubscription}
      />
    </div>
  );
}
