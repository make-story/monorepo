/**
 * Next.js 설정
 * https://nextjs.org/docs/pages/api-reference/next-config-js
 */
const path = require('path');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * Next.js 환경변수
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order
 *
 * Next.js 는 자동으로 process.env.NODE_ENV 변수를 생성하고, 구동 환경에 따라 아래의 3가지 값을 주입
 * - development : 개발 환경(npm run dev로 구동한 경우)
 * - production : 배포 환경(npm run build로 빌드한 경우)
 * - test : 테스트 환경(process.env.NODE_ENV === 'test')
 */
const isProd = process.env.NODE_ENV === 'production'; // 운영환경
const isDev = process.env.NODE_ENV === 'development'; // 개발환경

/**
 * Next.js 설정
 * https://nextjs.org/docs/pages/api-reference/next-config-js
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // JavaScript 번들에 환경 변수를 추가 (브라우저 환경에서도 접근할 수 있는 환경 변수)
  // https://nextjs.org/docs/pages/api-reference/next-config-js/env
  env: {
    PORT: process.env.PORT,
    REACT_APP_ENV: process.env.REACT_APP_ENV,
  },

  // https://nextjs.org/docs/pages/api-reference/next-config-js/reactStrictMode
  reactStrictMode: true,

  // 빌드 파일 결과물 경로 (기본값 .next 로 되어있을 경우, jenkins 등 CI/CD도구에서 일부 숨김파일로 인식)
  distDir: '_next',

  // 정적파일 경로
  // 중요!! 이 경로 설정에 따라 Nested routes (Depth) 영향 받을 수 있음!
  // 예를 들어, pages/dashboard/settings/username 깊이가 있는 page path 에서는 './' 처럼 상대경로로 지정할 경우,
  // webpack build 파일을 잘못된 경로로 로드하여 불러오지 못하는 에러 발생 가능성 있음!!
  assetPrefix: isProd ? '/' : undefined,

  /**
   * https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
   * 23년 Next.js 공식 페이지 기준, 비추천 방식으로 가이드 되어 있음
   *
   * import getConfig from "next/config";
   * const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
   *
   * SSG(Static Site Generator)에서는 동작하지 않고 SSR(Server-Side Rendering)에서만 동작
   */
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},

  // 웹팩설정
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    return config;
  },

  // 외부 종속성 트랜스파일
  // Next.js 13 버전 이하의 경우 'transpilePackages' 설정이 아닌, 'next-transpile-modules' NPM 패키지 활용해야 한다.
  // https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages
  transpilePackages: [],

  // compiler
  // Babel 구성 파일이 있을 경우 제외
  // https://nextjs.org/docs/messages/ignored-compiler-options
  /*compiler: {
    // https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    // https://github.com/vercel/next.js/tree/canary/examples/with-emotion
    emotion: {
      sourceMap: true,
    },
  },*/

  // GET Proxy
  // https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
  // https://www.edmondchuc.com/blog/next-js-development-proxy-server/
  /*async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:9030/api/:path*',
      },
    ];
  },*/
};

module.exports = nextConfig;
