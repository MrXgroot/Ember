import React from "react";
import { cn } from "@/shared/integrations/cn";

export function InboxLoading({ className }) {
  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-8.5rem)] flex flex-col bg-app-surface border border-app-border rounded-app-lg overflow-hidden animate-pulse",
        className,
      )}
    >
      <div className="p-4 border-b border-app-border flex flex-col gap-3">
        <div className="h-4 w-24 bg-app-bg rounded-app-md" />
        <div className="h-8 w-full bg-app-bg rounded-app-md" />
      </div>

      <div className="flex-1 p-2 flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-3 rounded-app-md bg-app-bg/40 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-app-bg" />

            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-28 bg-app-bg rounded-app-md" />
              <div className="h-2.5 w-44 bg-app-bg/60 rounded-app-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
