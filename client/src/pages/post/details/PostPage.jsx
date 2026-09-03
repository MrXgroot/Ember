import React from "react";
import { useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

import { usePost } from "@/features/post/hooks/useSinglePost";
import { useVote } from "@/features/post/hooks";
import { PostCard } from "@/features/post";

import { CommentComposer } from "./ui/CommentComposer";
import { PostDetailLayout } from "./PostDetailLayout";

import { CommentList } from "@/features/comment/feed";

export function PostPage() {
  const { postId } = useParams();

  const { data: post, isLoading, isError, error } = usePost(postId);

  const vote = useVote();

  return (
    <PostDetailLayout>
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-content-muted">
          <Loader2 className="w-7 h-7 animate-spin text-brand" />
          <span className="text-xs font-medium">Loading discussion...</span>
        </div>
      )}

      {isError && (
        <div className="m-4 sm:m-0 flex items-center gap-3 p-4 rounded-app-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error?.message || "Failed to load the post."}</span>
        </div>
      )}

      {!isLoading && !isError && post && (
        <>
          <div className="w-full">
            <PostCard
              post={post}
              isSinglePage={true}
              className="rounded-none sm:rounded-app-lg border-x-0 sm:border-x border-t-0 sm:border-t shadow-none"
              onUpvote={() =>
                vote.mutate({
                  postId: post._id,
                  type: "upvote",
                })
              }
              onDownvote={() =>
                vote.mutate({
                  postId: post._id,
                  type: "downvote",
                })
              }
            />
          </div>

          <div className="px-3 sm:px-0">
            <CommentComposer postId={post._id} />
          </div>

          <CommentList postId={post._id} />
        </>
      )}
    </PostDetailLayout>
  );
}
