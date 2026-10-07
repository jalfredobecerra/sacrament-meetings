'use client';

import {
  useActionState,
} from 'react';

import {
  authenticate,
} from '@/lib/actions';

export function LoginForm() {
  const [
    errorMessage,
    formAction,
    isPending,
  ] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="form-input"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          required
          className="form-input"
          aria-describedby={
            errorMessage
              ? 'login-error'
              : undefined
          }
        />
      </div>

      {errorMessage && (
        <p
          id="login-error"
          role="alert"
          className="text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? 'Signing in...'
          : 'Sign In'}
      </button>
    </form>
  );
}