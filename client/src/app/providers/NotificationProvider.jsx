import React from "react";
import { useNotificationSocket } from "@/features/notification/hooks/useNotificationSocket";

export function NotificationProvider({ children }) {
  useNotificationSocket();

  return children;
}
