import React from "react";
import { X, Users } from "lucide-react";

/**
 * Header Sub-component
 */
export function Header({ onClose }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-app-border">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-app-sm bg-brand-light/10 text-brand-primary">
          <Users className="w-4 h-4" />
        </div>
        <h2 className="text-base font-semibold text-content-primary">
          Create a Community
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
