# CRA - Next.js 마이그레이션 테스트

# 버전

- Node.js v16.14.2
- Next.js 13.4.3

# 기존 환경에서 업데이트 하는 것이 아닌, 코드를 Next.js 환경으로 옮겨오는 방식

시간이 지남에 따라, 대응이 안된 코드와 대응이 된 코드 구분이 어려워지기 때문

---

# Node.js 환경에서 TypeScript 실행

https://www.npmjs.com/package/ts-node

https://velog.io/@woongbeee/Typescript%EB%A5%BC-Node.js-%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%A0-%EB%95%8C-ts-node-%EC%98%A4%EB%A5%98

ts-node 설치 및 서버 실행

```
$ yarn add ts-node
$ ts-node server.ts
```

nodemin 으로 node 실행할 경우

```
$ nodemon --exec ts-node ./index.ts
```

## path alias

https://blog.naver.com/PostView.naver?blogId=psj9102&logNo=222653630355&parentCategoryNo=&categoryNo=66&viewDate=&isShowPopularPosts=true&from=search

alias 선언 후 에러가 발생할 경우

```
$ yarn add tsconfig-paths
```

package.json

```
"scripts": {
    "dev": "nodemon --exec ts-node -r tsconfig-paths/register ./main.ts"
}
```

또는

tsconfig.json

```json
{
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```
