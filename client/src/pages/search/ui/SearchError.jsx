export function SearchError({ onRetry }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-border-subtle">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-content-primary">
          Something went wrong
        </h3>

        <p className="mt-1 text-xs text-content-secondary">
          We couldn't load the search results.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg px-3 py-2 text-xs font-medium"
      >
        Try again
      </button>
    </div>
  );
}
