import React from "react";
import { NavLink } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { formatTimeAgo } from "@/shared/utils/date";
import { Avatar } from "@/shared/ui/avatar";

export function PostHeader({
  user,
  community,
  createdAt,
  isSaved,
  onToggleSave,
}) {
  const authorName = user?.displayName || user?.username || "Anonymous";

  const authorHandle = user?.username ? `@${user.username}` : null;

  const timeAgo = formatTimeAgo(createdAt);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <NavLink
          to={`/u/${user?._id}`}
          className="shrink-0 hover:opacity-85 transition-opacity"
        >
          <Avatar src={user?.avatar} name={authorName} size="md" />
        </NavLink>

        <div className="flex items-center gap-1.5 text-xs text-content-muted truncate">
          {community && (
            <>
              <NavLink
                to={`/c/${community.name}`}
                className="font-semibold text-content-primary hover:text-brand-hover transition-colors truncate"
              >
                c/{community.name}
              </NavLink>

              <span>•</span>
            </>
          )}

          <NavLink
            to={`/u/${user?._id}`}
            className="font-medium text-content-secondary hover:text-content-primary transition-colors truncate"
          >
            {authorName}
          </NavLink>

          {authorHandle && (
            <span className="hidden sm:inline text-content-muted/60 truncate">
              {authorHandle}
            </span>
          )}

          <span>•</span>

          <time
            dateTime={createdAt}
            className="text-content-muted shrink-0 text-[11px]"
          >
            {timeAgo}
          </time>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleSave}
        className={cn(
          "p-1 rounded-app-sm transition-colors",
          isSaved
            ? "text-brand fill-brand"
            : "text-content-muted hover:text-content-primary",
        )}
        title={isSaved ? "Unsave post" : "Save post"}
        aria-label={isSaved ? "Unsave post" : "Save post"}
      >
        <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
      </button>
    </div>
  );
}
