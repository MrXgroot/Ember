import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CreatePostHeader({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-app-border/40 pb-4",
        className,
      )}
    >
      <h1 className="text-2xl font-bold text-content-primary tracking-tight">
        Create a Post
      </h1>
      <p className="text-xs text-content-muted">
        Share discussions, links, questions, or media with the community.
      </p>
    </div>
  );
}
