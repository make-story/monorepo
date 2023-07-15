# CRA (Create React App) 환경에서의 테스트

https://create-react-app.dev/docs/getting-started

https://github.com/facebook/create-react-app

---

# CRA proxy

```json
{
  "proxy": "http://localhost:8000"
}
```

```json
{
  "proxy": {
    "/api": {
      "target": "http://localhost:8000"
    },
    "/auth": {
      "target": "http://localhost:8080"
    }
  }
}
```

// http://localhost:3000/api/posts => http://localhost:8000/api/posts
// http://localhost:3000/auth/login => http://localhost:8080/auth/login

# GraphQL - 서버와 클라이언트 테스트
