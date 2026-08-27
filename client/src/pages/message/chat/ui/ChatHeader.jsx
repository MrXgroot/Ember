import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";

export function ChatHeader({ recipient }) {
  const displayName = recipient?.displayName || recipient?.username || "Member";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="p-3.5 px-4 border-b border-app-border bg-app-surface/90 backdrop-blur-sm flex items-center justify-between z-10">
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to="/messages"
          className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors md:hidden"
          aria-label="Back to messages"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="relative shrink-0">
          {recipient?.avatar ? (
            <img
              src={recipient.avatar}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-app-border"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
              {initials}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-app-surface" />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-content-primary truncate leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-content-muted truncate leading-tight mt-0.5">
            {recipient?.username ? `@${recipient.username}` : "Direct Message"}
          </span>
        </div>
      </div>

      <button className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
    </header>
  );
}

export default ChatHeader;
