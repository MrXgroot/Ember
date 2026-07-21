import { Image } from "lucide-react";

import { cn } from "@/shared/integrations/cn";
import { MediaPicker } from "./MediaPicker";

export function ComposerToolbar({ className, onSelectAttachments }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-1.5 border-t border-app-border/40 bg-app-surface/30",
        className,
      )}
    >
      <MediaPicker onSelect={onSelectAttachments}>
        <button
          type="button"
          className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
          aria-label="Add image"
        >
          <Image className="w-4 h-4" />
        </button>
      </MediaPicker>
    </div>
  );
}
