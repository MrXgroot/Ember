import { cn } from "@/shared/integrations/cn";

import { PostHeader, PostBody, PostMedia, PostActions } from "./ui";

export function PostDetails({ controller, className }) {
  const { data, actions } = controller;

  return (
    <article className={cn("flex w-full flex-col gap-4", className)}>
      <PostHeader post={data.post} />

      <PostBody post={data.post} />

      <PostMedia post={data.post} />

      <PostActions
        post={data.post}
        onUpvote={actions.upvote}
        onDownvote={actions.downvote}
      />
    </article>
  );
}
