import React from "react";
import { Users, Calendar } from "lucide-react";

export function CommunityAbout({ community }) {
  const memberCount = community?.memberCount ?? community?.members?.length ?? 1;

  return (
    <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-xs space-y-4">
      <h2 className="text-xs font-bold text-content-muted uppercase tracking-wider">
        About Community
      </h2>
      <p className="text-sm text-content-secondary leading-relaxed">
        {community?.description || "Welcome to the official community space."}
      </p>

      <div className="space-y-3 pt-3 border-t border-app-border text-xs text-content-muted">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="size-4" />
            Members
          </span>
          <span className="font-semibold text-content-primary">
            {memberCount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="size-4" />
            Created
          </span>
          <span className="text-content-primary">
            {new Date(community?.createdAt || Date.now()).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              },
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
