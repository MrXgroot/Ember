import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api";
import { notificationKeys } from "../queryKeys";

export function useHasUnreadNotifications() {
  const { data } = useQuery({
    queryKey: notificationKeys.list({}),
    queryFn: () => getNotifications(),
  });

  const notifications = data?.notifications ?? [];

  return notifications.some((notification) => !notification.readAt);
}
