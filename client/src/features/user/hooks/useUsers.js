import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
}
