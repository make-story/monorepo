import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Action, AnyAction, Store } from '@reduxjs/toolkit';

import { TApiManager } from '../index';

// axios 인스턴스에 config 주입
export interface IApiConfig extends AxiosRequestConfig {
  headers?: {
    Authorization?: string;
    //'x-api-key'?: string;
  };
}

// payload 파라미터 (추가 옵션)
export interface IOneApAuthorize {
  token?: string | null; // 인증토큰
}
export interface IApiPayload extends IOneApAuthorize {
  channel?: string;
  accessToken?: string | null;
}

// API 파라미터
export interface IApiParams {
  config?: IApiConfig; // axios config
  payload?: IApiPayload; // 추가 파라미터
  store?: Store | null; // 스토어
  state?: any; // 스토어 상태
  dispatch?: any;
  test?: boolean; // 테스트 전용
}

// 인터셉터
export type TInterceptor = (instance: AxiosInstance, params?: IApiParams) => void;

export type TActionWithApiManager<A extends Action = AnyAction> = A & {
  apiManager: TApiManager;
};
