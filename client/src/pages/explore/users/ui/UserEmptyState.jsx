import React from "react";
import { Users } from "lucide-react";

export function UserEmptyState({ search = "" }) {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-app-surface/40 border border-dashed border-app-border rounded-app-lg">
      <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-3">
        <Users className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-content-primary">
        No members found
      </h3>
      <p className="text-xs text-content-secondary mt-1 max-w-xs">
        {search
          ? `No members matched "${search}"`
          : "The member directory is currently empty."}
      </p>
    </div>
  );
}

export default UserEmptyState;
