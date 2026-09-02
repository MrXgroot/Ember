import React from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { formatTimeAgo } from "@/shared/utils/date";
import { getConvertedWebpUrl } from "../utils/getConvertedWebpUrl";

export function PostCard({
  post,
  onUpvote,
  onDownvote,
  onToggleSave,
  className,
}) {
  const {
    _id,
    title,
    description,
    media,
    metrics = { score: 0, comments: 0 },
    user,
    community,
    createdAt,
    viewer = { vote: 0, isSaved: false }, // Destructured from API payload
  } = post;

  const currentVote = viewer?.vote ?? 0;
  const isSaved = Boolean(viewer?.isSaved);

  const authorName = user?.displayName || user?.username || "Anonymous";
  const authorHandle = user?.username ? `@${user.username}` : null;
  const timeAgo = formatTimeAgo(createdAt);

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-app-lg bg-app-surface/50 border border-app-border",
        "hover:border-app-border-hover transition-all duration-200 overflow-hidden",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* 1. Header: Author / Community / Timestamp */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar */}
            <NavLink
              to={`/u/${user?._id}`}
              className="w-8 h-8 rounded-full bg-app-bg border border-app-border overflow-hidden shrink-0 flex items-center justify-center hover:opacity-85 transition-opacity"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-content-muted" />
              )}
            </NavLink>

            {/* User & Space Meta */}
            <div className="flex items-center gap-1.5 text-xs text-content-muted truncate">
              {community ? (
                <>
                  <NavLink
                    to={`/c/${community.name}`}
                    className="font-semibold text-content-primary hover:text-brand-hover transition-colors truncate"
                  >
                    c/{community.name}
                  </NavLink>
                  <span>•</span>
                </>
              ) : null}

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

          {/* Top Quick Actions (Bookmark / Save) */}
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

        {/* 2. Content: Title & Description */}
        <div className="flex flex-col gap-1.5">
          <NavLink to={`/post/${_id}`}>
            <h2 className="text-base sm:text-lg font-semibold text-content-primary hover:text-brand-hover transition-colors leading-snug">
              {title}
            </h2>
          </NavLink>

          {description && description.trim().length > 0 && (
            <p className="text-sm text-content-secondary leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {/* 3. Media Preview */}
        {media?.url && (
          <div className="mt-1 rounded-app-md overflow-hidden border border-app-border/70 bg-black/40 max-h-[500px] flex items-center justify-center">
            <img
              src={getConvertedWebpUrl(media.url)}
              alt={title || "Post media"}
              loading="lazy"
              className="w-full h-auto max-h-[500px] object-contain cursor-pointer hover:scale-[1.01] transition-transform duration-200"
            />
          </div>
        )}

        {/* 4. Action Bar (Votes, Comments, Share) */}
        <div className="flex items-center justify-between pt-2 border-t border-app-border/40 mt-1">
          <div className="flex items-center gap-2">
            {/* Pill Vote Controls */}
            <div className="flex items-center bg-app-bg border border-app-border rounded-full p-0.5">
              <button
                type="button"
                onClick={onUpvote}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  currentVote === 1
                    ? "text-orange-500 bg-orange-500/10"
                    : "text-content-muted hover:text-orange-500 hover:bg-orange-500/10",
                )}
                aria-label="Upvote"
              >
                <ArrowBigUp
                  className={cn("w-4 h-4", currentVote === 1 && "fill-current")}
                />
              </button>

              <span
                className={cn(
                  "px-1.5 text-xs font-semibold tabular-nums min-w-[1.75rem] text-center",
                  metrics.score > 0 && "text-orange-500",
                  metrics.score < 0 && "text-blue-500",
                  metrics.score === 0 && "text-content-secondary",
                )}
              >
                {metrics.score}
              </span>

              <button
                type="button"
                onClick={onDownvote}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  currentVote === -1
                    ? "text-blue-500 bg-blue-500/10"
                    : "text-content-muted hover:text-blue-500 hover:bg-blue-500/10",
                )}
                aria-label="Downvote"
              >
                <ArrowBigDown
                  className={cn(
                    "w-4 h-4",
                    currentVote === -1 && "fill-current",
                  )}
                />
              </button>
            </div>

            {/* Comment Counter */}
            <NavLink
              to={`/post/${_id}#comments`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-app-bg border border-app-border text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-surface transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-content-muted" />
              <span>{metrics.comments || 0}</span>
            </NavLink>
          </div>

          {/* Share Action */}
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title,
                  url: `${window.location.origin}/post/${_id}`,
                });
              } else {
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${_id}`,
                );
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-content-muted hover:text-content-primary hover:bg-app-surface transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
