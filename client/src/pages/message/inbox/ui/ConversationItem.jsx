import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/integrations/cn";

function formatRelativeTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}

export function ConversationItem({ conversation }) {
  const { user, lastMessage } = conversation;
  const userId = user?._id;
  const displayName = user?.displayName || user?.username || "Member";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <NavLink
      to={`/messages/${userId}`}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 p-3 rounded-app-md border transition-all select-none group",
          isActive
            ? "bg-app-bg border-app-border shadow-surface-sm"
            : "bg-app-surface border-transparent hover:bg-app-bg/60 hover:border-app-border/40",
        )
      }
    >
      {/* Avatar with fallback initials */}
      <div className="relative shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-app-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
            {initials}
          </div>
        )}
      </div>

      {/* Details Track */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-content-primary truncate group-hover:text-brand-primary transition-colors">
            {displayName}
          </span>
          {lastMessage?.createdAt && (
            <span className="text-[10px] text-content-muted shrink-0">
              {formatRelativeTime(lastMessage.createdAt)}
            </span>
          )}
        </div>

        <p className="text-xs text-content-secondary truncate leading-snug">
          {lastMessage?.content || "No messages yet"}
        </p>
      </div>
    </NavLink>
  );
}

export default ConversationItem;
