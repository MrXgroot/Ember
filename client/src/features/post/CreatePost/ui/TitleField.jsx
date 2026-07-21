import React from "react";
import { cn } from "@/shared/integrations/cn";

export function TitleField({ value, onChange, className }) {
  return (
    <input
      type="text"
      placeholder="Title"
      maxLength={300}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "w-full px-3 py-2 text-sm font-semibold tracking-wide rounded-xl outline-none transition-all placeholder:text-content-muted text-content-primary",
        "bg-app-bg border border-app-border focus:border-zinc-700/60",
        className,
      )}
    />
  );
}
