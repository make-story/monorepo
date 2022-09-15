# 네이버 - 개념, 구축

https://d2.naver.com/helloworld/0923884  
https://d2.naver.com/helloworld/7553804

# 배달의 민족

https://techblog.woowahan.com/7976/  
https://github.com/kowoohyuk/monorepo-template

---

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

---

# package.json 생성

```
$ yarn init -y
```

# workspaces 활성화

package.json

```javascript
{
  "name": "monorepo.git",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/make-story/monorepo.git",
  "author": "Sung-min Yu <yu9221@gmail.com>",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "packages/**"
    ]
  }
}
```

# 루트 디렉토리에서 packages 디렉토리 생성 후, 그 안에 pack-a 와 pack-b 패키지를 생성

```
$ mkdir packages packages/pack-a packages/pack-b
$ cd packages/pack-a
$ yarn init -y
$ cd ../pack-b
$ yarn init -y
```

# yarn workspace 에서 패키지 추가를 위해서는 기존 yarn add [패키지 이름]이 아닌, 다른 방법 사용

## pack-a 에 패키지 추가

```
$ yarn workspace pack-a add [패키지 이름]
```

## pack-a 에 패키지 삭제

```
$ yarn workspace pack-a remove [패키지 이름]
```

## 루트 디렉토리에 패키지 추가

```
$ yarn add [패키지 이름] -W
```

# yarn workspaces 의 호이스팅 방식 예

root 위치

```
$ yarn workspace pack-a add react
$ yarn workspace pack-b add react
```

위와 같이 실행할 경우,
root 의 node_modules 폴더에 react 패키지가 설치된 것을 볼 수 있다.
(pack-a, pack-b의 node_modules 디렉토리에 추가되는 것이 아니라 루트 경로의 node_modules 연결됨)

# 모든 패키지가 yarn workspaces 의 호이스팅 방식을 지원하는 것은 아님

이를 해결하기 위해서는 nohoist를 사용  
nohoist 항목에 추가된 패키지는 호이스팅 되지 않고 각각의 프로젝트 또는 패키지의 node_modules에 추가

## nohoist 테스트를 위하여 react-router-dom 패키지를 호이스팅되지 않게 추가

package.json에 다음과 같이 nohoist 항목을 추가

```javascript
{
  "name": "monorepo.git",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/make-story/monorepo.git",
  "author": "Sung-min Yu <yu9221@gmail.com>",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "packages/**"
    ],
    "nohoist": [
      "**/react-router-dom",
      "**/react-router-dom/**"
    ]
  }
}
```

pack-a에 react-router-dom 패키지를 추가

```
$ yarn workspace pack-a add react-router-dom
```

pack-a에 node_modules 디렉토리가 생기며 안에 react-router-dom 패키지가 있는 것 을 확인
