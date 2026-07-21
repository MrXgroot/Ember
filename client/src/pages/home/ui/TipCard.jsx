import React, { useState, useEffect } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";
import { cn } from "@/shared/integrations/cn";

const tips = [
  "Use the search bar to quickly find communities and discussions.",
  "Join communities that match your interests.",
  "Upvote posts that contribute to the conversation.",
  "Use clear titles so others understand your post immediately.",
  "Read a community's rules before creating a post.",
  "Be respectful and constructive when engaging in comment sections.",
  "Save interesting posts to revisit them later in your profile.",
  "Formatting your body text with clear sections increases engagement.",
  "Check out the 'Popular' feed to see what is trending across Ember.",
  "Report spam or abusive content to help keep the community clean.",
];

export function TipCard({ className }) {
  const [currentTip, setCurrentTip] = useState("");
  const [targetTip, setTargetTip] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'typing'

  // Initialize with a random tip on mount
  useEffect(() => {
    const initialTip = tips[Math.floor(Math.random() * tips.length)];
    setTargetTip(initialTip);
    setCurrentTip(initialTip);
  }, []);

  // AI Typing Effect Setup
  useEffect(() => {
    if (status !== "typing" || !targetTip) return;

    let index = 0;
    setCurrentTip("");

    const typeLetter = () => {
      setCurrentTip(targetTip.slice(0, index + 1));
      index++;

      if (index < targetTip.length) {
        // Calculate variable typing speeds (simulating human/AI thought patterns)
        const nextChar = targetTip[index];
        let delay = 35; // base speed per character

        if (nextChar === " ") {
          delay = 60; // deliberate extra pause on spaces
        } else if (nextChar === "." || nextChar === ",") {
          delay = 250; // noticeable pause on punctuation marks
        }

        setTimeout(typeLetter, delay);
      } else {
        setStatus("idle");
      }
    };

    // Kick off typing sequence
    const timer = setTimeout(typeLetter, 50);
    return () => clearTimeout(timer);
  }, [targetTip, status]);

  const handleRefresh = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setCurrentTip(""); // Clear text to show placeholder state

    const filteredTips = tips.filter((t) => t !== targetTip);
    const nextTip =
      filteredTips[Math.floor(Math.random() * filteredTips.length)];

    // Hold the loading placeholder state before starting to type
    setTimeout(() => {
      setTargetTip(nextTip);
      setStatus("typing");
    }, 1200);
  };

  return (
    <div
      className={cn(
        "p-5 flex flex-col gap-3.5",
        "bg-app-surface border border-app-border rounded-app-sm shadow-surface-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-app-sm">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-content-primary tracking-wide">
            Community Tip
          </h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={status !== "idle"}
          className="p-1 text-content-muted hover:text-content-primary hover:bg-app-bg rounded-full transition-colors disabled:opacity-50"
          aria-label="Next tip"
        >
          <RefreshCw
            className={cn(
              "w-3.5 h-3.5",
              status === "loading" && "animate-spin",
            )}
          />
        </button>
      </div>

      <div className="min-h-[48px] border-l-2 border-app-border/40 pl-3 flex items-center">
        {status === "loading" ? (
          /* Thinking / Placeholder State Indicator */
          <div className="flex items-center gap-1.5 py-1">
            <span className="w-2 h-2 rounded-full bg-content-muted animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-content-muted animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-content-muted animate-bounce" />
          </div>
        ) : (
          /* Main Output Layer */
          <p className="text-sm font-normal text-content-secondary leading-relaxed italic whitespace-pre-wrap">
            {currentTip ? `"${currentTip}"` : ""}
            {status === "typing" && (
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-brand-primary animate-pulse vertical-middle" />
            )}
          </p>
        )}
      </div>
    </div>
  );
}
