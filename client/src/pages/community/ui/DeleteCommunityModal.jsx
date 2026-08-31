import React, { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

export function DeleteCommunityModal({
  open,
  community,
  isPending,
  onCancel,
  onConfirm,
}) {
  const [confirmInput, setConfirmInput] = useState("");

  if (!open) return null;

  const name = community?.name || "Community";

  const handleClose = () => {
    setConfirmInput("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-app-surface border border-rose-500/30 p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-rose-500">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="size-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-content-primary">
              Delete Community
            </h3>
            <p className="text-xs text-rose-500 font-medium">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-sm text-content-secondary leading-relaxed">
          This will permanently delete{" "}
          <strong className="text-content-primary">{name}</strong>, along with
          all associated posts, discussions, and member lists.
        </p>

        <div className="space-y-1.5 pt-2">
          <label className="text-xs text-content-muted font-medium">
            To confirm, type{" "}
            <span className="font-bold text-content-primary">"{name}"</span>{" "}
            below:
          </label>
          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder={name}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-app-border bg-app-bg text-content-primary placeholder:text-content-muted/50 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-content-muted hover:text-content-primary hover:bg-app-bg rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={confirmInput !== name || isPending}
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            <span>Permanently Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
