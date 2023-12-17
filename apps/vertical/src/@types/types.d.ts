/**
 * 공통 타입 정의
 */
//import { Task } from 'redux-saga';
import {
  GetServerSidePropsContext as _GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import {
  ToolkitStore,
  EnhancedStore,
} from '@reduxjs/toolkit/dist/configureStore';
import { Store } from '@reduxjs/toolkit';
import { Persistor } from 'redux-persist';

import { AppState } from '@/store';

declare module '@reduxjs/toolkit/dist/configureStore' {
  //interface ToolkitStore {
  interface EnhancedStore {
    __persistor?: Persistor;
    //sagaTask?: Task; // redux saga 사용할 경우
  }
}

declare module 'next-redux-wrapper' {
  type _GetServersidePropsCallback<
    //S extends Store = ToolkitStore<AppState>,
    S extends Store = EnhancedStore<AppState>,
    P extends any,
    Strict extends boolean = false,
  > = (
    conetxt: GetServerSidePropsContext<S>,
  ) => Strict extends true ? Promise<GetServerSidePropsResult<P>> : any;

  //type GetServerSidePropsContext<S extends Store = ToolkitStore<AppState>> = {
  type GetServerSidePropsContext<S extends Store = EnhancedStore<AppState>> = {
    store: S;
  } & _GetServerSidePropsContext;
}
