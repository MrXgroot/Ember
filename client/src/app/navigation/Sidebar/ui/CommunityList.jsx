import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export const CommunityItem = ({ name, href, isActive, className }) => {
  const displayLetters = name.replace(/^r\//, "").slice(0, 2).toUpperCase();

  return (
    <a
      href={href}
      className={cn(
        // Becomes a perfect, pill-shaped capsule overlay on hover
        "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm transition-all duration-150 ease-out",
        "text-content-secondary hover:text-content-primary hover:bg-app-surface",
        isActive && "bg-brand-light text-brand-primary font-medium",
        className,
      )}
    >
      {/* Mini Avatar: Standardized round geometry */}
      <div
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 transition-colors duration-150",
          "bg-app-surface text-content-muted border border-app-border",
          "group-hover:bg-brand-light group-hover:text-brand-primary group-hover:border-transparent",
          isActive && "bg-brand-primary text-app-bg border-transparent",
        )}
      >
        {displayLetters}
      </div>

      <span className="truncate flex-1 font-normal tracking-wide text-zinc-300 group-hover:text-zinc-100">
        {name}
      </span>
    </a>
  );
};

export const CommunityList = ({ className }) => {
  const communityList = [
    { name: "r/reactjs", href: "/r/reactjs" },
    { name: "r/tailwindcss", href: "/r/tailwindcss" },
    { name: "r/webdev", href: "/r/webdev" },
  ];

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="px-3 text-[10px] font-semibold tracking-widest text-content-muted/70 uppercase">
        Communities
      </div>

      <div className="flex flex-col gap-0.5">
        {communityList.map((community) => (
          <CommunityItem
            key={community.name}
            name={community.name}
            href={community.href}
          />
        ))}

        {/* Explore Button: Completely unified text hierarchy and layout architecture */}
        <button
          className={cn(
            "group flex items-center gap-3 px-3 py-2 rounded-app-md text-sm text-left transition-all duration-150 ease-out",
            "text-content-secondary hover:text-content-primary hover:bg-app-surface",
          )}
        >
          {/* FIX: Swapped out rounded-md to rounded-full to match the track elements perfectly */}
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-app-surface text-content-muted border border-app-border group-hover:bg-brand-light group-hover:text-brand-primary group-hover:border-transparent transition-colors shrink-0">
            <Plus className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span className="text-sm font-normal tracking-wide text-zinc-300 group-hover:text-zinc-100">
            Explore All
          </span>
        </button>
      </div>
    </div>
  );
};
