import { Task } from 'redux-saga';
import { GetServerSidePropsContext as _GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { TApiManager } from './apiManager';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Store } from '@reduxjs/toolkit';
import { TRootStateCommon } from './reducer';

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
    Strict extends boolean = false
  > = (conetxt: GetServerSidePropsContext<S>) => Strict extends true ? Promise<GetServerSidePropsResult<P>> : any;

  type GetServerSidePropsContext<S extends Store = ToolkitStore<TRootStateCommon>> = {
    store: S;
    apiManager: TApiManager;
  } & _GetServerSidePropsContext;
}

declare const emptyObjectSymbol: unique symbol;
type EmptyObject = { [emptyObjectSymbol]?: never };
