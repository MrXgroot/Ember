import React from "react";
import { cn } from "@/shared/integrations/cn";
import { Textarea } from "@/shared/ui";

/**
 * Community Description Input Sub-component
 */
export function DescriptionField({ register, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-content-secondary">
        Description
      </label>
      <Textarea
        {...register("description", {
          maxLength: {
            value: 300,
            message: "Description cannot exceed 300 characters",
          },
        })}
        placeholder="Tell members what your community is all about..."
        rows={3}
        className={cn(
          "w-full p-2.5 bg-app-bg border border-app-border rounded-app-sm text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary/80 transition-colors resize-none",
          error && "border-red-500/80 focus:border-red-500",
        )}
      />
      {error && (
        <span className="text-[11px] font-medium text-red-400">
          {error.message}
        </span>
      )}
    </div>
  );
}
