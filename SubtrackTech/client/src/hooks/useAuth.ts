import { useQuery } from "@tanstack/react-query";
import type { ApiUser } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading } = useQuery<ApiUser | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
