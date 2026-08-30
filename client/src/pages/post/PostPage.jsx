import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  User as UserIcon,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

import PageLayout from "@/app/layouts/page/PageLayout";
import { usePost } from "@/features/post/hooks/useSinglePost";
import { useVote } from "@/features/post/hooks";
import { useCreateComment } from "@/features/comment/hooks";
import { useAuth, useAuthGuard } from "@/app/auth";
import { cn } from "@/shared/integrations/cn";
import { formatTimeAgo } from "@/shared/utils/date";

// -------------------------------------------------------------
// 1. Post Card
// -------------------------------------------------------------
export function PostCard({ post, onUpvote, onDownvote, isSinglePage = false }) {
  const {
    _id,
    title,
    description,
    media,
    metrics = { score: 0, comments: 0 },
    user,
    community,
    createdAt,
    userVote,
  } = post;

  const authorName = user?.displayName || user?.username || "Anonymous";
  const timeAgo = formatTimeAgo(createdAt);

  return (
    <article className="flex flex-col rounded-app-lg bg-app-surface/40 border border-app-border overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        {/* Author / Community Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <NavLink
              to={`/u/${user?._id}`}
              className="w-9 h-9 rounded-full bg-app-bg border border-app-border overflow-hidden shrink-0 flex items-center justify-center hover:opacity-85 transition-opacity"
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

            <div className="flex flex-col min-w-0">
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
              </div>
              <time
                dateTime={createdAt}
                className="text-[11px] text-content-muted"
              >
                {timeAgo}
              </time>
            </div>
          </div>

          <button
            type="button"
            className="text-content-muted hover:text-content-primary p-1.5 rounded-app-sm transition-colors"
            title="Save post"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Body */}
        <div className="flex flex-col gap-2">
          {isSinglePage ? (
            <h1 className="text-xl sm:text-2xl font-bold text-content-primary leading-snug">
              {title}
            </h1>
          ) : (
            <NavLink to={`/post/${_id}`}>
              <h2 className="text-lg font-semibold text-content-primary hover:text-brand-hover transition-colors leading-snug">
                {title}
              </h2>
            </NavLink>
          )}

          {description && (
            <p
              className={cn(
                "text-sm text-content-secondary leading-relaxed",
                isSinglePage
                  ? "sm:text-base whitespace-pre-line"
                  : "line-clamp-3",
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Media Container */}
        {media?.url && (
          <div className="rounded-app-md overflow-hidden border border-app-border bg-black/40 flex items-center justify-center">
            <img
              src={media.url}
              alt={title}
              loading="lazy"
              className="w-full h-auto max-h-[650px] object-contain"
            />
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-app-border/40 mt-1">
          <div className="flex items-center gap-2">
            {/* Pill Vote */}
            <div className="flex items-center bg-app-bg border border-app-border rounded-full p-0.5">
              <button
                type="button"
                onClick={onUpvote}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  "text-content-muted hover:text-orange-500 hover:bg-orange-500/10",
                  userVote === 1 && "text-orange-500 bg-orange-500/10",
                )}
                aria-label="Upvote"
              >
                <ArrowBigUp className="w-4 h-4" />
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
                  "text-content-muted hover:text-blue-500 hover:bg-blue-500/10",
                  userVote === -1 && "text-blue-500 bg-blue-500/10",
                )}
                aria-label="Downvote"
              >
                <ArrowBigDown className="w-4 h-4" />
              </button>
            </div>

            {/* Comment Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-app-bg border border-app-border text-xs font-medium text-content-secondary">
              <MessageSquare className="w-3.5 h-3.5 text-content-muted" />
              <span>{metrics.comments || 0} comments</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-content-muted hover:text-content-primary hover:bg-app-surface transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// 2. Comment Composer
// -------------------------------------------------------------
export function CommentComposer({ postId }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const auth = useAuthGuard();
  const createCommentMutation = useCreateComment(postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || createCommentMutation.isPending) return;

    auth.require(() => {
      createCommentMutation.mutate(
        { content: content.trim() },
        {
          onSuccess: () => {
            setContent("");
          },
        },
      );
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-app-lg bg-app-surface/30 border border-app-border p-4">
      <div className="text-xs text-content-muted">
        Comment as{" "}
        <span className="font-semibold text-content-primary">
          {user?.displayName || user?.username || "Guest"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full resize-none rounded-app-md bg-app-bg border border-app-border px-3 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-colors"
        />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={!content.trim() || createCommentMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-app-md bg-brand-primary text-app-bg text-xs font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {createCommentMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 3. PostPage View
// -------------------------------------------------------------
export function PostPage() {
  const { postId } = useParams();
  const { data: post, isLoading, isError, error } = usePost(postId);
  const vote = useVote();

  return (
    <PageLayout>
      <div className="max-w-2xl w-full mx-auto py-6 px-4 flex flex-col gap-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-6 h-6 animate-spin text-content-muted" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex items-center gap-3 p-4 rounded-app-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error?.message || "Failed to load the post."}</span>
          </div>
        )}

        {/* Post Display & Interaction */}
        {!isLoading && !isError && post && (
          <>
            <PostCard
              post={post}
              isSinglePage={true}
              onUpvote={() => vote.mutate({ postId: post._id, type: "upvote" })}
              onDownvote={() =>
                vote.mutate({ postId: post._id, type: "downvote" })
              }
            />

            <CommentComposer postId={post._id} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
