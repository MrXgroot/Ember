import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User as UserIcon,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  CornerDownRight,
  Loader2,
  Send,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { formatTimeAgo } from "@/shared/utils/date";

export function CommentItem({
  comment,
  depth = 0,
  maxDepth = 6,
  onReply,
  isSubmittingReply = false,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const { _id, content, user, createdAt, children = [] } = comment;

  const authorName = user?.displayName || user?.username || "Anonymous";
  const authorHandle = user?.username ? `@${user.username}` : null;
  const timeAgo = formatTimeAgo(createdAt);
  const hasChildren = children && children.length > 0;

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmittingReply) return;

    onReply?.({
      parentId: _id,
      content: replyContent.trim(),
      onSuccess: () => {
        setReplyContent("");
        setIsReplying(false);
      },
    });
  };

  return (
    <div
      className={cn(
        "relative flex flex-col group/comment",
        depth > 0 && "mt-2.5",
      )}
    >
      <div className="flex gap-2.5 items-start">
        {/* Author Avatar */}
        <NavLink
          to={`/u/${user?._id}`}
          className="w-7 h-7 rounded-full bg-app-bg border border-app-border overflow-hidden shrink-0 flex items-center justify-center hover:opacity-85 transition-opacity"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-3.5 h-3.5 text-content-muted" />
          )}
        </NavLink>

        {/* Comment Content Block */}
        <div className="flex-1 min-w-0">
          {/* Comment Header */}
          <div className="flex items-center gap-1.5 text-xs">
            <NavLink
              to={`/u/${user?._id}`}
              className="font-semibold text-content-primary hover:underline truncate"
            >
              {authorName}
            </NavLink>

            {authorHandle && (
              <span className="text-content-muted text-[11px] hidden sm:inline truncate">
                {authorHandle}
              </span>
            )}

            <span className="text-content-muted text-[10px]">•</span>

            <time
              dateTime={createdAt}
              className="text-content-muted text-[11px] shrink-0"
            >
              {timeAgo}
            </time>

            {/* Collapse / Expand Button */}
            {hasChildren && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="ml-auto p-0.5 text-content-muted hover:text-content-primary rounded hover:bg-app-surface transition-colors"
                title={isCollapsed ? "Expand thread" : "Collapse thread"}
              >
                {isCollapsed ? (
                  <span className="flex items-center gap-1 text-[11px] text-orange-500">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>+{children.length} replies</span>
                  </span>
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          {!isCollapsed && (
            <>
              {/* Comment Body */}
              <p className="mt-1 text-sm text-content-secondary leading-relaxed break-words whitespace-pre-line">
                {content}
              </p>

              {/* Action: Reply Trigger */}
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center gap-1.5 text-xs text-content-muted hover:text-content-primary transition-colors py-0.5"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{isReplying ? "Cancel" : "Reply"}</span>
                </button>
              </div>

              {/* Reply Form */}
              {isReplying && (
                <form
                  onSubmit={handleSubmitReply}
                  className="mt-2.5 flex flex-col gap-2 p-2.5 rounded-app-md bg-app-surface/30 border border-app-border"
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-content-muted">
                    <CornerDownRight className="w-3 h-3 text-orange-500" />
                    <span>
                      Replying to{" "}
                      <strong className="text-content-primary">
                        {authorName}
                      </strong>
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full resize-none rounded-app-md bg-app-bg border border-app-border px-2.5 py-1.5 text-xs sm:text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand transition-colors"
                    autoFocus
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="px-2.5 py-1 rounded-app-sm text-xs font-medium text-content-muted hover:text-content-primary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!replyContent.trim() || isSubmittingReply}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-app-sm text-xs font-semibold transition-all",
                        "bg-white text-black hover:bg-neutral-200",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white",
                      )}
                    >
                      {isSubmittingReply ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Send className="w-3 h-3" />
                      )}
                      <span>Reply</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* Recursive Children Sub-thread */}
      {!isCollapsed && hasChildren && (
        <div
          className={cn(
            "relative flex flex-col",
            depth < maxDepth
              ? "pl-3 sm:pl-4 ml-3.5 sm:ml-4 border-l border-app-border/70 hover:border-app-border-hover transition-colors"
              : "pl-1",
          )}
        >
          {children.map((child) => (
            <CommentItem
              key={child._id}
              comment={child}
              depth={depth + 1}
              maxDepth={maxDepth}
              onReply={onReply}
              isSubmittingReply={isSubmittingReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
