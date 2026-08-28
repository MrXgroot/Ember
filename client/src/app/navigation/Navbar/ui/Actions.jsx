import React from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/integrations/cn";

export function Actions({ isSearching = false, onCreate, className }) {
  const iconBtnClass =
    "flex items-center justify-center size-8 sm:size-9 rounded-app-md text-content-secondary hover:text-content-primary hover:bg-app-bg transition-colors";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Hide secondary links completely if user is actively searching */}
      {!isSearching && (
        <>
          <Link to="/messages" className={cn(iconBtnClass, "hidden lg:flex")}>
            <MessageSquare className="w-4 h-4" />
          </Link>
          <Link
            to="/notifications"
            className={cn(iconBtnClass, "hidden lg:flex relative")}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-primary ring-2 ring-app-surface" />
          </Link>
        </>
      )}

      {/* Primary Create Action */}
      <button
        type="button"
        onClick={onCreate}
        className={cn(
          "flex items-center justify-center rounded-app-md bg-content-primary text-app-bg font-medium transition-all shadow-surface-sm hover:opacity-90 active:scale-95",
          isSearching
            ? "size-8 p-0"
            : "h-8 sm:h-9 px-2.5 sm:px-3 text-xs gap-1.5",
        )}
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        {!isSearching && <span className="hidden sm:inline">Create</span>}
      </button>
    </div>
  );
}
