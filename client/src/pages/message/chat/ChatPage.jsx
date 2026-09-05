import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/app/auth";
import { useMessages } from "@/features/message/hooks/useMessages";
import { useMessageSocket } from "@/features/message/hooks/useMessageSocket";
import { cn } from "@/shared/integrations/cn";

import { ChatHeader } from "./ui/ChatHeader";
import { MessageList } from "./ui/MessageList";
import { MessageBar } from "./ui/MessageBar";
import { ChatLoadingState } from "./ui/ChatLoadingState";
import { ChatErrorState } from "./ui/ChatErrorState";

export function ChatPage({ className }) {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();

  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  const { data, isLoading, isError, error } = useMessages(userId);

  const messages = data?.messages ?? [];
  const recipient = data?.recipient ?? null;
  const { sendMessage, deleteMessage } = useMessageSocket(userId);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    const content = text.trim();

    if (!content || !userId) return;

    sendMessage({
      receiverId: userId,
      content,
    });

    setText("");
  };

  const handleDelete = (messageId) => {
    if (!messageId) return;

    deleteMessage(messageId);
  };

  if (isLoading) {
    return <ChatLoadingState />;
  }

  if (isError) {
    return <ChatErrorState />;
  }

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-8.5rem)] flex flex-col",
        "bg-app-surface border border-app-border",
        "rounded-app-lg overflow-hidden shadow-surface-sm",
        className,
      )}
    >
      <ChatHeader recipient={recipient} />

      <MessageList
        messages={messages}
        currentUserId={currentUser?._id}
        onDelete={handleDelete}
        scrollRef={scrollRef}
      />

      <MessageBar text={text} setText={setText} onSend={handleSend} />
    </div>
  );
}

export default ChatPage;
