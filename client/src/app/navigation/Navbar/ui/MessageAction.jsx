import React from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export function MessageAction() {
  return (
    <Link
      to="/messages"
      aria-label="Messages"
      className="
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
    </Link>
  );
}
