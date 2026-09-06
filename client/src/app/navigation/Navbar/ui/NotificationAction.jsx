import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useHasUnreadNotifications } from "@/features/notification/hooks/useHasUnreadNotifications";

export function NotificationAction() {
  const hasUnread = useHasUnreadNotifications();

  return (
    <Link
      to="/notifications"
      aria-label="Notifications"
      className="
        relative
        flex items-center justify-center
        size-8 sm:size-9
        rounded-app-md
        text-content-secondary
        hover:text-content-primary
        hover:bg-app-bg
        transition-colors
      "
    >
      <Bell className="size-4" />

      {hasUnread && (
        <span
          className="
            absolute top-1.5 right-1.5
            size-2
            rounded-full
            bg-brand-primary
            ring-2 ring-app-surface
          "
        />
      )}
    </Link>
  );
}
