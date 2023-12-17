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

import { getAxiosConfig } from '../config';
import { TInterceptor, IApiParams, IApiConfig } from '../types';

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
  instance.interceptors.response.use(
    (response: any) => response,
    (error: Error) => {
      try {
        let message = `API Exception >>> "${error.message}"`;

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

        console.error(null, message);
      } catch (error: any) {
        console.log(`loggingApiErr 오류 발생 >>> ${error.message}`);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

/**
 * 통합인증 토큰
 */
export const setTokenInterceptorRequest: TInterceptor = (
  instance,
  { payload = {}, store = null }: IApiParams = {},
) => {
  instance.interceptors.request.use((axiosConfig: IApiConfig) => {
    // 서버사이드의 경우
    if (typeof window === 'undefined') {
      return axiosConfig;
    }

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
  instance.interceptors.response.use((response: any) => {
    // ...

    return response;
  });
  return instance;
};
