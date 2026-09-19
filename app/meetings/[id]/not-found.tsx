import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-950">Meeting not found</h1>
      <p className="mt-2 text-slate-700">
        This meeting program does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Back to all programs
      </Link>
    </div>
  );
}