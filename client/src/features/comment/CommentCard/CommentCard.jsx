import React from "react";
import { cn } from "@/shared/integrations/cn";

import { useCommentController } from "./controller";
import {
  CommentHeader,
  CommentBody,
  CommentActions,
  ReplyBranch,
  ReplyList,
} from "./ui";
import { CommentComposer } from "../CommentComposer";
export function CommentCard({ comment, postId, className }) {
  const controller = useCommentController({
    comment,
    postId,
  });
  const { data, ui, actions, reply } = controller;
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex flex-col gap-2.5 rounded-app-lg border border-app-border/60 bg-app-surface/90 p-4 shadow-xs transition-colors hover:border-app-border/90">
        <CommentHeader author={data.author} timeAgo={data.timeAgo} />

        <CommentBody body={data.body} />

        <CommentActions
          score={data.score}
          onReply={actions.toggleReplyComposer}
        />
      </div>

      {ui.showReplyComposer && <CommentComposer controller={reply} />}

      {data.replies.length > 0 && (
        <ReplyList>
          {data.replies.map((replyComment) => (
            <ReplyBranch
              key={replyComment._id}
              comment={replyComment}
              postId={postId}
            />
          ))}
        </ReplyList>
      )}
    </div>
  );
}
