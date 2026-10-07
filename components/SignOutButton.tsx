import {
  signOut,
} from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';

        await signOut({
          redirectTo: '/login',
        });
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
      >
        Sign Out
      </button>
    </form>
  );
}