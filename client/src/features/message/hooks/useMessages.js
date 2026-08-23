import { useQuery } from "@tanstack/react-query";

import { getMessages } from "../api/getMessages";
import { messageKeys } from "../queryKeys";

export function useMessages(userId, params = {}, queryOptions = {}) {
  return useQuery({
    queryKey: messageKeys.conversation(userId),

    queryFn: () => getMessages(userId, params),

    enabled: Boolean(userId),

    ...queryOptions,
  });
}
