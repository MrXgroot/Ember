import React from "react";
import { Trash2, CheckCheck } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

function formatMessageTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageItem({ message, isMe, onDelete }) {
  const senderName =
    message?.sender?.displayName || message?.sender?.username || "Member";
  const avatar = message?.sender?.avatar;
  const initials = senderName.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "group relative flex gap-2.5 max-w-[80%] md:max-w-[70%]",
        isMe ? "self-end flex-row-reverse" : "self-start flex-row",
      )}
    >
      {/* Sender Avatar */}
      <div className="relative shrink-0 mt-0.5">
        {avatar ? (
          <img
            src={avatar}
            alt={senderName}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-app-border"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center text-[10px] font-bold text-brand-primary">
            {initials}
          </div>
        )}
      </div>

      {/* Bubble Container */}
      <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
        <div className="flex items-center gap-1.5">
          {/* Delete Action (only for own messages) */}
          {isMe && onDelete && (
            <button
              onClick={() => onDelete(message._id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-full text-content-muted hover:text-red-400 hover:bg-app-bg transition-all"
              title="Delete message"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Text Bubble */}
          <div
            className={cn(
              "px-3.5 py-2 text-xs leading-relaxed break-words shadow-surface-sm",
              isMe
                ? "bg-brand-primary text-white rounded-2xl rounded-tr-sm"
                : "bg-app-surface border border-app-border text-content-primary rounded-2xl rounded-tl-sm",
            )}
          >
            {message.content}
          </div>
        </div>

        {/* Message Meta Info */}
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-[9px] text-content-muted">
            {formatMessageTime(message.createdAt)}
          </span>
          {isMe && <CheckCheck className="w-3 h-3 text-brand-primary" />}
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
