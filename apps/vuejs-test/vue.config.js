/**
 * https://cli.vuejs.org/config/#vue-config-js
 * vue CLI 3버전부터는 vue.config.js 로 웹팩 설정을 관리
 * 웹팩의 기본 설정이 이 cli-service 모듈에 감춰져 있음
 *
 * vue-cli-service 구성한 웹팩 설정 확인 명령어 (확인용도, 출력은 유효한 webpack 구성 파일이 아니며 검사용으로만 사용되는 직렬화된 형식)
 * https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config
 * $ vue inspect > output.js
 * $ vue inspect --mode production > output.prod.js
 */
//const { defineConfig } = require('@vue/cli-service');
import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  // transpileDependencies
  // babel-loader과 관련된 항목으로 babel-loader는 default로 node_modules 하위에 있는 항목들은 처리를 하지 않는데 transpileDependencies 항목으로 지정된 경우에는 처리를 해주게 됩니다.
  transpileDependencies: true,
  //
  lintOnSave: false,
});

/*
// https://cli.vuejs.org/guide/webpack.html
module.exports = {
  // webpack-merge
  configureWebpack: {
    plugins: [],
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // mutate config for production...
  //   } else {
  //     // mutate for development...
  //   }
  // },
};
*/
