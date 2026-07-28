import React from "react";
import { cn } from "@/shared/integrations/cn";
import { CommunityActions, CommunityIdentity, CommunityMeta } from "./ui";
export function CommunityHeader({ community, className }) {
  return (
    <header
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-6",
        "p-6 rounded-app-xl border border-app-border bg-app-surface shadow-surface-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-4 min-w-0">
        <CommunityIdentity community={community} />
        <CommunityMeta community={community} />
      </div>

      <CommunityActions community={community} />
    </header>
  );
}
