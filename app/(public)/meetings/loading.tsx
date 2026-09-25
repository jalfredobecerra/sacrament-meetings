export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading meeting programs"
      className="space-y-6"
    >
      <div className="h-12 w-full animate-pulse rounded-xl border border-slate-200 bg-slate-100" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="min-h-44 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-40 rounded bg-slate-200" />
                <div className="h-6 w-64 rounded bg-slate-200" />
                <div className="h-4 w-48 rounded bg-slate-200" />
                <div className="h-4 w-44 rounded bg-slate-200" />
              </div>

              <div className="h-9 w-28 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6">
        <div className="h-9 w-24 rounded-full bg-slate-200" />
        <div className="h-5 w-24 rounded bg-slate-200" />
        <div className="h-9 w-20 rounded-full bg-slate-200" />
      </div>

      <span className="sr-only">Loading meeting programs...</span>
    </div>
  );
}