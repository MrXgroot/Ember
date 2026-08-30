import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/app/auth";
import { useMessages } from "@/features/message/hooks/useMessages";
import { useMessageSocket } from "@/features/message/hooks/useMessageSocket";
import { cn } from "@/shared/integrations/cn";

import { ChatHeader } from "./ui/ChatHeader";
import { MessageList } from "./ui/MessageList";
import { MessageBar } from "./ui/MessageBar";

export function ChatPage({ className }) {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  // React Query owns the conversation data.
  const messagesQuery = useMessages(userId);

  // Socket owns realtime updates and writes them
  // directly into the React Query cache.
  const { sendMessage, deleteMessage } = useMessageSocket(userId);

  /*
   * Normalize the API response.
   *
   * Your API might currently return:
   * [
   *   message,
   *   message
   * ]
   *
   * or:
   *
   * {
   *   data: [...]
   * }
   */
  const messages = useMemo(() => {
    const data = messagesQuery.data;

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (Array.isArray(data?.data?.messages)) {
      return data.data.messages;
    }

    if (Array.isArray(data?.messages)) {
      return data.messages;
    }

    return [];
  }, [messagesQuery.data]);

  /*
   * Backend currently returns newest -> oldest.
   *
   * Chat UI needs oldest -> newest.
   *
   * IMPORTANT:
   * If you change the backend to `.sort({ createdAt: 1 })`,
   * remove this reverse().
   */
  const messageList = useMemo(() => {
    return [...messages].reverse();
  }, [messages]);

  /*
   * Get recipient information from the messages.
   *
   * Later we can replace this with useUser(userId),
   * which is actually better because an empty conversation
   * currently has no message from which to get the user's data.
   */
  const recipient = useMemo(() => {
    const message = messageList.find(
      (message) =>
        message.sender?._id === userId || message.receiver?._id === userId,
    );

    if (message) {
      if (message.sender?._id === userId) {
        return message.sender;
      }

      if (message.receiver?._id === userId) {
        return message.receiver;
      }
    }

    return {
      _id: userId,
      displayName: "Member",
      username: "user",
      avatar: null,
    };
  }, [messageList, userId]);

  /*
   * Scroll whenever React Query receives a new message.
   */
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList.length]);

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

  if (messagesQuery.isLoading) {
    return (
      <div className="w-full h-[calc(100vh-8.5rem)] flex flex-col bg-app-surface border border-app-border rounded-app-lg overflow-hidden animate-pulse">
        <div className="p-4 border-b border-app-border flex items-center gap-3 bg-app-surface">
          <div className="w-9 h-9 rounded-full bg-app-bg" />

          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-3.5 w-32 bg-app-bg rounded-app-md" />
            <div className="h-2.5 w-20 bg-app-bg/60 rounded-app-md" />
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-4 bg-app-bg/30">
          <div className="h-9 w-44 bg-app-surface rounded-2xl self-start" />
          <div className="h-9 w-60 bg-app-surface rounded-2xl self-end" />
          <div className="h-9 w-36 bg-app-surface rounded-2xl self-start" />
        </div>

        <div className="p-3 border-t border-app-border bg-app-surface h-14" />
      </div>
    );
  }

  if (messagesQuery.isError) {
    return (
      <div className="w-full h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center text-center p-6 bg-app-surface border border-red-950/20 rounded-app-lg">
        <AlertCircle className="w-8 h-8 text-red-400 mb-3" />

        <h3 className="text-sm font-semibold text-content-primary">
          Failed to load conversation
        </h3>

        <p className="text-xs text-content-secondary mt-1 max-w-sm mb-4">
          Could not establish connection to the chat channel.
        </p>

        <Link
          to="/messages"
          className="px-4 h-8 rounded-app-md text-xs font-semibold bg-app-bg border border-app-border text-content-primary hover:bg-app-surface transition-all flex items-center justify-center"
        >
          Back to Inbox
        </Link>
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
      <ChatHeader recipient={recipient} />

      <MessageList
        messages={messageList}
        currentUserId={currentUser?._id}
        recipient={recipient}
        onDelete={handleDelete}
        scrollRef={scrollRef}
      />

      <MessageBar
        text={text}
        setText={setText}
        onSend={handleSend}
        recipientName={recipient?.displayName}
      />
    </div>
  );
}

export default ChatPage;
