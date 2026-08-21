import React, { useState } from "react";
import { cn } from "@/shared/integrations/cn";

export function UserResultCard({ user, className }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const avatarText = (user.displayName || user.username || "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "p-3.5 bg-app-surface border border-app-border rounded-app-lg flex items-center justify-between gap-3 transition-colors hover:border-zinc-700/60",
        className,
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary shrink-0">
          {avatarText}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-content-primary truncate">
              {user.displayName || user.username}
            </span>
            <span className="text-[10px] text-content-muted truncate">
              u/{user.username}
            </span>
          </div>
          {user.karma !== undefined && (
            <span className="text-[10px] text-content-muted mt-0.5">
              {user.karma} karma
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsFollowing((prev) => !prev)}
        className={cn(
          "px-3 h-7 rounded-app-md text-xs font-medium border transition-colors shrink-0 select-none",
          isFollowing
            ? "bg-app-bg border-app-border text-content-secondary hover:text-content-primary"
            : "bg-app-bg border-app-border text-content-primary hover:bg-app-surface hover:border-brand-primary/40",
        )}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
