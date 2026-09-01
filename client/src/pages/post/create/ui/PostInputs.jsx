import React from "react";
import { cn } from "@/shared/integrations/cn";

export function PostInputs({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* Post Title */}
      <div className="flex flex-col gap-1.5">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title *"
          maxLength={300}
          className="w-full rounded-app-md bg-app-surface/30 border border-app-border px-4 py-3 text-base sm:text-lg font-medium text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-colors"
        />
        <div className="flex justify-end pr-1">
          <span className="text-[11px] text-content-muted">
            {title.length}/300
          </span>
        </div>
      </div>

      {/* Post Description / Body */}
      <div className="flex flex-col gap-1.5">
        <textarea
          rows={6}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Text (optional)..."
          className="w-full resize-y rounded-app-md bg-app-surface/30 border border-app-border px-4 py-3 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-colors leading-relaxed"
        />
      </div>
    </div>
  );
}
