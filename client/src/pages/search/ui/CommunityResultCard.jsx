import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommunityResultCard({ community, className }) {
  const [isJoined, setIsJoined] = useState(community.isJoined || false);

  const displayLetters = (community.name || "r/")
    .replace(/^r\//, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "p-4 bg-app-surface border border-app-border rounded-app-lg flex items-center justify-between gap-4 transition-colors hover:border-zinc-700/60",
        className,
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary shrink-0">
          {displayLetters}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <a
              href={`/${community.name}`}
              className="text-xs font-semibold text-content-primary hover:underline truncate"
            >
              {community.name}
            </a>
            {community.members && (
              <span className="text-[10px] text-content-muted shrink-0">
                • {community.members} members
              </span>
            )}
          </div>
          {community.description && (
            <p className="text-xs text-content-secondary truncate max-w-lg mt-0.5">
              {community.description}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsJoined((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 px-4 h-8 rounded-app-md text-xs font-semibold transition-all shrink-0 select-none",
          isJoined
            ? "bg-app-bg border border-app-border text-content-secondary hover:text-red-400 hover:border-red-950/40"
            : "bg-brand-primary text-white hover:bg-brand-hover shadow-surface-sm active:scale-95",
        )}
      >
        {isJoined ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Joined</span>
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Join</span>
          </>
        )}
      </button>
    </div>
  );
}
