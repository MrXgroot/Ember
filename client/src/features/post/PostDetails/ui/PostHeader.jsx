import React from "react";
import { MoreHorizontal } from "lucide-react";

export function PostHeader({ post }) {
  const community = post?.community?.name ?? "general";
  const author = post?.user?.username ?? post?.user?.displayName ?? "anonymous";

  return (
    <div className="flex items-center justify-between border-b border-app-border/40 pb-4">
      <div className="flex items-center gap-2.5 text-sm">
        <a
          href={`/${community}`}
          className="font-bold text-content-primary hover:underline"
        >
          {community}
        </a>
        <span className="text-content-muted">•</span>
        <span className="text-content-secondary">
          Posted by{" "}
          <a href={`/user/${author}`} className="hover:underline font-medium">
            u/{author}
          </a>
        </span>
      </div>
      <button className="p-2 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
