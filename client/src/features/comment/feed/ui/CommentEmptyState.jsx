import React from "react";
import { MessageSquareDashed } from "lucide-react";

export function CommentEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center rounded-app-lg border border-dashed border-app-border/80 bg-app-surface/20">
      <div className="w-10 h-10 rounded-full bg-app-surface flex items-center justify-center text-content-muted mb-2.5">
        <MessageSquareDashed className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-content-primary">
        No comments yet
      </h3>
      <p className="text-xs text-content-muted max-w-xs mt-0.5">
        Be the first to share your thoughts and join the conversation.
      </p>
    </div>
  );
}
