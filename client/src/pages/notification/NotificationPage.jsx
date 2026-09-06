import React, { useMemo, useState } from "react";
import {
  Bell,
  MessageSquare,
  ArrowBigUp,
  UserPlus,
  Sparkles,
  CheckCheck,
  Inbox,
} from "lucide-react";

import { cn } from "@/shared/integrations/cn";
import { useNotifications } from "@/features/notification/hooks";

export function NotificationsPage({ className }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, isLoading, isError, error } = useNotifications();

  const notifications = data?.notifications ?? [];
  console.log("📋 PAGE NOTIFICATIONS:", notifications);

  const filterTabs = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "unread",
      label: "Unread",
    },
    {
      id: "comments",
      label: "Comments",
    },
    {
      id: "upvotes",
      label: "Upvotes",
    },
  ];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      switch (activeFilter) {
        case "unread":
          return !notification.readAt;

        case "comments":
          return (
            notification.type === "COMMENT" || notification.type === "REPLY"
          );

        case "upvotes":
          return notification.type === "VOTE";

        default:
          return true;
      }
    });
  }, [notifications, activeFilter]);

  const unreadCount = notifications.filter(
    (notification) => !notification.readAt,
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "VOTE":
        return <ArrowBigUp className="h-4 w-4 text-orange-400 stroke-[2.5]" />;

      case "COMMENT":
      case "REPLY":
        return (
          <MessageSquare className="h-4 w-4 text-brand-primary stroke-[2.5]" />
        );

      case "MENTION":
        return <UserPlus className="h-4 w-4 text-cyan-400 stroke-[2.5]" />;

      case "MESSAGE":
        return <MessageSquare className="h-4 w-4 text-blue-400 stroke-[2.5]" />;

      default:
        return <Sparkles className="h-4 w-4 text-brand-primary stroke-[2.5]" />;
    }
  };

  const getActorName = (actor) => {
    if (!actor) return "Ember";

    if (typeof actor === "string") {
      return "Someone";
    }

    return actor.displayName || actor.username || "Ember";
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
          className,
        )}
      >
        <div className="rounded-2xl border border-app-border bg-app-surface/50 p-10 text-center">
          <Bell className="mx-auto mb-3 h-6 w-6 text-content-muted animate-pulse" />

          <p className="text-sm text-content-secondary">
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
          className,
        )}
      >
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
          <Bell className="mx-auto mb-3 h-6 w-6 text-red-400" />

          <p className="text-sm text-red-400">
            {error?.message || "Failed to load notifications."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
        className,
      )}
    >
      {/* HEADER */}
      <header className="mb-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-app-border bg-app-surface shadow-surface-sm">
              <Bell className="h-5 w-5 text-brand-primary" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-content-primary">
                  Notifications
                </h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-content-secondary">
                Stay up to date with your activity on Ember.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="hidden sm:flex shrink-0 items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-xs font-medium text-content-secondary transition-colors hover:bg-app-bg hover:text-content-primary"
          >
            <CheckCheck className="h-4 w-4 text-brand-primary" />
            Mark all read
          </button>
        </div>

        {/* MOBILE MARK READ */}
        <button
          type="button"
          className="mt-4 flex sm:hidden items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-xs font-medium text-content-secondary transition-colors hover:text-content-primary"
        >
          <CheckCheck className="h-4 w-4 text-brand-primary" />
          Mark all read
        </button>
      </header>

      {/* FILTER BAR */}
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-app-border pb-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-brand-light text-brand-primary"
                    : "text-content-secondary hover:bg-app-surface hover:text-content-primary",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="hidden sm:block shrink-0 text-[11px] text-content-muted">
          {filteredNotifications.length}{" "}
          {filteredNotifications.length === 1
            ? "notification"
            : "notifications"}
        </span>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-app-border bg-app-surface/30 px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-app-border bg-app-surface">
              <Inbox className="h-5 w-5 text-content-muted" />
            </div>

            <h3 className="text-sm font-semibold text-content-primary">
              All caught up
            </h3>

            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-content-secondary">
              You don't have any notifications in this section.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item, index) => {
            const actorName = getActorName(item.actor);
            const isRead = Boolean(item.readAt);

            /*
             * Realtime notifications currently don't come from MongoDB,
             * so they may not have an _id yet.
             */
            const notificationKey =
              item._id ||
              `${item.type}-${item.entity?.id || "none"}-${
                item.actor?._id || item.actor || "unknown"
              }-${item.createdAt || index}`;

            return (
              <article
                key={notificationKey}
                className={cn(
                  "group relative flex items-start gap-3.5 rounded-xl border p-4 transition-all",
                  isRead
                    ? "border-app-border/60 bg-app-surface/30"
                    : "border-app-border bg-app-surface shadow-surface-sm",
                  "hover:border-app-border hover:bg-app-surface",
                )}
              >
                {/* UNREAD INDICATOR */}
                {!isRead && (
                  <span className="absolute left-0 top-4 h-8 w-0.5 rounded-r-full bg-brand-primary" />
                )}

                {/* AVATAR */}
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-app-border bg-app-bg text-xs font-bold text-content-primary">
                    {actorName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-app-border bg-app-surface shadow-surface-sm">
                    {getNotificationIcon(item.type)}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-sm leading-5">
                    {item.actor && (
                      <span className="font-semibold text-content-primary">
                        {actorName}
                      </span>
                    )}

                    <span
                      className={cn(
                        isRead
                          ? "text-content-secondary"
                          : "text-content-primary",
                      )}
                    >
                      {item.message || "sent you a notification"}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-content-muted">
                    {item.createdAt && (
                      <time dateTime={item.createdAt}>
                        {new Date(item.createdAt).toLocaleString()}
                      </time>
                    )}

                    {item.entity?.type && (
                      <>
                        <span>•</span>

                        <span className="uppercase tracking-wide">
                          {item.entity.type}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* UNREAD DOT */}
                {!isRead && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
