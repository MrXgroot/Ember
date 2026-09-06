import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../api";
import { notificationKeys } from "../queryKeys";

export function useNotifications(params = {}) {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => getNotifications(params),
  });
}
