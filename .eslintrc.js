/**
 * https://eslint.org/docs/latest/use/getting-started#configuration
 * https://eslint.org/docs/latest/rules/
 *
 * $ yarn add eslint
 *
 * ESLint 와 Prettier 충돌 해결
 * https://prettier.io/docs/en/integrating-with-linters.html
 * eslint-config-prettier : eslint 에서 prettier 와 겹치는 포매팅룰을 삭제합니다.
 * eslint-plugin-prettier : eslint 에 prettier 의 포매팅 기능을 추가합니다.
 * eslint-config-prettier 로 eslint의 원래 포매팅 기능을 없애버리고, eslint-plugin-prettier 로 prettier의 포매팅 기능을 사용합니다.
 *
 * 'eslint-config-next' 포함된 패키지
 * https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json
 * eslint, typescript
 * @typescript-eslint/parser
 * eslint-import-resolver-node, eslint-import-resolver-typescript, eslint-plugin-import
 * eslint-plugin-jsx-a11y, eslint-plugin-react, eslint-plugin-react-hooks
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

  // 전역변수를 사용하는 경우 ESLint 경고가 발생하지 않도록,
  // globals 를 이용하여 사용자 전역 변수를 추가할 수 있습니다.
  globals: {
    React: true, // React 17 이상부터 import React from 'react' 권장 제외됨 - https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
  },

  // 파서
  // 기본 설정은 espree 이고, @typescript-eslint/eslint-plugin 처럼 특정 플러그인을 사용한다면 해당 플러그인에서 제공하는 parser 로 설정하면 된다.
  parser: '@typescript-eslint/parser',

  // ESLint 사용을 위해 지원하려는 JavaScript 언어 옵션을 설정할 수 있다.
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
    },
  },

  // 플러그인은 일련의 규칙(rules) 집합이며, 플러그인을 추가하여도 규칙(rules)은 적용되지 않습니다.
  // (규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 추가해주어야 적용이 됩니다.)
  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint', 'prettier'],

  // 패키지들이나 룰들을 모아서 설정으로 만든 것
  // eslint-plugin-* 패키지의 설정은 extends 에서 plugin:패키지네임/설정네임으로 사용할 수 있는데
  // eslint-config-* 패키지의 설정은 바로 *를 써주기만 하면 된다.
  extends: [
    //'next/core-web-vitals', // Next.js 공식 : 엄격모드, ELint를 처음 설정하는 개발자에게 권장되는 구성
    //'next', // Next.js 공식 : 기본모드
    'plugin:@next/next/recommended', // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#migrating-existing-config
    //'plugin:react/recommended', // 리액트 추천 룰셋
    'plugin:@typescript-eslint/recommended', // // 타입스크립트 추천 룰셋 - https://typescript-eslint.io/linting/configs/#recommended
    'plugin:import/recommended', // import 추천 롤셋
    'plugin:import/typescript', // import typescript 롤셋
    'prettier', // 기존 각각 설정해주던 prettier 설정을 하나로 통합됨 - https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
  ],

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
    'no-empty-function': 'off', // 빈 함수를 허용하지 않도록 하는 규칙
    '@typescript-eslint/no-empty-function': 'off', // TypeScript 코드에서 빈 함수를 허용하지 않도록 하는 규칙
    'no-use-before-define': 1, // 정의 되기 전에 사용하는 것을 방지
    '@typescript-eslint/no-inferrable-types': 'off', // 숫자, 문자열 또는 부울로 '초기화된 변수 또는 매개변수'에 대한 명시적 타입 선언을 허용 여부 (초기값이 있는 변수나 매개변수는 타입추론이 가능하기 때문에 티압 선언을 안하도록 할지 여부)
    '@typescript-eslint/no-var-requires': 'off', // require 사용을 방지
    '@typescript-eslint/explicit-function-return-type': 'off', // 타입스크립트에서 함수형 컴포넌트 사용시 React.FC를 사용하지 말라는 글 관련 - https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          // https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
          '{}': false,
          object: false,
        },
      },
    ],
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

  // 프로젝트 내에서 일부 파일에 대해서만 다른 설정을 적용해줘야 할 때
  // https://www.daleseo.com/eslint-config/
  overrides: [],

  // 일부 ESLint 플러그인은 추가적인 설정이 가능
  settings: {
    'import/parser': {
      'typescript-eslint-parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect', // eslint-plugin-react가 자동 리액트버전탐지
    },
  },
};
