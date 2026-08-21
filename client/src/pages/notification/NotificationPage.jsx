import React, { useState } from "react";
import {
  Bell,
  MessageSquare,
  ArrowBigUp,
  UserPlus,
  Sparkles,
  CheckCheck,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function NotificationsPage({ className }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "upvote",
      actor: "alex_dev",
      actorAvatar: null,
      target: "How to structure Tailwind v4 design tokens in production?",
      community: "r/reactjs",
      timestamp: "5m ago",
      isRead: false,
    },
    {
      id: "2",
      type: "comment",
      actor: "sarah_k",
      actorAvatar: null,
      target: "Building modern community interfaces on ember.",
      body: "This design looks incredibly clean! Are you using standard flex layouts for the feed?",
      timestamp: "2h ago",
      isRead: false,
    },
    {
      id: "3",
      type: "mention",
      actor: "marcus_ui",
      actorAvatar: null,
      target: "Weekly Architecture Breakdown",
      body: "Check out the token layout @sukesh_acharya implemented here.",
      community: "r/webdev",
      timestamp: "1d ago",
      isRead: true,
    },
    {
      id: "4",
      type: "welcome",
      actor: "ember_team",
      actorAvatar: null,
      target: "Welcome to ember!",
      body: "Start exploring communities, customize your profile, or spark your first discussion.",
      timestamp: "3d ago",
      isRead: true,
    },
  ]);

  const filterTabs = [
    { id: "all", label: "All Activity" },
    { id: "unread", label: "Unread" },
    { id: "comments", label: "Comments & Replies" },
    { id: "upvotes", label: "Upvotes" },
  ];

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Filter criteria logic
  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.isRead;
    if (activeFilter === "comments")
      return item.type === "comment" || item.type === "mention";
    if (activeFilter === "upvotes") return item.type === "upvote";
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "upvote":
        return (
          <ArrowBigUp className="w-3.5 h-3.5 text-orange-400 stroke-[2.5]" />
        );
      case "comment":
        return (
          <MessageSquare className="w-3.5 h-3.5 text-brand-primary stroke-[2.5]" />
        );
      case "mention":
        return <UserPlus className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />;
      default:
        return (
          <Sparkles className="w-3.5 h-3.5 text-brand-primary stroke-[2.5]" />
        );
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 pb-12", className)}>
      {/* ─── PAGE HEADER & ACTIONS ─── */}
      <div className="flex items-center justify-between border-b border-app-border pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight text-content-primary">
            Notifications
          </h1>
          <p className="text-xs text-content-secondary">
            Stay updated with discussions, upvotes, and mentions.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-app-md text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-surface transition-colors select-none"
        >
          <CheckCheck className="w-3.5 h-3.5 text-brand-primary" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* ─── CAPSULE FILTER BAR ─── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-app-border/40 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-app-md text-xs font-medium transition-all duration-150 whitespace-nowrap select-none",
                isActive
                  ? "bg-brand-light text-brand-primary font-semibold shadow-surface-sm"
                  : "text-content-secondary hover:text-content-primary hover:bg-app-surface",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── NOTIFICATION FEED STREAM ─── */}
      <div className="flex flex-col gap-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-app-surface/40 border border-dashed border-app-border rounded-app-lg">
            <div className="w-12 h-12 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-content-muted mb-3">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-content-primary">
              All caught up!
            </h3>
            <p className="text-xs text-content-secondary mt-1">
              No notifications found in this stream.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group relative p-4 rounded-app-lg border transition-all duration-150 flex items-start gap-3.5",
                item.isRead
                  ? "bg-app-surface/40 border-app-border/60 text-content-secondary"
                  : "bg-app-surface border-app-border shadow-surface-sm text-content-primary",
              )}
            >
              {/* Left: Avatar with Status Badge Overlay */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-app-bg border border-app-border flex items-center justify-center text-xs font-bold text-content-primary">
                  {item.actor.slice(0, 2).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-app-surface border border-app-border flex items-center justify-center shadow-surface-sm">
                  {getNotificationIcon(item.type)}
                </div>
              </div>

              {/* Center: Main Notification Body */}
              <div className="flex-1 flex flex-col gap-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5 flex-wrap text-xs leading-normal">
                  <span className="font-semibold text-content-primary hover:underline cursor-pointer">
                    u/{item.actor}
                  </span>

                  {item.type === "upvote" && (
                    <span className="text-content-secondary">
                      upvoted your post in{" "}
                      <span className="font-medium text-content-primary">
                        {item.community}
                      </span>
                    </span>
                  )}
                  {item.type === "comment" && (
                    <span className="text-content-secondary">
                      replied to your post
                    </span>
                  )}
                  {item.type === "mention" && (
                    <span className="text-content-secondary">
                      mentioned you in a discussion
                    </span>
                  )}
                  {item.type === "welcome" && (
                    <span className="text-content-secondary">
                      sent you an update
                    </span>
                  )}

                  <span className="text-content-muted">•</span>
                  <span className="text-[11px] text-content-muted">
                    {item.timestamp}
                  </span>
                </div>

                {/* Target Content Snippet */}
                <div className="text-xs font-medium text-content-primary truncate">
                  "{item.target}"
                </div>

                {/* Sub-body (if a reply exists) */}
                {item.body && (
                  <p className="text-xs text-content-secondary mt-1 bg-app-bg/60 p-2.5 rounded-app-md border border-app-border/40 leading-relaxed">
                    {item.body}
                  </p>
                )}
              </div>

              {/* Right: Unread Indicator & Actions */}
              <div className="flex items-center gap-2 self-center shrink-0">
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                )}

                <button
                  onClick={() => deleteNotification(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full text-content-muted hover:text-red-400 hover:bg-app-bg transition-all"
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
