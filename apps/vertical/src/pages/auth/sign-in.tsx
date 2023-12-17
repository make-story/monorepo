import { useMemo } from 'react';
import type { InferGetServerSidePropsType } from 'next';
import type { LiteralUnion } from 'next-auth/react';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import type { BuiltInProviderType } from 'next-auth/providers';
import { getServerSession } from 'next-auth/next';
// import Lottie from 'react-lottie';
// import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { wrapper } from '@/store';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  `,
  ImageWrap: styled.div`
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 16px;
  `,
  LottieArea: styled.div`
    width: 360px;
    max-width: 360px;
  `,
  ButtonWrap: styled.div`
    display: block;
    position: fixed;
    bottom: 0;
    text-align: center;
  `,
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const buttons = useMemo(
    () =>
      Object.values(providers).map(provider => {
        return {
          name: provider.name,
          id: provider.id,
        };
      }),
    [],
  );

  return (
    <>
      {Object.values(buttons).map(provider => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          title={provider.name}
        >
          {provider.name}
        </button>
      ))}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}>(async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers:
        providers ??
        ({} as Record<
          LiteralUnion<BuiltInProviderType, string>,
          ClientSafeProvider
        >),
    },
  };
});
