import React from "react";
import { LogOut, Loader2 } from "lucide-react";

export function LeaveCommunityModal({
  open,
  community,
  isPending,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  const name = community?.name || "this community";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-app-surface border border-app-border p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-500">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500">
            <LogOut className="size-6" />
          </div>
          <h3 className="text-lg font-bold text-content-primary">
            Leave Community
          </h3>
        </div>

        <p className="text-sm text-content-secondary leading-relaxed">
          Are you sure you want to leave{" "}
          <strong className="text-content-primary">{name}</strong>? You can
          rejoin at any time.
        </p>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-content-muted hover:text-content-primary hover:bg-app-bg rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 rounded-xl transition-all cursor-pointer"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            <span>Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
}
