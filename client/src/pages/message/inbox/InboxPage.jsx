import React, { useState } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useInbox } from "@/features/message/hooks/useInbox";
import { cn } from "@/shared/integrations/cn";

import { InboxHeader } from "./ui/InboxHeader";
import { ConversationList } from "./ui/ConversationList";

export function InboxPage({ className }) {
  const { data, isLoading, isError, refetch } = useInbox();
  const [search, setSearch] = useState("");

  // Handle direct array returns or standard nested object envelopes
  const conversations = Array.isArray(data)
    ? data
    : (data?.data?.conversations ?? data?.conversations ?? data?.data ?? []);

  const filteredConversations = conversations.filter((item) => {
    const displayName = item?.user?.displayName || "";
    const username = item?.user?.username || "";
    const lastContent = item?.lastMessage?.content || "";
    const query = search.toLowerCase();

    return (
      displayName.toLowerCase().includes(query) ||
      username.toLowerCase().includes(query) ||
      lastContent.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full h-[calc(100vh-8.5rem)] flex flex-col bg-app-surface border border-app-border rounded-app-lg overflow-hidden animate-pulse",
          className,
        )}
      >
        <div className="p-4 border-b border-app-border flex flex-col gap-3">
          <div className="h-4 w-24 bg-app-bg rounded-app-md" />
          <div className="h-8 w-full bg-app-bg rounded-app-md" />
        </div>
        <div className="flex-1 p-2 flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-3 rounded-app-md bg-app-bg/40 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-app-bg" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-28 bg-app-bg rounded-app-md" />
                <div className="h-2.5 w-44 bg-app-bg/60 rounded-app-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "w-full h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center text-center p-6 bg-app-surface border border-red-950/20 rounded-app-lg",
          className,
        )}
      >
        <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
        <h3 className="text-sm font-semibold text-content-primary">
          Failed to load inbox
        </h3>
        <p className="text-xs text-content-secondary mt-1 max-w-sm mb-4">
          Could not sync conversations from the messaging server.
        </p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 h-8 rounded-app-md text-xs font-semibold bg-app-bg border border-app-border text-content-primary hover:bg-app-surface transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-brand-primary" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-8.5rem)] flex flex-col bg-app-surface border border-app-border rounded-app-lg overflow-hidden shadow-surface-sm",
        className,
      )}
    >
      <InboxHeader
        count={conversations.length}
        search={search}
        onSearchChange={setSearch}
      />

      <ConversationList conversations={filteredConversations} search={search} />
    </div>
  );
}

export default InboxPage;
