/**
 * apiManager
 * axios 각 영역별 인스턴스 생성
 */
import { createAxiosInstance, applyAxiosInterceptor } from './utils';
import {
  setErrorLoggerInterceptorResponse,
  setTokenInterceptorResponse,
} from './interceptors';
import { IApiParams } from './types';
import { getAxiosConfig } from './config';
export * from './utils';

/**
 * 기본 API 인스턴스
 */
export const api = (params: IApiParams = {}) => {
  // 인스턴스
  const instance = createAxiosInstance(getAxiosConfig(params));

  // 인터셉터
  applyAxiosInterceptor(
    instance,
    [setErrorLoggerInterceptorResponse, setTokenInterceptorResponse],
    params,
  );

  //console.log('api instance', instance);
  return instance;
};

/**
 * API 생성
 */
export const createApiManager = (params: IApiParams = {}) => {
  // 각 API 별 axios 인스턴스 생성, config 설정, 인터셉터 주입
  return {
    api: api(params),
  } as const;
};
export type TApiManager = ReturnType<typeof createApiManager>;
