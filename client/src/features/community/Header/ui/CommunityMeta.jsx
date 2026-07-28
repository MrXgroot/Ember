import React from "react";
import { Users, Calendar, Radio } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CommunityMeta({ community, className }) {
  const memberCount =
    community?.metrics?.membersCount ?? community?.membersCount ?? 0;
  const onlineCount = community?.metrics?.onlineCount;
  const createdAt = community?.createdAt
    ? new Date(community.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 text-xs font-medium text-content-muted pt-1",
        className,
      )}
    >
      {/* Total Members */}
      <div className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5 text-content-muted" />
        <span className="text-content-primary font-bold">
          {memberCount.toLocaleString()}
        </span>
        <span>members</span>
      </div>

      {/* Online Count */}
      {onlineCount !== undefined && (
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-content-primary font-bold">
            {onlineCount.toLocaleString()}
          </span>
          <span>online</span>
        </div>
      )}

      {/* Created Date */}
      {createdAt && (
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-content-muted" />
          <span>Created {createdAt}</span>
        </div>
      )}
    </div>
  );
}
