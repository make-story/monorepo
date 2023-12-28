/**
 * axios config 관련 코드
 */
import { apiDomain } from '@ysm/common/config';
import { IApiParams } from '@ysm/common/apiManager/types';

// 각 API별 구분 값
export const API_TYPE = {
  DEFAULT: 'DEFAULT',
  API: 'API',
  API_GW: 'API_GW',
  API_AUTH: 'API_AUTH',
};

// axios 기본 설정 값
const axiosDefaults = {
  headers: {
    'Content-Type': 'application/json; charset=utf8',
    'Accept-Language': 'ko',
  },
  //withCredentials: true, // 쿠키포함 (origin 다른 통신) - 서버단 'Access-Control-Allow-Credentials : true' 설정 필요, 'Access-Control-Allow-Origin : "*"' 경우 에러발생
  timeout: typeof window === 'undefined' ? 10000 : 60000, // Server Side: 10초, Client Side 60초
};

// 각 영역별 설정 값 반환
export const getAxiosConfig = (
  type: string,
  { config = {}, store = null, state = null }: IApiParams,
) => {
  // 기본값
  config = {
    ...axiosDefaults,
    ...config,
    headers: {
      ...axiosDefaults.headers,
      ...config.headers,
    },
  };

  // state
  if (store) {
    state = store?.getState();
  }
  if (state) {
    const { channel = '' } = state?.agent || {};
    const { token = '' } = state?.auth || {};
    const headers: any = {};

    // 사용자 접근 채널 (MobileWeb, MobileApp, PCWeb)
    if (channel) {
      headers['X-G1ECP-Channel'] = channel;
    }

    // 인증토큰
    if (token) {
      // 클리이언트 : 쿠키에서 토큰값 추출
      // 서버 : 스토어에서 토큰값 추출
      headers.Authorization = `Bearer ${token}`;
    }

    config = {
      ...config,
      headers: {
        ...config.headers,
        ...headers,
      },
    };
  }

  // 각 영역별
  switch (type) {
    // api gw ecp
    case API_TYPE.API:
      return {
        baseURL: `${apiDomain}`,
        ...config,
      };

    // api gw
    case API_TYPE.API_GW:
      return {
        baseURL: `${apiDomain}/gw`,
        ...config,
      };

    // 기본 설정
    case API_TYPE.DEFAULT:
    default:
      return config;
  }
};
