import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users";
import { useAuthStore } from "../store/authStore";

export const USERS_QUERY_KEY = ["users"] as const;

export function useCurrentUser() {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: [...USERS_QUERY_KEY, userId],
    queryFn: () => usersApi.getById(userId!),
    enabled: !!userId,
  });
}

export function useAllUsers() {
  const role = useAuthStore((state) => state.user?.role);

  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersApi.getAll,
    enabled: role === "ADMIN",
  });
}
