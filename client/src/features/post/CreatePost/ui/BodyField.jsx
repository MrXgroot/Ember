import React from "react";
import { cn } from "@/shared/integrations/cn";
import { ComposerToolbar } from ".";
export function BodyField({ value, onChange, className, onSelectAttachments }) {
  return (
    <div
      className={cn(
        "w-full flex flex-col rounded-xl overflow-hidden bg-app-bg border border-app-border focus-within:border-zinc-700/60 transition-all",
        className,
      )}
    >
      <textarea
        placeholder="Body text (optional)"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={4}
        className="w-full p-3 text-sm font-normal tracking-wide bg-transparent resize-none outline-none placeholder:text-content-muted text-content-secondary leading-relaxed"
      />

      {/* Attachment Utility Bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-t border-app-border/40 bg-app-surface/30">
        <ComposerToolbar onSelectAttachments={onSelectAttachments} />
      </div>
    </div>
  );
}
