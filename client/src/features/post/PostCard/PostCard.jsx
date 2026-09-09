import React from "react";
import { cn } from "@/shared/integrations/cn";
import { PostHeader, PostContent, PostMedia, PostActions } from "./ui";

export function PostCard({
  post,
  onUpvote,
  onDownvote,
  onToggleSave,
  className,
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-app-lg bg-app-surface/50 border border-app-border",
        "hover:border-app-border-hover transition-all duration-200 overflow-hidden",
        className,
      )}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <PostHeader
          user={post.user}
          community={post.community}
          createdAt={post.createdAt}
          isSaved={post.viewer?.isSaved}
          onToggleSave={onToggleSave}
        />

        <PostContent
          postId={post._id}
          title={post.title}
          description={post.description}
        />

        <PostMedia url={post.media?.url} title={post.title} />

        <PostActions
          postId={post._id}
          title={post.title}
          score={post.metrics?.score ?? 0}
          comments={post.metrics?.comments ?? 0}
          currentVote={post.viewer?.vote ?? 0}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
      </div>
    </article>
  );
}
