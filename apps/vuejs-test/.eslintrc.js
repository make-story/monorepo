/**
 * https://eslint.org/docs/latest/use/getting-started#configuration
 * https://eslint.org/docs/latest/rules/
 *
 * ESLint 와 Prettier 충돌 해결
 * eslint-config-prettier : eslint에서 prettier와 겹치는 포매팅룰을 삭제합니다.
 * eslint-plugin-prettier : eslint에 prettier의 포매팅 기능을 추가합니다.
 * eslint-config-pretteir로 eslint의 원래 포매팅 기능을 없애버리고, eslint-plugin-prettier로 prettier의 포매팅 기능을 사용합니다.
 */

module.exports = {
  // ESLint 구성파일 탐색 범위
  // default 는 true 인데, 이 값이 true 가 아니면, eslintrc 파일을 찾을 때,
  // 해당 프로젝트 디렉토리 뿐 아니라, 내 PC의 root 파일 시스템 root 디렉토리까지 eslint 를 찾는다.
  root: true,

  // 프로젝트의 사용 환경을 설정한다.
  // https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  // 파서
  // eslint-plugin-vue (vue-eslint-parser)
  parser: 'vue-eslint-parser',

  // ESLint 사용을 위해 지원하려는 JavaScript 언어 옵션을 설정할 수 있다.
  parserOptions: {
    sourceType: 'module',
  },

  // eslint rule 설정이 저장되어 있는 외부 file 을 extends 하는 부분이다.
  // (extends 는 추가한 플러그인에서 사용할 규칙을 설정하는 것)
  extends: ['eslint:recommended', 'plugin:vue/essential'],
};
