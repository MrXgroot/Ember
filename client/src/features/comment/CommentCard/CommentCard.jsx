import React, { useState } from "react";
import { ArrowBigUp, ArrowBigDown, CornerDownRight } from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { Textarea, Button } from "@/shared/ui";

export function CommentCard({ comment, className }) {
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(comment?.replies ?? []);

  const author =
    comment?.user?.username ?? comment?.user?.displayName ?? "anonymous";
  const body = comment?.body ?? comment?.content ?? "";
  const score = comment?.metrics?.score ?? 0;
  const timeAgo = comment?.createdAt ?? "just now";

  const handleAddReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      _id: `r_${Date.now()}`,
      user: { username: "you", displayName: "Current User" },
      body: replyText.trim(),
      metrics: { score: 1 },
      createdAt: "Just now",
      replies: [],
    };

    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReplyComposer(false);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* ─── MAIN COMMENT CARD BLOCK ─── */}
      <div className="p-4 bg-app-surface/90 border border-app-border/60 rounded-app-lg flex flex-col gap-2.5 shadow-xs hover:border-app-border/90 transition-colors">
        {/* Comment Header Meta Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-content-primary">u/{author}</span>
            <span className="text-content-muted">•</span>
            <span className="text-content-muted font-normal">{timeAgo}</span>
          </div>
        </div>

        {/* Core Markdown/Text Content Area */}
        <p className="text-sm text-content-secondary leading-relaxed whitespace-pre-line font-normal">
          {body}
        </p>

        {/* Footer Action Bar */}
        <div className="flex items-center gap-3 text-xs text-content-muted mt-1">
          {/* Voting Interactive Panel */}
          <div className="flex items-center bg-app-bg border border-app-border/80 rounded-app-md p-0.5">
            <button
              className="p-1 hover:text-brand-primary rounded transition-colors"
              aria-label="Upvote reply"
            >
              <ArrowBigUp className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold px-1 text-[11px] text-content-primary min-w-[14px] text-center">
              {score}
            </span>
            <button
              className="p-1 hover:text-red-400 rounded transition-colors"
              aria-label="Downvote reply"
            >
              <ArrowBigDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reply Focus Context Toggle */}
          <button
            onClick={() => setShowReplyComposer(!showReplyComposer)}
            className="hover:text-content-primary transition-colors font-medium text-xs flex items-center gap-1 py-1 px-2 rounded-app-sm hover:bg-app-bg"
          >
            Reply
          </button>
        </div>
      </div>

      {/* ─── INLINE NESTED ACTION COMPOSER ─── */}
      {showReplyComposer && (
        <div className="pl-4 md:pl-6 border-l-2 border-brand-primary/40 flex flex-col gap-2 my-1">
          <div className="flex gap-2 items-center bg-app-surface border border-app-border p-2 rounded-app-md">
            <Textarea
              placeholder={`Reply to u/${author}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              className="w-full bg-transparent p-1 text-xs text-content-primary placeholder:text-content-muted focus:outline-none resize-none"
            />
            <Button
              disabled={!replyText.trim()}
              onClick={handleAddReply}
              className="px-3 h-8 text-xs font-semibold bg-zinc-100 text-zinc-950 hover:bg-zinc-200 rounded-app-sm shrink-0 shadow-sm"
            >
              Reply
            </Button>
          </div>
        </div>
      )}

      {/* ─── RECURSIVE REPLIES RENDER PANEL TREE ─── */}
      {replies.length > 0 && (
        <div className="pl-4 md:pl-6 border-l border-app-border/60 flex flex-col gap-3 mt-1 ml-2">
          {replies.map((reply) => (
            <div key={reply._id || reply.id} className="relative w-full">
              <CornerDownRight className="absolute -left-4 md:-left-6 top-3.5 w-3 h-3 text-content-muted/60" />
              {/* <Comment comment={reply} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
