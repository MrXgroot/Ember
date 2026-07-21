import React from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function Actions({ onCreate, className }) {
  // Common style scale for our standalone navigation button targets
  const iconButtonClass = cn(
    "p-2 rounded-app-md text-content-secondary transition-all duration-150 relative",
    "hover:text-content-primary hover:bg-app-bg border border-transparent hover:border-app-border",
  );

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {/* Chat Messages */}
      <button className={iconButtonClass} aria-label="Messages">
        <MessageSquare className="w-[18px] h-[18px]" />
      </button>

      {/* Notifications Track */}
      <button className={iconButtonClass} aria-label="Notifications">
        <Bell className="w-[18px] h-[18px]" />
        {/* Glowing Indicator Counter Dot */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-primary ring-2 ring-app-surface" />
      </button>

      {/* High-Contrast Action Create Button Element */}
      <button
        onClick={onCreate}
        className={cn(
          "flex items-center gap-1.5 px-3 h-9 rounded-app-md text-xs font-semibold tracking-wide transition-all duration-150 ml-1 shadow-surface-sm",
          "bg-content-primary text-app-bg hover:opacity-90",
        )}
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span className="hidden sm:inline">Create</span>
      </button>
    </div>
  );
}
