import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function WelcomeCard({ className }) {
  return (
    <div
      className={cn(
        "p-5 flex flex-col gap-4",
        "bg-app-surface border border-app-border rounded-app-sm shadow-surface-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-brand-light text-brand-primary rounded-app-sm">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="text-base font-medium text-content-primary tracking-wide">
          Welcome to Ember
        </h2>
      </div>

      <p className="text-sm font-normal text-content-secondary leading-relaxed">
        Discover discussions from communities across Ember. Your front page for
        curiosity and conversation.
      </p>

      <ul className="flex flex-col gap-2.5 text-sm font-normal text-content-secondary border-t border-app-border/40 pt-3">
        <li className="flex items-start gap-2">
          <span className="text-brand-primary mt-0.5">•</span>
          <span>Explore communities and discover new ideas.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-primary mt-0.5">•</span>
          <span>Join meaningful discussions.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-primary mt-0.5">•</span>
          <span>Vote on posts that add value.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-primary mt-0.5">•</span>
          <span>Share your own thoughts with the community.</span>
        </li>
      </ul>
    </div>
  );
}
