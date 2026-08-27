import React from "react";
import { Search } from "lucide-react";

export function InboxHeader({ count = 0, search, onSearchChange }) {
  return (
    <div className="p-4 border-b border-app-border bg-app-surface/90 backdrop-blur-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold tracking-tight text-content-primary">
            Messages
          </h2>
          <span className="text-[11px] px-2 py-0.5 rounded-app-md bg-brand-light text-brand-primary font-semibold">
            {count}
          </span>
        </div>
      </div>

      <div className="relative group">
        <Search className="w-3.5 h-3.5 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search direct messages..."
          className="w-full h-8 pl-8 pr-3 bg-app-bg border border-app-border rounded-app-md text-xs text-content-primary placeholder:text-content-muted focus:border-brand-primary outline-none transition-colors"
        />
      </div>
    </div>
  );
}

export default InboxHeader;
