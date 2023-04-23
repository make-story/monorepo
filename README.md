# 자료

https://github.com/make-story/study

# 이슈

## Next.js

Next.js 버전에 따라  
React, next-transpile-modules 등 의존 버전 확인 필수!!!

## NPM 의존성 버전이 맞지 않을 경우, 에러 발생함

```
It looks like you're trying to use TypeScript but do not have the required package(s) installed.

Please install @types/react by running:

        npm install --save-dev @types/react

If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files in your pages directory).
```

즉, yarn.lock 파일 중요함!! 성공한 lock 파일 가지고 의존성 모듈 설치 및 서버 실행해야 함!
