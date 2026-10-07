import type {
  Metadata,
} from 'next';

import {
  LoginForm,
} from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Bishopric Sign In',
  description:
    'Sign in to manage sacrament meeting programs.',
};

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Bishopric Sign In
        </h1>

        <p className="mt-2 text-slate-700">
          Sign in to create, edit,
          and delete meeting programs.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </section>
  );
}