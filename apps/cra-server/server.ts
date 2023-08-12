/**
 * 서버 실행 파일
 */
import { resolve } from 'path';
import express, { Request, NextFunction, Response } from 'express';
import dotenv from 'dotenv';
import { json, text, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
//import cors from 'cors';

// Exception Handler 등록
// UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
// https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
process.on('uncaughtException', error => {
  console.log('uncaughtException ', error);
});

// env 환경
dotenv.config();
const isProd: boolean = process.env.NODE_ENV === 'production';
const port = isProd && process.env.PORT ? process.env.PORT : 9030;

// express
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

// API 처리 - GraphQL 서버 연결
app.use('/api/v1', async (request: Request, response: Response, next: NextFunction) => {
  console.log('request!!!!', request.baseUrl);

  // axios
  // ...

  return next();
});

// 로컬환경 SPA HTML (CRA 서버 접근)
app.use(
  '/*',
  createProxyMiddleware({
    target: 'http://localhost:9031',
    changeOrigin: true,
    secure: false,
  }),
);

// 개발/운영환경 SPA HTML (빌드된 HTML 로드)
/*app.use('/*', (request: Request, response: Response) =>
  response.sendFile(resolve(process.cwd(), '../client/build/index.html')),
);*/

// 서버 실행
app.listen(port, () => console.log(`[CRA Server!!] http://localhost:${port}`));
