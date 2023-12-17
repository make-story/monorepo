/**
 * [현재] tsc 명령으로 트랜스파일링 하면 정상작동하지만, webpack을 이용하면 오류가 발생한다..
 *
 * node js 서버 관련
 * 타입스크립트 코드 -> 자바스크립트 트랜스파일링
 *
 * 주의!
 * ts-loader 와 babel-loader 차이점 존재
 * next.config.js 에서 ts-loader 사용할 경우 에러 발생 가능성 있음
 * (next.js 에서는 babel-loader 사용 권장)
 * (babel-loader 를 사용하는 경우, @babel/preset-typescript 프리셋 사용)
 * babel-loader 보다 타입검사를 꼼꼼하게 하는 ts-loader 가 더 느림
 * 이를 개선하기 위해서 fork-ts-checker-webpack-plugin을 같이 사용해주면 좋음
 * 또는 개발환경(로컬)에서는 ts-loader 로 트랜스파일링 하고, 운영환경에서는 babel-loader 로 트랜스파일링하는 방법도 존재
 *
 * 주의!
 * tsconfig.json 설정 확인 필요
 * "noEmit": false
 */
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

module.exports = {
  entry: './server.ts',
  devtool: 'source-map',
  target: 'node',
  externals: {
    express: 'require("express")',
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: [
          /*{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },*/
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json',
              //transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
