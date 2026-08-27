import React from "react";
import { MessageSquare, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function InboxEmptyState({ search = "" }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-3">
        <MessageSquare className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-content-primary">
        {search ? "No conversations match" : "No messages yet"}
      </h3>
      <p className="text-xs text-content-secondary mt-1 max-w-xs mb-4">
        {search
          ? `No message threads found matching "${search}".`
          : "Start a direct conversation with members across ember."}
      </p>

      {!search && (
        <Link
          to="/explore/users"
          className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-app-md text-xs font-semibold bg-brand-primary text-white hover:bg-brand-hover active:scale-95 transition-all shadow-surface-sm"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Explore Members</span>
        </Link>
      )}
    </div>
  );
}

export default InboxEmptyState;
