import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import Apple from 'next-auth/providers/apple';

import { initializeApollo } from '@/common/apollo/client/apolloClient';
import {
  CREATE_TOKEN,
  SIGN_UP_BY_SOCIAL,
} from '@/common/queries/auth/auth.mutation';
import getTokenApi from '@/common/utils/auth/token';
import { FETCH_MY_INFO } from '@/common/queries/user/user.query';

// 소셜 로그인 env
const {
  OAUTH_KAKAO_CLIENT_ID,
  OAUTH_KAKAO_CLIENT_SECRET,
  OAUTH_NAVER_CLIENT_ID,
  OAUTH_NAVER_CLIENT_SECRET,
  OAUTH_APPLE_CLIENT_ID,
  OAUTH_APPLE_CLIENT_SECRET,
} = process.env;

// https://next-auth.js.org
export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  // Configure one or more authentication providers
  providers: [
    Kakao({
      clientId: OAUTH_KAKAO_CLIENT_ID!,
      clientSecret: OAUTH_KAKAO_CLIENT_SECRET!,
    }),
    Naver({
      clientId: OAUTH_NAVER_CLIENT_ID!,
      clientSecret: OAUTH_NAVER_CLIENT_SECRET!,
    }),
    Apple({
      clientId: OAUTH_APPLE_CLIENT_ID!,
      clientSecret: OAUTH_APPLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/sign-in',
    // signOut: '/auth/sign-out',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    newUser: '/auth-sign-up',
  },
  events: {
    signIn({ isNewUser }) {
      console.log('isNewUser :>> ', isNewUser);
    },
  },
  callbacks: {
    /**
     * 화면 최초 접근 시
     * @param param0
     * @returns
     */
    async session({ session, token }) {
      // The return type will match the one returned in `useSession()`

      if (token.provider) {
        // OAuth type 설정
        session.provider = token.provider.name;
      }

      if (token.service) {
        // 토큰 기간 체크
        const { isRenew, token: responseToken } = await getTokenApi(
          token.service,
        );
        if (isRenew) {
          // 재발급 받은 경우 기존 토큰 업데이트
          token.service = responseToken;
        }

        // 사용자 정보 가져오기
        if (responseToken.accessToken) {
          const apolloClient = initializeApollo();
          const {
            data: {},
          } = await apolloClient.query({
            query: FETCH_MY_INFO,
            variables: {
              authorizationToken: `Bearer ${responseToken.accessToken}`,
            },
          });

          if (session.user) {
            // 사용자 정보 설정
            session.user = {
              ...session.user,
              // ...
            };
          }
        }
      }

      console.debug('👤 OAuth session:>> ', session);

      return session;
    },
    /**
     * 회원 로그인 시
     * @param param0
     * @returns
     */
    async jwt({ token, account, profile, trigger }) {
      // 로그인 시  토큰 정보 저장
      if (account) {
        const apolloClient = initializeApollo();

        const socialInput = {
          type: account?.provider.toUpperCase(),
          email: profile?.email,
          identityKey: account?.providerAccountId,
        };

        // 회원 가입 - 이미 가입 되어 있는 경우 backend 측에서 가입 무시 후 회원 정보 조회
        const {
          data: { user },
        } = await apolloClient.mutate({
          mutation: SIGN_UP_BY_SOCIAL,
          variables: {
            socialInput,
          },
        });

        // TODO: 회원 가입 분기 필요
        if (!user?.id) {
          console.log('user :>> ', user);
        }

        // token 발급
        const {
          data: { signInSocialLogin },
        } = await apolloClient.mutate({
          mutation: CREATE_TOKEN,
          variables: {
            socialInput,
          },
        });

        if (!signInSocialLogin.accessToken) {
          // TODO: 토큰 미발급 시 오류 처리
          throw 'Not found service token.';
        }

        // provider 토큰 정보
        token.provider = {
          id: account.providerAccountId,
          name: account.provider.toUpperCase(),
          accessToken: account.access_token!,
          refreshToken: account.refresh_token!,
          accessExpireTime: account.expires_at!,
          refreshExpireTime: 0,
        };
        // 서비스(우리 서비스에서 사용) 토큰 정보
        token.service = {
          accessToken: signInSocialLogin.accessToken,
          accessExpireTime: signInSocialLogin.accessExpireTime,
          refreshToken: signInSocialLogin.refreshToken,
          refreshExpireTime: signInSocialLogin.refreshExpireTime,
        };
      }

      console.debug('OAuth token:>> ', token);

      return token;
    },
  },
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
