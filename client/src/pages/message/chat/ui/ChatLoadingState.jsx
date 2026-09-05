import React from "react";

export function ChatLoadingState() {
  return (
    <div className="w-full h-[calc(100vh-8.5rem)] flex flex-col bg-app-surface border border-app-border rounded-app-lg overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-4 border-b border-app-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-app-bg" />

        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3.5 w-32 bg-app-bg rounded-app-md" />
          <div className="h-2.5 w-20 bg-app-bg/60 rounded-app-md" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col gap-4 bg-app-bg/30">
        <div className="h-9 w-44 bg-app-surface rounded-2xl self-start" />
        <div className="h-9 w-60 bg-app-surface rounded-2xl self-end" />
        <div className="h-9 w-36 bg-app-surface rounded-2xl self-start" />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-app-border bg-app-surface h-14" />
    </div>
  );
}
