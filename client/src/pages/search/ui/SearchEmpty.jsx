export function SearchEmpty() {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-border-subtle">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-content-primary">
          No results found
        </h3>

        <p className="mt-1 text-xs text-content-secondary">
          Try searching for something else.
        </p>
      </div>
    </div>
  );
}
