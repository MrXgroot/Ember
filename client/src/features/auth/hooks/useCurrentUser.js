import { useQuery } from "@tanstack/react-query";

import { getCurrentUser, authKeys } from "../api";

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
  });
}
