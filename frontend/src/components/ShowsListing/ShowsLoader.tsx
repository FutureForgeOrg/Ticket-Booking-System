export const ShowsLoader = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-surface p-4 shadow-soft"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-text-primary">
                <div className="w-32 h-5 rounded-lg bg-skeleton animate-pulse"></div>
              </div>
              <div className="text-xs text-text-muted">
                <div className="w-48 h-4 rounded-lg bg-skeleton animate-pulse mt-1"></div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="w-24 h-4 rounded-lg bg-skeleton animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-32 h-10 rounded-lg bg-skeleton animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
