import React from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function PostCard({ post, className, onUpvote, onDownvote }) {
  const community = post.community?.name ?? "general";
  const author = post.user?.username ?? post.user?.displayName ?? "anonymous";
  const voteCount = post?.metrics?.score ?? 0;
  const commentCount = post.commentsCount ?? post?.metrics?.comments ?? 0;

  const hasImage = !!post.media?.url;
  const imageUrl = hasImage ? post.media.url : null;

  return (
    <article
      className={cn(
        "p-4 flex flex-col gap-3 transition-all duration-150 ease-out",
        "bg-app-surface border border-app-border rounded-app-lg",
        "hover:border-zinc-700/60 shadow-surface-sm",
        className,
      )}
    >
      {/* ─── META HEADER LAYER ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <a
            href={`/${community}`}
            className="font-semibold text-content-primary hover:underline"
          >
            {community}
          </a>

          <span className="text-content-muted">•</span>

          <span className="text-content-secondary">
            Posted by{" "}
            <a href={`/user/${author}`} className="hover:underline">
              u/{author}
            </a>
          </span>
        </div>

        <button className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <NavLink to={`/posts/${post._id}`} className="flex flex-col gap-3">
        {/* ─── CONTENT TEXT LAYER ─── */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-base font-semibold tracking-wide text-content-primary leading-snug">
            {post.title}
          </h2>

          {post.description && (
            <p className="text-sm font-normal tracking-wide text-content-secondary line-clamp-3 leading-relaxed">
              {post.description}
            </p>
          )}

          {post.body && (
            <p className="text-sm font-normal tracking-wide text-content-secondary line-clamp-3 leading-relaxed">
              {post.body}
            </p>
          )}
        </div>

        {/* ─── DYNAMIC IMAGE MEDIA LAYER ─── */}
        {imageUrl && (
          <div className="relative overflow-hidden border border-app-border rounded-app-sm bg-zinc-950 max-h-[450px] w-full flex items-center justify-center mt-1">
            <img
              src={imageUrl}
              alt={post.title || "Post media"}
              className="w-full h-auto max-h-[450px] object-contain transition-transform duration-200"
              loading="lazy"
            />
          </div>
        )}
      </NavLink>

      {/* ─── ACTION INTERACTIVE STRIP FOOTER ─── */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center bg-app-bg border border-app-border rounded-app-md p-0.5">
          <button
            onClick={onUpvote}
            className="p-1.5 rounded-full text-content-muted hover:text-brand-primary hover:bg-brand-light transition-colors"
            aria-label="Upvote"
          >
            <ArrowBigUp className="w-4 h-4 stroke-[2.5]" />
          </button>

          <span className="text-xs font-bold px-1 min-w-[20px] text-center text-content-primary">
            {voteCount}
          </span>

          <button
            onClick={onDownvote}
            className="p-1.5 rounded-full text-content-muted hover:text-red-400 hover:bg-red-950/30 transition-colors"
            aria-label="Downvote"
          >
            <ArrowBigDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <NavLink
          to={`/posts/${post._id}`}
          className={cn(
            "flex items-center gap-2 h-8 px-3 rounded-app-md text-xs font-medium transition-colors",
            "bg-app-bg border border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface",
          )}
        >
          <MessageSquare className="w-3.5 h-3.5 text-content-muted" />
          <span>{commentCount} Comments</span>
        </NavLink>

        <button
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
            "bg-app-bg border border-app-border text-content-secondary hover:text-content-primary hover:bg-app-surface",
          )}
          aria-label="Share post"
        >
          <Share2 className="w-3.5 h-3.5 text-content-muted" />
        </button>
      </div>
    </article>
  );
}
