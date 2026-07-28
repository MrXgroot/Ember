import React from "react";
import { cn } from "@/shared/integrations/cn";

/**
 * Community Name Input Sub-component
 */
export function NameField({ register, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-content-secondary">
        Community Name <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-content-muted select-none">
          r/
        </span>
        <input
          {...register("name", {
            required: "Community name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 21,
              message: "Name cannot exceed 21 characters",
            },
          })}
          placeholder="community_name"
          className={cn(
            "w-full h-9 pl-7 pr-3 bg-app-bg border border-app-border rounded-app-sm text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary/80 transition-colors",
            error && "border-red-500/80 focus:border-red-500",
          )}
        />
      </div>
      {error && (
        <span className="text-[11px] font-medium text-red-400">
          {error.message}
        </span>
      )}
    </div>
  );
}
