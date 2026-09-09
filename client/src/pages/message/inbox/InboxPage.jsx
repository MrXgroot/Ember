import React, { useState } from "react";
import { cn } from "@/shared/integrations/cn";

import { useInbox } from "@/features/message/hooks/useInbox";

import { InboxHeader, ConversationList, InboxLoading, InboxError } from "./ui";

export function InboxPage({ className }) {
  const { data, isLoading, isError, refetch } = useInbox();

  const [search, setSearch] = useState("");

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
    return <InboxLoading className={className} />;
  }

  if (isError) {
    return <InboxError onRetry={refetch} className={className} />;
  }

  return (
    <div
      className={cn(
        "w-full h-full min-h-0 flex flex-col bg-app-surface overflow-hidden my-8",
        className,
      )}
    >
      <InboxHeader
        count={conversations.length}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="flex-1 min-h-0">
        <ConversationList
          conversations={filteredConversations}
          search={search}
        />
      </div>
    </div>
  );
}

export default InboxPage;
