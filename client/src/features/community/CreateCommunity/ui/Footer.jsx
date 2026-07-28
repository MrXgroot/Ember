import React from "react";
import { Button } from "@/shared/ui";

/**
 * Footer Action Buttons Sub-component
 */
export function Footer({ onCancel, isSubmitDisabled, isPending }) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-app-border pt-3 mt-2">
      <Button
        type="button"
        onClick={onCancel}
        className="px-3 h-8 text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-app-bg rounded-app-sm transition-colors"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        loading={isPending}
        className="px-4 h-8 text-xs font-semibold bg-zinc-100 text-zinc-950 hover:bg-zinc-200 rounded-app-sm disabled:opacity-40 transition-all"
      >
        Create
      </Button>
    </div>
  );
}
