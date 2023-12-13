/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

// 마이크로프런트엔드 앱을 어떻게 사용할지 설정
const remotes = () => {
  return {
    // 예시: 'button' 은 checkout/src/pages/product/index.tsx 에서 호출해서 사용
    button:
      'my-components@http://localhost:3001/_next/static/chunks/remoteEntry.js',
  };
};

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        remotes: remotes(),
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './product': './src/pages/product/index.tsx',
          './pages-map': './pages-map.js',
        },
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
