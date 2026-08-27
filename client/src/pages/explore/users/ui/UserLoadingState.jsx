import React from "react";

export function UserLoadingState({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-app-surface border border-app-border rounded-app-lg animate-pulse flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-app-bg border border-app-border" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-3.5 w-24 bg-app-bg rounded-app-md" />
              <div className="h-2.5 w-16 bg-app-bg/50 rounded-app-md" />
            </div>
          </div>
          <div className="h-3 w-3/4 bg-app-bg/40 rounded-app-md" />
          <div className="h-8 w-full bg-app-bg rounded-app-md mt-1" />
        </div>
      ))}
    </div>
  );
}

export default UserLoadingState;
