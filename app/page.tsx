import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ward meeting planning
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Plan, review, and print sacrament meeting programs.
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-700">
          Keep announcements, prayers, hymns, ward business, speakers, and musical
          numbers in one organized place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/meetings/current"
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700"
          >
            View Current Program
          </Link>

          <Link
            href="/meetings"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Browse All Programs
          </Link>
        </div>
      </section>

      <section aria-label="Church building illustration">
        <Image
          src="/church-building.svg"
          alt="Simple illustration of a church building"
          width={900}
          height={520}
          priority
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
        />
      </section>
    </div>
  );
}