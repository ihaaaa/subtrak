import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, type ApiSubscription } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SubscriptionModal from "@/components/modals/subscription-modal";
import type { Subscription } from "@shared/schema";

export default function SubscriptionsTable() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const { data: subscriptions, isLoading } = useQuery<ApiSubscription[]>({
    queryKey: ["/api/subscriptions"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/subscriptions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setSubscriptionModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setSubscriptionModalOpen(false);
    setEditingSubscription(null);
  };

  const getServiceIcon = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = {
      'N': 'bg-red-600',
      'A': 'bg-orange-600', 
      'S': 'bg-green-600',
      'Z': 'bg-red-800',
      'D': 'bg-blue-600',
    };
    
    return (
      <div className={`w-8 h-8 ${colors[firstLetter as keyof typeof colors] || 'bg-primary'} rounded-lg flex items-center justify-center mr-3`}>
        <span className="text-xs font-bold text-white">
          {name === 'Disney+ Hotstar' ? 'D+' : firstLetter}
        </span>
      </div>
    );
  };

  const getStatusInfo = (status: string) => {
    const statusConfig = {
      active: { class: 'bg-success/10 text-success', dot: 'status-active' },
      inactive: { class: 'bg-muted/10 text-muted-foreground', dot: 'status-inactive' },
      expired: { class: 'bg-destructive/10 text-destructive', dot: 'status-expired' },
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/6"></div>
                </div>
                <div className="h-4 bg-muted rounded w-1/8"></div>
                <div className="h-4 bg-muted rounded w-1/8"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Subscriptions</CardTitle>
          <Button 
            onClick={() => setSubscriptionModalOpen(true)}
            data-testid="button-add-subscription-table"
          >
            Add Subscription
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {!subscriptions?.length ? (
            <div className="text-center py-8 px-6">
              <p className="text-muted-foreground mb-4">No subscriptions found</p>
              <Button 
                onClick={() => setSubscriptionModalOpen(true)}
                data-testid="button-add-first-subscription-table"
              >
                Add Your First Subscription
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Next Billing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {subscriptions.map((subscription: ApiSubscription) => {
                    const statusInfo = getStatusInfo(subscription.status);
                    
                    return (
                      <tr key={subscription.id} className="hover:bg-secondary/10 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getServiceIcon(subscription.name)}
                            <div>
                              <div className="text-sm font-medium text-foreground" data-testid={`text-service-name-${subscription.id}`}>
                                {subscription.name}
                              </div>
                              <div className="text-xs text-muted-foreground" data-testid={`text-category-${subscription.id}`}>
                                {subscription.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground" data-testid={`text-cost-${subscription.id}`}>
                          ₹{subscription.cost}/{subscription.frequency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground" data-testid={`text-billing-date-${subscription.id}`}>
                          {new Date(subscription.billingDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
                            <span className={`status-dot ${statusInfo.dot}`}></span>
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
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
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(subscription.id)}
                              disabled={deleteMutation.isPending}
                              data-testid={`button-delete-${subscription.id}`}
                            >
                              <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <SubscriptionModal 
        isOpen={subscriptionModalOpen}
        onClose={handleCloseModal}
        subscription={editingSubscription}
      />
    </>
  );
}
