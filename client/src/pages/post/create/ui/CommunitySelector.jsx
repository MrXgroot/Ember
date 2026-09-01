import React from "react";
import { cn } from "@/shared/integrations/cn";

export function CommunitySelector({
  value,
  onChange,
  communities = [],
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-semibold text-content-muted uppercase tracking-wider">
        Post to
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-64 rounded-app-md bg-app-surface/50 border border-app-border px-3 py-2 text-sm text-content-primary focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
      >
        <option value="">My Profile (No Community)</option>
        {communities.map((c) => (
          <option key={c._id} value={c._id}>
            c/{c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
