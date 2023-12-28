/**
 * axios interceptors 관련 코드
 *
 * [주의!!! 메모리릭]
 * instance.interceptors.response 인터셉터
 * return response; 꼭 해주어야 한다.
 *
 * instance.interceptors.request 인터셉터
 * return axiosConfig; 꼭 해주여야 한다.
 */
import axios from 'axios';
import { AXIOS_ERROR_CODE } from '@ysm/common/const/error';
import { API_TYPE, getAxiosConfig } from '@ysm/common/apiManager/config';
import {
  TInterceptor,
  IApiParams,
  IApiConfig,
} from '@ysm/common/apiManager/types';

/**
 * 로그
 * @param {AxiosInstance} instance : Axios 인스턴스
 * @param params : 옵션
 * @returns
 */
export const setErrorLoggerInterceptorResponse: TInterceptor = (
  instance,
  params: IApiParams = {},
) => {
  //console.log('setErrorLoggerInterceptorResponse');

  instance.interceptors.response.use(
    (response: any) => response,
    (error: Error) => {
      try {
        let message: string = `API Exception >>> "${error.message}"`;

        if (axios.isAxiosError(error)) {
          if (error.config.url) {
            const method = error.config.method?.toUpperCase() || '';
            const url =
              (error.config.baseURL || '') +
              (error.config.url
                ? error.config.url.charAt(0) !== '/'
                  ? '/'
                  : '' + error.config.url
                : '');
            message = message.concat(
              `, "${[method, url, error.config.data].join(' ').trim()}"`,
            );
          }

          if (error.response?.data) {
            message = message.concat(` ${JSON.stringify(error.response.data)}`);
          }
        }
      } catch (error: any) {
        //console.log(error?.message);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

/**
 * Axios Config
 */
export const setAxiosConfigInterceptorRequest: TInterceptor = (
  instance,
  { payload = {}, store = null }: IApiParams = {},
) => {
  //console.log('setAxiosConfigInterceptorRequest');

  // 필수값 확인
  if (!store) {
    return instance;
  }

  // interceptor
  instance.interceptors.request.use((axiosConfig: IApiConfig) => {
    if (!store) {
      return axiosConfig;
    }

    const state = store?.getState() || {}; // 현 시점의 스토어 상태값 가져오기
    const config = getAxiosConfig(API_TYPE.DEFAULT, { state });
    //console.log('axios > interceptors > request > config!!!!!', config);

    return {
      ...axiosConfig,
      ...config,
      headers: {
        ...axiosConfig.headers,
        ...config.headers,
      },
    };
  });

  return instance;
};

/**
 * 통합인증 토큰 (쿠키검사)
 */
export const setTokenInterceptorRequest: TInterceptor = (
  instance,
  { payload = {}, store = null }: IApiParams = {},
) => {
  //console.log('setTokenInterceptorRequest');

  // 필수값 확인
  if (!store) {
    return instance;
  }

  // interceptor
  instance.interceptors.request.use((axiosConfig: IApiConfig) => {
    // ...
    return axiosConfig;
  });

  return instance;
};

/**
 * 통합인증 토큰 (갱신여부, 만료여부 등)
 */
export const setTokenInterceptorResponse: TInterceptor = (
  instance,
  {
    payload = {},
    store = null,
    state = null,
    dispatch = null,
  }: IApiParams = {},
) => {
  // 필수값 확인
  if (!store) {
    return instance;
  }

  // interceptor
  instance.interceptors.response.use((response: any) => {
    if (store && response.headers?.authorization) {
      const state = store?.getState() || {};

      // ...
    }

    return response;
  });

  return instance;
};
