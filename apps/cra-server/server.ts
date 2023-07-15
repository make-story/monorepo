/**
 * 서버 실행 파일
 */
import { resolve } from 'path';
import express, { Request, NextFunction, Response } from 'express';
import { json, text, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

function encode(value: any, debug = false): string {
  try {
    if (value === undefined || value === null || value instanceof Function) {
      value = '';
    }
    return btoa(JSON.stringify(value));
  } catch (exception) {
    if (debug) {
      console.debug('[encode]', exception);
    }
    return '';
  }
}

function decode<T = any>(value?: string | null, debug = false): T | null {
  if (typeof value !== 'string') {
    throw new Error(typeof value);
  }
  try {
    return JSON.parse(atob(value)) as T;
  } catch (exception) {
    if (debug) {
      console.debug('[decode]', exception);
    }
    return null;
  }
}

const app = express();

// express 프록시 환경
// https://expressjs.com/ko/guide/behind-proxies.html
// https://velog.io/@mochafreddo/Express-%EC%95%B1%EC%97%90%EC%84%9C-%ED%94%84%EB%A1%9D%EC%8B%9C-%EC%84%9C%EB%B2%84%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EB%95%8C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%99%80-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
app.set('trust proxy', 1);

// 미들웨어 설정
app.use([json(), urlencoded({ extended: false }), text(), cookieParser()]);
app.use((request: Request, response: Response, next: NextFunction) => {
  // 쿠키 세팅 또는 헤더값 인코딩/디코딩
  return next();
});

// 로컬환경
app.use(
  '/*',
  createProxyMiddleware({
    target: 'http://localhost:9031',
    changeOrigin: true,
    secure: false,
  }),
);
// 개발/운영환경
app.use('/*', (request: Request, response: Response) =>
  response.sendFile(resolve(process.cwd(), '../client/build/index.html')),
);

app.listen(9030, () => {
  console.log('server 9030');
});
