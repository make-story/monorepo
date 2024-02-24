/**
 * 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트 (페이지에 적용할 공통 레이아웃의 역할)
 * 모든 컴포넌트에 공통으로 적용할 속성 관리
 */
import React from 'react';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import '@/common/style/global.css';

// https://nextjs.org/docs/basic-features/typescript#custom-app
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return <Component {...pageProps} />;
};
export default App;
