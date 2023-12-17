/**
 * axios config 관련 코드
 */
import { IApiParams } from '../types';

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
export const getAxiosConfig = ({
  config = {},
  store = null,
  state = null,
}: IApiParams) => {
  // 기본값
  config = {
    ...axiosDefaults,
    ...config,
    headers: {
      ...axiosDefaults.headers,
      ...config.headers,
    },
  };

  // ...

  return config;
};
