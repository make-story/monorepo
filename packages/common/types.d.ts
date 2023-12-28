/**
 * 애플리케이션('apps/') 또는 패키지('/packages') 공통으로 사용할 declare 선언
 *
 * -
 * package.json 에 타입정의 사용중이라는 것을 명시
 * {
 *  ...
 *  "typings": "./types.d.ts",
 *  ...
 * }
 *
 * -
 * 이 파일을 다른 곳(예를 들어 apps/mall)에서 사용하려면,
 * apps/mall/typing.d.ts
 * import '@ysm/common';
 * 코드를 넣어준다.
 */
import { Task } from 'redux-saga';
import {
  GetServerSidePropsContext as _GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Store } from '@reduxjs/toolkit';

import { TApiManager } from './apiManager';
import { TRootStateCommon } from './reducer';

import './types/global';
import './types/polyfills';

export declare global {
  declare module '*.svg' {
    import * as React from 'react';

    export const SVGComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement>
    >;
    export default SVGComponent;
  }

  declare module '*.png' {
    const value: any;
    export default value;
  }

  declare module '*.gif' {
    const value: any;
    export default value;
  }
  declare namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

declare module 'redux' {
  interface Store {
    sagaTask?: Task;
  }
}
declare module '@reduxjs/toolkit/dist/configureStore' {
  interface ToolkitStore {
    sagaTask?: Task;
  }
}

declare module 'next-redux-wrapper' {
  type _GetServersidePropsCallback<
    S extends Store = ToolkitStore<TRootStateCommon>,
    P extends {} = any,
    Strict extends boolean = false,
  > = (
    conetxt: GetServerSidePropsContext<S>,
  ) => Strict extends true ? Promise<GetServerSidePropsResult<P>> : any;

  type GetServerSidePropsContext<
    S extends Store = ToolkitStore<TRootStateCommon>,
  > = {
    store: S;
    apiManager: TApiManager;
  } & _GetServerSidePropsContext;
}

declare const emptyObjectSymbol: unique symbol;
type EmptyObject = { [emptyObjectSymbol]?: never };
