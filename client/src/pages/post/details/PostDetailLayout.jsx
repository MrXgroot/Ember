import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

//TODO: change the location to relevant position once
export function PostDetailLayout({ children, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full bg-app-bg text-content-primary">
      {/* Sticky Mobile/Desktop Header with Quick Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-app-border/60 bg-app-bg/85 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-4xl flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 p-1.5 -ml-1 text-content-secondary hover:text-content-primary rounded-full hover:bg-app-surface transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold hidden sm:inline">Back</span>
          </button>
          <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
            Discussion
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl px-0 sm:px-4 md:px-6 py-0 sm:py-6">
        <div className="flex flex-col gap-3 sm:gap-6">{children}</div>
      </main>
    </div>
  );
}
