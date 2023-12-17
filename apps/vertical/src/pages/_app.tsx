/**
 * 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트 (페이지에 적용할 공통 레이아웃의 역할)
 * 모든 컴포넌트에 공통으로 적용할 속성 관리
 */
import React, { useEffect } from 'react';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Global, css } from '@emotion/react';
import { SessionProvider, signIn } from 'next-auth/react';

import { globalStyle } from '@/common/styles/global';
import { wrapper } from '@/store';
import { useApollo } from '@/common/apollo/client/apolloClient';
import '/public/index.css';

// https://nextjs.org/docs/basic-features/typescript#custom-app
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
  ...rest
}: AppProps) => {
  const isServer = typeof window === 'undefined';
  // 'next-redux-wrapper' 버전 8.x 이상의 경우 'useWrappedStore' 방식 사용 (그 이하 버전에서는 wrapper.withRedux(App) 방식 사용)
  // https://velog.io/@mangojang/error-next-redux-wrapper-%EC%82%AC%EC%9A%A9-%EC%8B%9C-Use-createWrapper
  const { store, props } = wrapper.useWrappedStore(rest);
  // https://blog.soaresdev.com/configurando-apollo-client-no-nextjs/
  const apolloClient = useApollo(rest);

  /**
   * OAuth refresh token
   * FIXME: OAuth 토큰 재발급이 필요한가?
   * @see https://authjs.dev/guides/basics/refresh-token-rotation
   */
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <>
      {/* redux */}
      <ReduxProvider store={store}>
        {/* redux-persist - https://github.com/vercel/next.js/issues/8240 */}
        <PersistGate persistor={store.__persistor} loading={null}>
          {() => (
            <>
              {/* apollo */}
              <ApolloProvider client={apolloClient}>
                <SessionProvider session={session}>
                  <Global styles={globalStyle} />
                  <Component {...props.pageProps} />
                </SessionProvider>
              </ApolloProvider>
            </>
          )}
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default App;
//export default wrapper.withRedux(App);
