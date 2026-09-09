import { useQuery } from "@tanstack/react-query";
import { checkBackend } from "../api/checkBackend";

export function useBackendHealth() {
  return useQuery({
    queryKey: ["backend", "health"],
    queryFn: checkBackend,

    retry: false,

    refetchInterval: (query) => {
      if (query.state.status === "error") {
        return 5000;
      }

      return false;
    },

    staleTime: 1000 * 60,
  });
}
