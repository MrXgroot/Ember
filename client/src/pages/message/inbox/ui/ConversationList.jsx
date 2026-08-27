import React from "react";
import { ConversationItem } from "./ConversationItem";
import { InboxEmptyState } from "./InboxEmptyState";

export function ConversationList({ conversations = [], search = "" }) {
  if (conversations.length === 0) {
    return <InboxEmptyState search={search} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.user?._id || conversation.lastMessage?._id}
          conversation={conversation}
        />
      ))}
    </div>
  );
}

export default ConversationList;
