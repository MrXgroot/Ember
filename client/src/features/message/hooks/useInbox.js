import { useQuery } from "@tanstack/react-query";

import { getInbox } from "../api/getInbox";
import { messageKeys } from "../queryKeys";

export function useInbox(queryOptions = {}) {
  return useQuery({
    queryKey: messageKeys.inbox(),

    queryFn: getInbox,

    ...queryOptions,
  });
}
