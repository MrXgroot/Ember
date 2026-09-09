import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function CreatePostHeader({ className }) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-app-border/40 pb-4",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-content-primary tracking-tight">
          Create a Post
        </h1>

        <p className="text-xs text-content-muted">
          Share discussions, links, questions, or media with the community.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="shrink-0 p-2 rounded-app-sm text-content-muted hover:text-content-primary hover:bg-app-surface transition-colors"
        aria-label="Close"
        title="Go back"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
