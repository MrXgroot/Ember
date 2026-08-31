import React from "react";
import { ShieldCheck } from "lucide-react";

export function CommunityRules({ rules }) {
  return (
    <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 text-content-primary font-bold text-base">
        <ShieldCheck className="size-5 text-brand-primary" />
        <h3>Community Guidelines</h3>
      </div>

      {Array.isArray(rules) && rules.length > 0 ? (
        <div className="space-y-3">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-app-bg border border-app-border/60 space-y-1"
            >
              <p className="text-sm font-semibold text-content-primary">
                {idx + 1}. {rule.title || rule}
              </p>
              {rule.description && (
                <p className="text-xs text-content-muted leading-relaxed">
                  {rule.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-content-muted">
          No custom rules defined yet. Respect member guidelines and keep
          discussions productive.
        </p>
      )}
    </div>
  );
}
