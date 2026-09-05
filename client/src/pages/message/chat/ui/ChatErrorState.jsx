import React from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ChatErrorState() {
  return (
    <div className="w-full h-[calc(100vh-8.5rem)] flex flex-col items-center justify-center text-center p-6 bg-app-surface border border-app-border rounded-app-lg">
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
