import React from "react";
import { cn } from "@/shared/integrations/cn";
import { Avatar, Textarea, Button } from "@/shared/ui";

export function CommentComposer({ controller, className }) {
  const { data, ui, actions } = controller;

  return (
    <div className={cn("flex items-start gap-4", className)}>
      <Avatar className="mt-1 shrink-0" />

      <div className="flex flex-1 flex-col">
        <Textarea
          placeholder="Join the discussion..."
          value={data.content}
          onChange={(e) => actions.setContent(e.target.value)}
          rows={3}
        />

        <div className="mt-4 flex items-center justify-end">
          <Button
            disabled={!ui.canSubmit}
            loading={ui.loading}
            onClick={actions.submit}
            className={cn(
              "h-9 rounded-app-sm px-5",
              "text-sm font-semibold",
              "transition-colors",
              "bg-zinc-100 text-zinc-950",
              "hover:bg-zinc-200",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
