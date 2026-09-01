import React from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/integrations/cn";

export function Actions({ isSearching = false, className }) {
  const iconBtnClass =
    "flex items-center justify-center size-8 sm:size-9 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg transition-colors";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {!isSearching && (
        <>
          <Link to="/messages" className={cn(iconBtnClass, "hidden lg:flex")}>
            <MessageSquare className="size-4" />
          </Link>

          <Link
            to="/notifications"
            className={cn(iconBtnClass, "hidden lg:flex relative")}
          >
            <Bell className="size-4" />

            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-primary ring-2 ring-app-surface" />
          </Link>
        </>
      )}

      {!isSearching && (
        <Link
          to="/post/create"
          className={cn(
            "flex items-center justify-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3",
            "rounded-app-md bg-content-primary text-app-bg text-xs font-semibold tracking-wide",
            "shadow-surface-sm hover:opacity-90 active:scale-95 transition-all select-none shrink-0",
          )}
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Create</span>
        </Link>
      )}
    </div>
  );
}
