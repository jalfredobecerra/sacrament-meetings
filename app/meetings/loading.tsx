export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <p className="text-slate-700">Loading meeting programs...</p>
    </div>
  );
}