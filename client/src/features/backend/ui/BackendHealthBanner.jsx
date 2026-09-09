import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useBackendHealth } from "../hooks/useBackendHealth";

export function BackendStatusBanner() {
  const { isLoading, isError } = useBackendHealth();

  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowBanner(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (dismissed || (!showBanner && !isError)) {
    return null;
  }

  return (
    <div className="w-full border-b border-yellow-300/50 bg-yellow-400/15">
      <div className="flex items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <Loader2 className="size-4 shrink-0 animate-spin text-yellow-600" />

          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Server may take up to 30 seconds to respond. Please stand by.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="
            shrink-0
            p-1
            rounded-app-md
            text-yellow-700
            hover:text-yellow-900
            hover:bg-yellow-400/20
            transition-colors
          "
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
