import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const pathname = nextUrl.pathname;

      const isCreateMeeting =
        pathname === '/meetings/new';

      const isEditMeeting =
        /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

      const isProtected =
        isCreateMeeting || isEditMeeting;

      if (isProtected) {
        return isLoggedIn;
      }

      if (
        isLoggedIn &&
        pathname === '/login'
      ) {
        return Response.redirect(
          new URL('/meetings', nextUrl),
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;