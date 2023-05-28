/**
 * 서버 실행 파일
 */
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

app.set('trust proxy', 1);

app.use([json(), urlencoded({ extended: false }), text(), cookieParser()]);
app.use((request: Request, response: Response, next: NextFunction) => {
  // 쿠키 세팅 또는 헤더값 인코딩/디코딩
  return next();
});
app.use('/*', (request: Request, response: Response) => {
  // 로컬환경
  return createProxyMiddleware({
    target: 'http://localhost:9031',
    changeOrigin: true,
    secure: false,
  });
  // 개발/운영환경
  //return response.sendFile(resolve(process.cwd(), '../client/build/index.html'));
});

app.listen(9030, () => {
  console.log('server 9030');
});
