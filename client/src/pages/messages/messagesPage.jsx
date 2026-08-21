import React, { useState } from "react";
import {
  Search,
  Send,
  Plus,
  MoreVertical,
  Smile,
  Paperclip,
  CheckCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function MessagesPage({ className }) {
  const [activeConversationId, setActiveConversationId] = useState("conv-1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [conversations, setConversations] = useState([
    {
      id: "conv-1",
      user: {
        username: "sarah_k",
        displayName: "Sarah Connor",
        status: "online",
        avatarLetter: "SK",
      },
      lastMessage: "Are you free to review the new design tokens?",
      timestamp: "2m ago",
      unreadCount: 1,
      messages: [
        {
          id: "m-1",
          sender: "them",
          text: "Hey Sukesh! I saw the latest changes to the ember shell layout.",
          timestamp: "10:14 AM",
        },
        {
          id: "m-2",
          sender: "them",
          text: "The capsule buttons and dark mode contrast look really sharp.",
          timestamp: "10:15 AM",
        },
        {
          id: "m-3",
          sender: "me",
          text: "Thanks Sarah! We just finished refining the token system and custom layout primitives.",
          timestamp: "10:18 AM",
        },
        {
          id: "m-4",
          sender: "them",
          text: "Are you free to review the new design tokens?",
          timestamp: "10:20 AM",
        },
      ],
    },
    {
      id: "conv-2",
      user: {
        username: "alex_dev",
        displayName: "Alex Rivera",
        status: "offline",
        avatarLetter: "AR",
      },
      lastMessage: "Merged the PR into main. Thanks for the quick review!",
      timestamp: "1h ago",
      unreadCount: 0,
      messages: [
        {
          id: "m-201",
          sender: "me",
          text: "Just left a few comments on the API wrapper.",
          timestamp: "Yesterday",
        },
        {
          id: "m-202",
          sender: "them",
          text: "Merged the PR into main. Thanks for the quick review!",
          timestamp: "1h ago",
        },
      ],
    },
    {
      id: "conv-3",
      user: {
        username: "marcus_ui",
        displayName: "Marcus Vance",
        status: "online",
        avatarLetter: "MV",
      },
      lastMessage: "Let's sync up on the notification tray tomorrow.",
      timestamp: "1d ago",
      unreadCount: 0,
      messages: [
        {
          id: "m-301",
          sender: "them",
          text: "Let's sync up on the notification tray tomorrow.",
          timestamp: "1d ago",
        },
      ],
    },
  ]);

  // Find active chat data
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  // Send message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: messageInput.trim(),
      timestamp: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: newMessage.text,
              timestamp: "Just now",
              messages: [...c.messages, newMessage],
            }
          : c,
      ),
    );

    setMessageInput("");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-8.5rem)] flex flex-col gap-4",
        className,
      )}
    >
      {/* ─── TITLE HEADER ─── */}
      <div className="flex items-center justify-between pb-2 border-b border-app-border">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-content-primary">
            Direct Messages
          </h1>
          <p className="text-xs text-content-secondary">
            Chat privately with other ember community members.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-app-md text-xs font-semibold bg-brand-primary text-white hover:bg-brand-hover active:scale-95 transition-all shadow-surface-sm">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Chat</span>
        </button>
      </div>

      {/* ─── 2-PANE CHAT CONTAINER ─── */}
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-0 bg-app-surface border border-app-border rounded-app-lg overflow-hidden shadow-surface-sm">
        {/* LEFT PANE: CONVERSATION LIST (4 cols) */}
        <aside className="md:col-span-4 border-r border-app-border flex flex-col h-full bg-app-surface/50">
          {/* Conversation Search Bar */}
          <div className="p-3 border-b border-app-border">
            <div className="relative w-full group">
              <Search className="w-3.5 h-3.5 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full h-8 pl-8 pr-3 bg-app-bg border border-app-border rounded-app-md text-xs text-content-primary placeholder:text-content-muted focus:border-brand-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* List of Chats */}
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 scrollbar-none">
            {filteredConversations.length === 0 ? (
              <div className="py-8 text-center text-xs text-content-muted">
                No chats found
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeConversationId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2.5 rounded-app-md text-left transition-all duration-150 select-none",
                      isActive
                        ? "bg-app-bg border border-app-border shadow-surface-sm"
                        : "hover:bg-app-surface border border-transparent",
                    )}
                  >
                    {/* User Avatar with Online Dot */}
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
                        {conv.user.avatarLetter}
                      </div>
                      {conv.user.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-app-surface" />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-xs font-semibold truncate",
                            isActive
                              ? "text-brand-primary"
                              : "text-content-primary",
                          )}
                        >
                          {conv.user.displayName}
                        </span>
                        <span className="text-[10px] text-content-muted shrink-0">
                          {conv.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-content-secondary truncate leading-tight">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* RIGHT PANE: ACTIVE CHAT VIEW (8 cols) */}
        <section className="md:col-span-8 flex flex-col h-full bg-app-bg/30">
          {activeConversation ? (
            <>
              {/* Active Conversation Top Header */}
              <div className="p-3 px-4 border-b border-app-border bg-app-surface/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-xs font-bold text-brand-primary">
                      {activeConversation.user.avatarLetter}
                    </div>
                    {activeConversation.user.status === "online" && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-app-surface" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-content-primary leading-tight">
                      {activeConversation.user.displayName}
                    </span>
                    <span className="text-[10px] text-content-muted leading-tight">
                      u/{activeConversation.user.username} •{" "}
                      {activeConversation.user.status}
                    </span>
                  </div>
                </div>

                <button className="p-1.5 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Message Feed Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {/* Intro bubble */}
                <div className="w-full py-6 flex flex-col items-center justify-center text-center gap-1.5 text-content-muted border-b border-app-border/30 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-content-primary">
                    This is the start of your direct message history with{" "}
                    {activeConversation.user.displayName}
                  </span>
                  <span className="text-[10px]">
                    Messages are end-to-end encrypted across ember.
                  </span>
                </div>

                {/* Messages Map */}
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[75%]",
                        isMe ? "self-end items-end" : "self-start items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "px-3.5 py-2 text-xs leading-relaxed transition-all",
                          isMe
                            ? "bg-brand-primary text-white rounded-2xl rounded-br-sm shadow-surface-sm"
                            : "bg-app-surface border border-app-border text-content-primary rounded-2xl rounded-bl-sm",
                        )}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[9px] text-content-muted">
                          {msg.timestamp}
                        </span>
                        {isMe && (
                          <CheckCheck className="w-3 h-3 text-brand-primary" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-app-border bg-app-surface/60 flex items-center gap-2"
              >
                <button
                  type="button"
                  className="p-2 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message u/${activeConversation.user.username}...`}
                  className="flex-1 h-9 px-4 rounded-app-md bg-app-bg border border-app-border text-xs text-content-primary placeholder:text-content-muted focus:border-brand-primary outline-none transition-colors"
                />

                <button
                  type="button"
                  className="p-2 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
                >
                  <Smile className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-hover active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-2">
              <div className="w-12 h-12 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-content-muted">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-content-primary">
                No Chat Selected
              </h3>
              <p className="text-xs text-content-secondary max-w-xs">
                Select an existing conversation from the left pane or start a
                new thread.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MessagesPage;
