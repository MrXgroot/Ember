import React from "react";
import { FileText, Users, User, LayoutGrid } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

const TABS = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "posts", label: "Posts", icon: FileText },
  { id: "communities", label: "Communities", icon: Users },
  { id: "people", label: "People", icon: User },
];

export function SearchTabs({ activeTab, onChange, className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-app-border/40 scrollbar-none",
        className,
      )}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-app-md text-xs font-medium transition-all duration-150 whitespace-nowrap select-none",
              isActive
                ? "bg-brand-light text-brand-primary font-semibold shadow-surface-sm"
                : "text-content-secondary hover:text-content-primary hover:bg-app-surface",
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
