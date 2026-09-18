import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="space-y-6">
      <div className="no-print rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Meeting Programs</h1>
        <p className="mt-2 text-slate-700">
          Review all meeting entries or jump to the current Sunday program.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/meetings"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            All Programs
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Current Sunday
          </Link>
        </div>
      </div>

      {children}
    </section>
  );
}