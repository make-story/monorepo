/**
 * https://eslint.org/docs/latest/use/getting-started#configuration
 * https://eslint.org/docs/latest/rules/
 *
 * ESLint 와 Prettier 충돌 해결
 * eslint-config-prettier : eslint에서 prettier와 겹치는 포매팅룰을 삭제합니다.
 * eslint-plugin-prettier : eslint에 prettier의 포매팅 기능을 추가합니다.
 * eslint-config-pretteir로 eslint의 원래 포매팅 기능을 없애버리고, eslint-plugin-prettier로 prettier의 포매팅 기능을 사용합니다.
 */

export default {
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

  // 플러그인은 일련의 규칙(rules) 집합이며, 플러그인을 추가하여도 규칙(rules)은 적용되지 않습니다.
  // (규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 추가해주어야 적용이 됩니다.)
  plugins: ['import', 'prettier'],

  // 패키지들이나 룰들을 모아서 설정으로 만든 것
  // eslint-plugin-* 패키지의 설정은 extends 에서 plugin:패키지네임/설정네임으로 사용할 수 있는데
  // eslint-config-* 패키지의 설정은 바로 *를 써주기만 하면 된다.
  extends: ['eslint:recommended', 'plugin:vue/essential'],

  // 직접 lint rule 을 적용하는 부분
  // extends 로 자동으로 설정된 rules 중에, 특정 rule을 끄거나, erorr를 warning으로 나오도록 변경하는 등 설정을 바꿀 수 있다.
  // https://eslint.org/docs/latest/rules/
  // off: 0, warn: 1, error: 2
  rules: {
    indent: 0, // 들여쓰기
    'no-mixed-spaces-and-tabs': 2, // 들여쓰기를 위해 공백과 탭을 혼합하는 것
    quotes: [2, 'single'], // 큰따옴표 또는 작은따옴표
    'comma-spacing': [2, { before: false, after: true }], // 쉼표 앞뒤에 일관된 간격
    'key-spacing': [2, { beforeColon: false }], // {} 속성의 키와 값 사이에 일관된 간격
    'space-infix-ops': 2, // 연산자 사이 공백
    'prefer-const': 1, // const 선언이 필요한 부분 확인
    'import/no-unresolved': 0,
    'for-direction': 2, // for 반복문
    'no-undef': 0,
    'no-console': 0, // console. 허용 여부
    'no-unused-vars': 0, // 사용되지 않는 변수
    'no-dupe-args': 2, // 중복 인수(변수명) 허용
    'no-dupe-keys': 1, // {} 중복 키 허용
    'no-unreachable': 2, // return, throw, continue, break 뒤에 코드 혀용 여부
    'no-useless-catch': 0, // 불필요한 catch
    'no-empty-pattern': 0, // 객체 해체 할당 관련
    'no-use-before-define': 1, // 정의 되기 전에 사용하는 것을 방지
    'vue/multi-word-component-names': 0,
    // import 순서 규칙 설정 - eslint-plugin-import - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    // 코드 저장시 설정된 값 자동 반영을 위해서는 사용중인 IDE 도구(예: VSCode) 추가 설정 필요 - settings.json
    // vscode 의 경우 CTRL + SHIFT + P 입력 후, ESLint: Restart ESLint Server 선택해서 다시 실행
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'type',
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
