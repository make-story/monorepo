# client 프로젝트 CRA (Create React App) 와 연동되는 프로젝트

`client -> 프록시 -> server` 연결되는 형태

```typescript
const app = express();

// express 프록시 환경
// https://expressjs.com/ko/guide/behind-proxies.html
// https://velog.io/@mochafreddo/Express-%EC%95%B1%EC%97%90%EC%84%9C-%ED%94%84%EB%A1%9D%EC%8B%9C-%EC%84%9C%EB%B2%84%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%A0-%EB%95%8C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%99%80-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
app.set('trust proxy', 1);

// 참고1 : 로컬 테스트 환경
import { createProxyMiddleware } from 'http-proxy-middleware';
app.use(
  '/*',
  createProxyMiddleware({
    target: 'http://localhost:9031',
    changeOrigin: true,
    secure: false,
  }),
);

// 참고2 : 개발/운영 테스트 환경
app.use('/*', (request: Request, response: Response) =>
  response.sendFile(resolve(process.cwd(), '../client/build/index.html')),
);
```
