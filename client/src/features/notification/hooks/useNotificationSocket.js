import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "@/shared/integrations/socket/socket";
import { notificationKeys } from "../queryKeys";

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNotification = (notification) => {
      console.log("🔔 NEW NOTIFICATION:", notification);

      queryClient.setQueryData(notificationKeys.list({}), (oldData) => {
        console.log("📦 EXACT CACHE:", oldData);

        if (!oldData) {
          console.log("❌ CACHE DOES NOT EXIST");

          return {
            notifications: [notification],
            meta: {
              page: 1,
              limit: 20,
              total: 1,
              pages: 1,
            },
          };
        }

        const updatedData = {
          ...oldData,
          notifications: [notification, ...(oldData.notifications ?? [])],
          meta: {
            ...oldData.meta,
            total: (oldData.meta?.total ?? 0) + 1,
          },
        };

        console.log("✅ UPDATED CACHE:", updatedData);

        return updatedData;
      });
    };

    socket.on("notification:new", handleNotification);

    return () => {
      socket.off("notification:new", handleNotification);
    };
  }, [queryClient]);
}
