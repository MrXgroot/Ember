import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommunityIdentity({ community, className }) {
  const name = community?.name ?? "community";
  const title = community?.title ?? name;
  const description = community?.description ?? "";
  const avatar = community?.avatar;
  const displayLetters = name.replace(/^r\//, "").slice(0, 2).toUpperCase();

  return (
    <div className={cn("flex items-start gap-4", className)}>
      {/* Community Banner / Avatar */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-app-surface border-2 border-app-border text-base font-bold text-brand-primary shrink-0 overflow-hidden shadow-sm">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{displayLetters}</span>
        )}
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold text-content-primary tracking-tight leading-none">
          {title}
        </h1>
        <span className="text-xs font-semibold text-content-muted">
          r/{name}
        </span>
        {description && (
          <p className="text-sm font-normal text-content-secondary max-w-2xl mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
