const path = require('path');
const dotenv = require('dotenv');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['monorepo-common']);

const isDev = process.env.NODE_ENV === 'development';
//dotenv.config({ path: path.join(__dirname, `.envs/.env.${process.env.NODE_ENV}`), silent: true });

const config = {
  //basePath: '/',
  distDir: '_next',
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
  // 웹팩설정
  webpack: (config, { isServer }) => {
    //config.devtool = 'hidden-source-map'; // 'eval'
    config.resolve.alias = {
      ...config.resolve.alias,
      // https://velog.io/@bigbrothershin/Next.js-Webpack-%EC%84%A4%EC%A0%95%EB%93%A4
      //'next/head': 'next/dist/next-server/lib/head.js',
      //'next/router': 'next/dist/client/router.js',
      //'next/config': 'next/dist/next-server/lib/runtime-config.js',
      //'next/dynamic': 'next/dist/next-server/lib/dynamic.js',
      //next: path.resolve(__dirname, './node_modules/next'),
    };
    config.module.rules.push({
      test: /\.(svg)$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
        // 'url-loader',
      ],
    });
    if (!isServer) {
      config.node = {
        fs: 'empty',
        'fs-extra': 'empty',
      };
    }
    return config;
  },
  // 리다이렉트
  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  /*async redirects() {
    return [
      {
        // 해당 URL 접근시
        source: '/main',
        // 리다이렉트
        destination: '/display/main',
        permanent: true,
      },
    ];
  },*/
  async rewrites() {
    return [
      {
        // 해당 URL 접근시
        source: '/my/page/12345',
        // pages 작동
        destination: '/my/page/test',
      },
    ];
  },
  //
  experimental: {
    // 스크롤 복원
    scrollRestoration: true,
  },
};

//module.exports = config;
module.exports = withPlugins([withTM], config);
