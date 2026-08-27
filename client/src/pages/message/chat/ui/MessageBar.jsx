import React from "react";
import { Send, Smile, Paperclip } from "lucide-react";

export function MessageBar({ text, setText, onSend, recipientName }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-app-border bg-app-surface/90 backdrop-blur-sm flex items-center gap-2"
    >
      <button
        type="button"
        className="p-2 rounded-full text-content-muted hover:text-content-primary hover:bg-app-bg transition-colors"
      >
        <Paperclip className="w-4 h-4" />
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder={`Message ${recipientName || "member"}...`}
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
        disabled={!text.trim()}
        className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-hover active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-surface-sm"
      >
        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </form>
  );
}

export default MessageBar;
