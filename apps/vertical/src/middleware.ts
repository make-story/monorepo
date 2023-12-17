/**
 * Next.js 미들웨어
 *
 * pages 폴더와 같은 위치에 존재
 * https://nextjs.org/docs/pages/building-your-application/routing/middleware
 *
 * 미들웨어 안정화 버전
 * 12.2.0버전에서 안정화 되었고 13.0.0 버전에서 요청/응답 헤더와 응답을 변경할 수 있게 추가
 *
 * 참고자료
 * https://velog.io/@pds0309/nextjs-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%9E%80
 */

/*
미들웨어 동작 시점
(1) next.config.js의 `headers`, `redirects`
(2) Middleware
(3) nextjs.config.js의 `beforeFiles`
(4) 파일 시스템의 모든 파일 (`public`, `_next/static/, 페이지들)
(5) nextjs.config.js의 `afterFiles` 
(6) Dynamic 라우트들 (ex: `/card/[cardId]`)
(7) nextjs.config.js의 `fallback`
*/
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('nextjs');
  const allCookies = request.cookies.getAll();
  console.log(cookie);
  console.log(allCookies);

  request.cookies.has('nextjs');
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs');

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  response.cookies.set('vercel', 'fast');
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  });
  cookie = response.cookies.get('vercel');
  console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }

  return response;
}

// config의 matcher를 설정하여 원하는 경로에 미들웨어를 적용한다.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
