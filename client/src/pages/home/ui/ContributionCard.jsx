import React from "react";
import { GitPullRequest, Star } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

export function ContributionCard({ className }) {
  return (
    <div
      className={cn(
        "p-5 flex flex-col gap-4",
        "bg-app-surface border border-app-border rounded-app-sm shadow-surface-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-zinc-800 text-zinc-100 rounded-app-sm flex items-center justify-center">
          {/* Custom inline GitHub SVG avoiding library version conflicts */}
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
        </div>
        <h2 className="text-base font-normal text-content-primary tracking-wide">
          Build With Us
        </h2>
      </div>

      <p className="text-sm font-normal text-content-secondary leading-relaxed">
        Ember is fully open source! Help us shape the future of the platform by
        contributing to the codebase.
      </p>

      <div className="flex flex-col gap-2 mt-1">
        <a
          href="https://github.com/MrXgroot"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 h-9 px-4 rounded-app-sm text-sm font-normal bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          <GitPullRequest className="w-4 h-4" />
          Open a Pull Request
        </a>

        <a
          href="https://github.com/MrXgroot"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 h-9 px-4 rounded-app-sm text-sm font-normal bg-transparent border border-app-border text-content-primary hover:bg-app-bg transition-colors"
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          Star Project on GitHub
        </a>
      </div>
    </div>
  );
}
