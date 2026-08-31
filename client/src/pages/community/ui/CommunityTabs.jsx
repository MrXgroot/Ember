import React from "react";
import { Sparkles, FileText, Info } from "lucide-react";

export function CommunityTabs({ activeTab, onChange }) {
  const tabs = [
    { id: "feed", label: "Feed", icon: Sparkles },
    { id: "about", label: "About", icon: Info, mobileOnly: true },
    { id: "rules", label: "Rules", icon: FileText },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-app-border mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              tab.mobileOnly ? "flex md:hidden" : "flex"
            } ${
              isActive
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-content-muted hover:text-content-primary"
            }`}
          >
            <Icon className="size-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
