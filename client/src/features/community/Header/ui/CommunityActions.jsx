import React, { useState } from "react";
import { Plus, Check, Share2, Bell } from "lucide-react";
import { cn } from "@/shared/integrations/cn";
import { Button } from "@/shared/ui";

export function CommunityActions({ community, onJoinToggle, className }) {
  const [isJoined, setIsJoined] = useState(community?.isJoined ?? false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onJoinToggle?.(!isJoined);
      setIsJoined((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 shrink-0 self-start sm:self-center",
        className,
      )}
    >
      {/* Share Button */}
      <button
        type="button"
        className="p-2 rounded-app-md bg-app-bg border border-app-border text-content-muted hover:text-content-primary hover:bg-app-surface transition-colors"
        title="Share Community"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Join/Joined State Toggle Button */}
      <Button
        onClick={handleToggle}
        loading={loading}
        className={cn(
          "px-4 h-9 text-xs font-semibold rounded-app-md transition-all flex items-center gap-1.5",
          isJoined
            ? "bg-app-bg border border-app-border text-content-primary hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5"
            : "bg-zinc-100 text-zinc-950 hover:bg-zinc-200",
        )}
      >
        {isJoined ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Joined</span>
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5" />
            <span>Join</span>
          </>
        )}
      </Button>
    </div>
  );
}
