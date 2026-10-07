import {
  SignOutButton,
} from '@/components/SignOutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-medium text-slate-700">
          Bishopric Management
        </p>

        <SignOutButton />
      </div>

      {children}
    </div>
  );
}