/**
 * https://eslint.org/docs/latest/use/getting-started#configuration
 * https://eslint.org/docs/latest/rules/
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
  globals: {},

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

  // 플러그인은 일련의 규칙 집합이며, 플러그인을 추가하여도 규칙은 적용되지 않습니다.
  // (규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 extends 에 추가해주어야 적용이 됩니다.)
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

  // eslint rule 설정이 저장되어 있는 외부 file 을 extends 하는 부분이다.
  // (extends 는 추가한 플러그인에서 사용할 규칙을 설정하는 것)
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],

  // 직접 lint rule 을 적용하는 부분
  // extends로 자동으로 설정된 rules 중에, 특정 rule을 끄거나, erorr를 warning으로 나오도록 변경하는 등 설정을 바꿀 수 있다.
  // https://eslint.org/docs/latest/rules/
  rules: {
    // off: 0, warn: 1, error: 2  (cf. https://eslint.org/docs/rules/)
    indent: 0,
    //    "space-before-function-paren": 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-case-declarations': 0,
    quotes: [2, 'single'],
    'comma-spacing': [2, { before: false, after: true }],
    'key-spacing': [2, { beforeColon: false }],
    'space-infix-ops': 2,
    'prefer-const': 1,
    'import/no-unresolved': 0,
    'prettier/prettier': 2,
    'for-direction': 2,
    'no-undef': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-dupe-args': 2,
    'no-dupe-keys': 1,
    'no-unreachable': 2,
    'react/jsx-key': 2,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-vars': 2,
    'react/no-children-prop': 1,
    'react/no-deprecated': 1,
    'react/require-render-return': 2,
    'react/no-direct-mutation-state': 2,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react-hooks/rules-of-hooks': 1,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-useless-catch': 0,
    'no-empty-pattern': 0,
  },

  // 프로젝트 내에서 일부 파일에 대해서만 다른 설정을 적용해줘야 할 때
  // https://www.daleseo.com/eslint-config/
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],

  // 일부 ESLint 플러그인은 추가적인 설정이 가능
  settings: {
    'import/parser': {
      'typescript-eslint-parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
      'babel-module': {},
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
