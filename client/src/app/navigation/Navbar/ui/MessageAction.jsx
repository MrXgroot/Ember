import React from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useHasInbox } from "@/features/message/hooks/useHasInbox";

export function MessageAction() {
  const hasInbox = useHasInbox();
  console.log(hasInbox);
  return (
    <Link
      to="/messages"
      aria-label="Messages"
      className="
        relative
        flex items-center justify-center
        size-8 sm:size-9
        rounded-app-md
        text-content-secondary
        hover:text-content-primary
        hover:bg-app-bg
        transition-colors
      "
    >
      <MessageSquare className="size-4" />

      {hasInbox && (
        <span
          className="
            absolute top-1.5 right-1.5
            size-2
            rounded-full
            bg-brand-primary
            ring-2 ring-app-surface
          "
        />
      )}
    </Link>
  );
}
