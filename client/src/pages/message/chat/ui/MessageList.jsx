import React from "react";
import { Sparkles } from "lucide-react";
import { MessageItem } from "./MessageItem";

export function MessageList({
  messages = [],
  currentUserId,
  recipient,
  onDelete,
  scrollRef,
}) {
  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-app-bg/30"
    >
      {/* Channel Header Banner */}
      <div className="w-full py-6 flex flex-col items-center justify-center text-center gap-1.5 text-content-muted border-b border-app-border/40 mb-2">
        <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-1">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-xs font-semibold text-content-primary">
          Conversation with {recipient?.displayName || "Member"}
        </span>
        <span className="text-[10px]">
          End-to-end synchronized direct chat.
        </span>
      </div>

      {/* Messages */}
      {messages.map((message) => {
        const isMe =
          message.sender?._id === currentUserId ||
          (typeof message.sender === "string" &&
            message.sender === currentUserId);

        return (
          <MessageItem
            key={message._id || message.createdAt}
            message={message}
            isMe={isMe}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
