`study.git/아키텍처_설계_전략/프로젝트_저장소_구성_기법/모노레포_구축.md` 참고!

# NPM 공식 Monorepos

https://blog.npmjs.org/post/186494959890/monorepos-and-npm.html

# 네이버 - 개념, 구축 (추천 자료)

https://d2.naver.com/helloworld/0923884  
https://d2.naver.com/helloworld/7553804

`Yarn은 다른 모노레포 도구에 비해 지원하는 것들이 많지는 않지만, 모노레포 사용의 목적이 단순히 공통 요소를 공유하는 것이라면 Yarn으로 workspace을 구성해서 개발을 진행하는 것을 추천` 네이버 글 내용 중

# 배달의 민족 (추천자료)

https://techblog.woowahan.com/7976/  
https://github.com/kowoohyuk/monorepo-template

# 라인

https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/

# 구글 모놀리식 저장소, 코드베이스

https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext

# Next.js + yarn workspaces

https://medium.com/lemonade-engineering/yarn-workspace%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-monorepo-%EA%B5%AC%EC%84%B1-a7d61b9fa572

https://github.com/th0th/nextjs-typescript-yarn-workspaces

https://github.com/zooniverse/front-end-monorepo

https://betterprogramming.pub/converting-next-into-a-monorepo-with-yarn-workspaces-bf4007fdfa87  
https://github.com/wk0/boilerplate-next/tree/as-workspace

---

# 모노레포 전략

`모놀리식 방식은 소스 코드를 모듈화하지 않고 하나의 리포지터리에 모두 넣었다고 생각하시면 됩니다.`  
(동일저장소에 있는 다른 프로젝트 패키지 참조)

모든 코드가 단일 버전으로 서로 직접 의존하기 때문에 코드 재사용이 용이하고 빌드 및 배포 과정도 단순하지만,  
관심 분리가 어렵고 기능 추가나 삭제가 리포지터리 전체에 영향을 줄 수 있다는 단점이 있습니다.  
이런 단점을 해결하고자 멀티레포 방식이 등장했습니다.

멀티 레포 방식에서는 소스 코드를 모듈화한 뒤  
각 모듈에 독자적인 영역을 부여하고 버전 관리를 통해 관심을 분리해서  
기능 변경이 다른 리포지터리에 직접 영향을 미치지 않도록 개선했습니다.  
하지만 각 모듈이 서로 독립된 영역에 존재하기 때문에 코드 단계에서의 재사용이 어려워졌고 빌드와 배포 과정이 복잡해졌습니다.

`모노레포는 이와 같은 모놀리식 리포지터리와 멀티레포의 장점을 모두 취하고자 등장`했습니다.  
모노레포의 장점은 아래와 같습니다.

- Visibility
  - 리포지터리가 하나이기 때문에 모든 프로젝트의 코드와 자원(assets) 간의 관계와 의존성을 한눈에 확인할 수 있습니다.
- Collaboration
  - 모든 커밋 히스토리가 한 리포지터리에 남기 때문에 히스토리를 추적하거나 전체 리포지터리의 개발 방향을 이해하는 게 쉬워집니다.
  - 여러 곳에서 중복으로 사용하는 자산들(테스트 코드 등)을 공유하고 재사용할 수 있습니다.
- Speed
  - 배포와 빌드, 테스트와 같은 작업을 병렬로 한 번에 처리할 수 있으므로 한 번의 명령으로 여러 개의 리포지터리에서 작업을 진행할 수 있습니다.

https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext

> `모노레포는 단일 리포지터리에 여러 개의 서브 프로젝트(각각 모듈화된 프로젝트)가 존재하는 방식`

> `모노레포란 같은 레포지토리에서 서로 다른 프로젝트들을 관리하는 소프트웨어 개발 전략`

---

# NPM workspace ?

- 워크스페이스는 작업공간을 의미한다.
  작업공간은 최상위 패키지내에서 여러 패키지(프로젝트)를 관리  
  작업공간내에 있는 패키지들은 서로 참조하는 연관관계를 맺을 수 있음

- 워크스페이스를 사용하는 이유
  각 패키지에 의존성을 공통으로 관리  
  최상위 패키지에서 하위 패키지들에 package.json 의 종속성을 한번에 설치가 가능  
  워크스페이스내에 패키지들은 자동으로 심볼릭 링크를 적용해줌

워크스페이스를 구성하는데, npm 또는 yarn 패키지매니저를 사용
npm v7 이 정식으로 나오면서 모노레포를 지원

https://yceffort.kr/2021/07/npm-workspaces-esbuild  
https://docs.npmjs.com/cli/v7/using-npm/workspaces/

npm workspace 를 활용하면,  
npm install 을하면 자동으로 패키지를 link 해주고,  
서로 다른 패키지 레벨에서 npm link할 필요 없이 알아서 현재 폴더의 node_modules를 가지고 연결해줌

---

# Yarn

`Yarn(1.x) 또는 npm(7.x)`의 workspaces 필드를 사용해 간단히 모노레포를 구성할 수 있다.  
yarn link 또는 npm link 기능을 선언적으로 사용하는 것으로 node_modules 디렉터리에 workspace에 대한 심볼릭 링크가 생성된다.  
이를 통해 하나의 저장소에 있는 여러 프로젝트가 서로 쉽게 상호 참조할 수 있다.

## 용어

- project
  - = 저장소
  - 하나 이상의 worktree 포함
  - 최소 한 개의 workspace(즉, 루트 workspace) 존재
- workspace
  - = 모노레포 패키지
- worktree
  - 자식 workspace를 갖는 workspace

`Yarn Berry (2.x, 3.x)` - Yarn2, Yarn3, Yarn Berry 등은 Yarn 1.x 이후 불리는 표현  
Yarn workspace를 도입하려고 할 때 성능면에서 Yarn Berry를 함께 검토해 볼 수 있다.  
Yarn Berry는 yarn의 두 번째 버전으로, 2018년 9월 yarn의 RFC 저장소에서 시작되었다.  
Yarn 1.x의 주요 개발자인 Mael Nison에 의해 TypeScript로 개발되었고 2020년 1월 25일 정식 버전이 출시되었다.  
Yarn 1.x는 v1.22.17에서 코드 프리징되었고 https://github.com/yarnpkg/berry 에서 2022.03.09 현재 v3.2.0이 출시되었다.

```
$ npm install -g yarn
```

---

# Yarn 활용 모노레포 구축

## 1. package.json 생성

```
$ yarn init -y
```

## 2. package.json 값 설정 (root 폴더, workspaces 활성화)

package.json
`name 값이 프로젝트간 내부 코드상의 import 경로에 사용됨`

```javascript
{
  "name": "@monorepo",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "packages/**"
    ]
  }
}
```

`private 가 true 인 이유는 워크스페이스는 publish 되는게 아니기 때문`
private: true 로 지정함으로써 Root 가 NPM Repository로 배포되는 것을 막아준다.

또는

```javascript
{
  "name": "@monorepo",
  "version": "1.0.0",
  "workspaces": [
    "docs",
    "packages/**/**",
    "configs/*"
  ]
}
```

## 3. 루트 디렉토리에서 packages 디렉토리 생성 후, 그 안에 pack-a 와 pack-b 패키지를 생성

root 폴더 하위 여러 프로젝트 단위 폴더 생성

```
$ mkdir packages packages/pack-a packages/pack-b
$ cd packages/pack-a
$ yarn init -y
$ cd ../pack-b
$ yarn init -y
```

packages/pack-a/package.json

```javascript
 {
  "name": "@monorepo/pack-a",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT"
}
```

packages/pack-b/package.json
`pack-b 프로젝트는 pack-a 1.0.0 버전을 의존`

```javascript
 {
  "name": "@monorepo/pack-b",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@monorepo/pack-a": "1.0.0"
  }
}
```

또는 `로컬 패키지 참조`

https://yarnpkg.com/features/workspaces#workspace-ranges-workspace

```javascript
 {
  "name": "@monorepo/pack-b",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@monorepo/pack-a": "workspace:pack-a"
  }
}
```

```javascript
 {
  "name": "@monorepo/pack-b",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@monorepo/pack-a": "workspace:*"
  }
}
```

```javascript
 {
  "name": "@monorepo/pack-b",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@monorepo/pack-a": "*"
  }
}
```

## 4. yarn workspace 에서 패키지 추가를 위해서는, 기존 yarn add [패키지 이름]이 아닌, 다른 방법(명령어) 사용

### pack-a 에 패키지 추가 예

```
$ yarn workspace pack-a add [패키지 이름]
```

### pack-a 에 패키지 삭제 예

```
$ yarn workspace pack-a remove [패키지 이름]
```

### 루트 디렉토리에 패키지 추가 예

```
$ yarn add [패키지 이름] -W
```

## 특정 프로젝트에서 다른 프로젝트의 모듈(코드) import 하여 사용하는 예

pack-a/Button.js

```javascript
import React from 'react';
export const Button = props => {
  return <button {...props}>{props.children}</button>;
};
```

pack-b/index.js

```javascript
import Head from 'next/head';
import { Button } from '@monorepo/pack-a/Button'; // package.json 의 name 항목의 값 확인 필수!
const Home = () => (
  <div className='container'>
    <Head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <main>
      <h1 className='title'>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>
      <Button>Hello World</Button>
    </main>
  </div>
);
```

### 중요: Next.js는 빌드 시 프로젝트 디렉토리 안의 파일들만 트랜스파일 한다.

https://medium.com/lemonade-engineering/yarn-workspace%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-monorepo-%EA%B5%AC%EC%84%B1-a7d61b9fa572

`next-transpile-modules` 패키지 설정  
외부 모듈도 트랜스파일이 가능

`Next.js 버전에 따라, next-transpile-modules 지정된 버전(Compatibility table) 사용해야 함`  
https://www.npmjs.com/package/next-transpile-modules

next.config.js

```javascript
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  // 현재 프로젝트 폴더 기준, 외부(다른 프로젝트 경로) 참조
  // 아래 예시의 '@project' 는  package.json name 값
  '@monorepo/pack-a',
]);

module.exports = withPlugins([withTM]);
```

또는

https://github.com/vercel/next.js/pull/22867

```javascript
const nextConfig = {
  experimental: {
    // this will allow nextjs to resolve files (js, ts, css)
    // outside packages/app directory.
    externalDir: true,
  },
};
export default nextConfig;
```

## 5. root 에서 프로젝트 스크립트 실행

```javascript
{
  // ...
  "scripts": {
    "dev:pack-a": "yarn workspace pack-a dev",
    "build:pack-a": "yarn workspace pack-a build",
    "start:pack-a": "yarn workspace pack-a start",
    "test:pack-a": "yarn workspace pack-a test",
    "test:w:pack-a": "yarn workspace pack-a test:w",

    "run:pack-a": "cd packages/blog && yarn develop",
    "run:pack-b": "cd packages/shop && yarn develop",
    "run:all": "npm-run-all --parallel run:pack-a run:pack-b"
  },
  // ...
}
```

### 개별 프로젝트의 스크립트 실행

```
$ yarn workspace pack-a [scripts 명령]
```

---

## yarn workspaces 의 호이스팅(심볼릭링크, 바로가기 형태) 방식 예

root 위치

```
$ yarn workspace pack-a add react
$ yarn workspace pack-b add react
```

위와 같이 실행할 경우,
root 의 node_modules 폴더에 react 패키지가 설치된 것을 볼 수 있다.
(`pack-a, pack-b의 node_modules 디렉토리에 추가되는 것이 아니라, 루트 경로의 node_modules 연결됨. symbolic link`)

## 모든 패키지가 yarn workspaces 의 호이스팅 방식을 지원하는 것은 아님

nohoist 항목에 추가된 패키지는 호이스팅 되지 않고 각각의 프로젝트 또는 패키지의 node_modules에 추가
`nohoist 를 이용하면, 각 프로젝트의 의존성 모듈을 프로젝트 내 각 로컬 node_modules 에 설치`

---

# 중요: 다른 프로젝트의 참조는 package.json 의 name 으로 식별하며, 다른 프로젝트는 아래와 같은 방식으로 해당 프로젝트를 참조하게 됩니다.

https://yarnpkg.com/features/workspaces

package.json

```javascript
{
  "dependencies": {
    "@common/components": "workspace:*",
    "@common/styles": "workspace:*",
    ...
  }
}
```

또는

```javascript
{
  "dependencies": {
    "@common/components": "*",
    "@common/styles": "*",
    ...
  }
}
```

디펜던시 항목을 수정한 뒤에는 반드시 yarn install 을 실행해서 디펜던시 참조 관계를 다시 불러와야 한다.

```
$ yarn
```

`패키지를 npm서버에서 탐색하는 경우, 해당 프로젝트 다시 세팅`

# 중요: workspace 의존 관계 확인 (연결된 구조 확인하고 싶을 때)

```
$ yarn workspaces info
```

Yarn 2.x 이후에는 yarn workspaces list를 사용한다.

---

# 기타 설정

## prettier 설정

prettier의 경우 프로젝트별로 스타일 컨벤션을 굳이 다르게 가져가야 하는 경우가 아니라면,  
루트에 설정 파일을 공통으로 두고 활용

## eslint 설정

루트에 설정 파일을 공통으로 두고 관리가능하나  
필요하다면 경로별 override 가 가능하기 때문에 루트에 설정 파일을 하나만 놓고 관리하는 것이 가능
`다만 typescript 프로젝트들을 개발하는 경우 플러그인의 조합에서 문제가 발생하는 경우가 있음`

각 프로젝트별 tsconfig.json 설정을 따르기 위해 setting/overrides 에 프로젝트별 설정이 필요  
`각 프로젝트 별로 resolver 설정을 override 해주어야 오류를 내지 않고 정상적으로 린팅`

eslintrc.js

```javascript
"overrides": [
  {
    files: [
      'packages/pack-a/**/*.ts?(x)',
      'packages/pack-a/**/*.js?(x)',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(
            // tsconfig.json 경로
            "./packages/pack-a/tsconfig.json"
          ),
        },
      },
    },
  },
  {
    files: [
      'packages/pack-b/**/*.ts?(x)',
      'packages/pack-b/**/*.js?(x)',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(
            // tsconfig.json 경로
            "./packages/pack-b/tsconfig.json"
          ),
        },
      },
    },
  },
]
```

## tsconfig 설정

tsconfig의 경우는 각 프로젝트 별로 서로 다르게 가져가야 하는 설정이 많고 (리액트 관련 설정, path alias, include, exclude 등)  
이를 루트에서 override 하기 어렵기 때문에 각 프로젝트 루트에 tsconfig.json 을 별도로 두고 관리

다만 공통되는 설정이 있다면 루트 tsconfig.json 에 정의해 주고,  
이를 각 프로젝트에서 extend 한 후 특정 설정만 바꿔주는 방식을 쓰면 조금 더 효율적인 관리가 가능

- typescript 는 tsconfig 설정이 중요 (최상위 설정파일이 존재하고, 하위로 각각의 설정파일이 존재할 경우 아래 설정 필수)

  - 최상위 tsconfig : references 설정
  - 각 프로젝트별 tsconfig : composite 설정, declaration 설정

- baseUrl 설정된 기준 경로 중요함

tsconfig.json

```javascript
{
  "references": [
    {
      "path": "packages/프로젝트"
    },
    {
      "path": "packages/프로젝트"
    },
  ],
}
```

### references 필드

https://typescript-kr.github.io/pages/project-references.html

https://blog.shik.kr/typescript-project-reference/

https://www.typescriptlang.org/docs/handbook/project-references.html

https://github.com/RyanCavanaugh/project-references-demo

yarn workspace 아래에 @pack/a, @pack/b, @pack/c 3개 프로젝트가 있고, a 프로젝트가 b, c 프로젝트를 불러와서 사용하는 경우를 가정  
a 프로젝트를 트랜스파일 하려면 b, c 프로젝트를 빌드해야 하는데  
이걸 yarn workspaces run tsc 이런 식으로 동시에 돌릴 수도 없고 (의존하는 패키지 빌드가 먼저 끝나야 다음 패키지 빌드를 할 수가 있다) 결국 빌드 스크립트가 지저분해지기 마련이다.

타입스크립트의 Project reference 라는 기능은 이런 문제를 해결
https://www.typescriptlang.org/docs/handbook/project-references.html

tsconfig.json의 references 필드에 의존하는 다른 패키지 (b,c)를 적어주고,  
그 패키지의 tsconfig.json에서 composite 옵션을 켜주면  
이제 tsc로 a를 빌드하면 알아서 의존 관계에 따라 먼저 b,c를 트랜스파일하고 a를 트랜스파일 해준다.

```
$ yarn workspace @shik/a tsc -b -v
[10:50:45 PM] Projects in this build:
    * ../b/tsconfig.json
    * ../c/tsconfig.json
    * tsconfig.json

```

`타입스크립트 컴파일러가 코드를 컴파일 할 때, 개별 tsconfig 파일의 내용도 알아야 하기 때문`

### 프로젝트 내부에서 상위 tsconfig 참조해야할 경우

packages/프로젝트/tsconfig.json

```javascript
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
  }
}
```

### Next.js Typescript 경로 문제 (Module's not resolving in typescript monorepo with Next.js projects)

https://stackoverflow.com/questions/71021646/modules-not-resolving-in-typescript-monorepo-with-next-js-projects

https://stackoverflow.com/questions/51137950/using-next-js-with-yarn-workspaces

https://stackoverflow.com/questions/64146789/monorepo-with-lerna-and-typescript-fails-to-import-package-by-path-alias

https://webman.pro/blog/how-to-setup-typescript-path-aliases-in-lerna-monorepo/

```javascript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": ["*", "../app-2/src/*"], // try to resolve in the current baseUrl, if not use the fallback.
      "@apps/app-2/*": ["../app-2/src/*"], // reference app-2 imports inside app-1 like "import X from '@apps/app-2/components'"
    }
  }
}
```

## vscode 설정

VSCode에 제공하는 workspace 기능을 사용
root 경로에 workspace.code-workspace 파일 생성

workspace.code-workspace

```javascript
{
  "folders": [
    {
      "path": "packages/pack-a",
    },
    {
      "path": "packages/pack-b",
    },
  ],
  "settings": {
    "eslint.nodePath": "../../.yarn/sdks",
    "typescript.tsdk": "../../.yarn/sdks/typescript/lib",
    "prettier.prettierPath": "../../.yarn/sdks/prettier/index.js"
  }
}
```
