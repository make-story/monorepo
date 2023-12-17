import NextAuth from 'next-auth';
import type { DefaultSession, JWT as DefaultJWT, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    provider?: string;
    user?: DefaultUser & {
      id: string; // ID
      markedUserName: string;
      socialAccountId: number; // social ID
    };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    provider?: OAuthToken;
    service?: Token;
  }

  interface OAuthToken extends Token {
    id: string;
    name: string;
  }

  interface Token {
    accessToken: string;
    refreshToken: string;
    accessExpireTime: number;
    refreshExpireTime: number;
  }
}
