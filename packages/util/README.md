`vite` 빌드 도구 테스트 해보자!!

# 배포 시 번들링 과정이 필요한 이유

https://ko.vitejs.dev/guide/why.html#why-bundle-for-production

# 커멘드라인

```json
{
  "scripts": {
    "dev": "vite", // 개발 서버를 실행합니다. (`vite dev` 또는 `vite serve`로도 시작이 가능합니다.)
    "build": "vite build", // 배포용 빌드 작업을 수행합니다.
    "preview": "vite preview" // 로컬에서 배포용 빌드에 대한 프리뷰 서버를 실행합니다.
  }
}
```
