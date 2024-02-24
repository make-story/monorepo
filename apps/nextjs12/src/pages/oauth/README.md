# OAuth - 카카오 테스트

`study.git/OAuth` 에도 내용이 있음

## OAuth 2.0

https://tools.ietf.org/html/rfc6749

## 인증 (Authentication)

https://developers.kakao.com/docs/latest/ko/kakaologin/common#authentication

- ID와 비밀번호로 사용자 신원을 확인
- 각 서비스에 사용자가 카카오계정으로 로그인할 수 있는 기능 지원
- 서비스에서 각 사용자를 식별할 수 있는 고유한 회원번호 제공

## 인가 (Authorization)

https://developers.kakao.com/docs/latest/ko/kakaologin/common#authorization

- 사용자 개인정보와 같은 자원(Resource)에 대한 접근 권한 획득
- 사용자 동의를 바탕으로 사용자 정보나 기능에 대한 접근 권한을 토큰 형태로 서비스에 부여

## 토큰

토큰은 사용자의 카카오 로그인 인증 및 인가 정보를 담은 권한 증명으로,  
카카오 API 호출에 사용됩니다.  
카카오 로그인은 OAuth 2.0 표준 규격에 따라  
액세스 토큰(Access token), 리프레시 토큰(Refresh token) 두 종류의 토큰을 발급합니다.

## 흐름(플로우)

https://developers.kakao.com/docs/latest/ko/kakaologin/common#intro-login-process

1. 인가 코드 받기  
   https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code

   src/pages/oauth/index.tsx

2. 인가 코드로 토큰 받기
   https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token

   src/pages/oauth/callback/index.tsx

   localStorage.setItem('access_token', '토큰값');

3. 사용자 정보 처리 (우리 서비스에 필요한 요건 따라 처리)
   서비스 서버가 발급받은 액세스 토큰으로 '사용자 정보 가져오기'를 요청해 사용자의 회원번호 및 정보를 조회하여 서비스 회원인지 확인합니다.  
   서비스 회원 정보 확인 결과에 따라 '서비스 로그인 또는 회원 가입 과정을 진행'합니다.

   src/pages/oauth/kakao/index.tsx

---

Apollo

graphql-book-fullstack-project.git/project/web/src/apollo/createApolloClient.ts

```javascript
import {
  ApolloClient,
  from,
  fromPromise,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

import { refreshAccessToken } from './auth';

const authLink = setContext((request, prevContext) => {
  const accessToken = localStorage.getItem('access_token');
  return {
    headers: {
      ...prevContext.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (graphQLErrors.find((err) => err.message === 'access token expired')) {
        return fromPromise(refreshAccessToken(apolloClient, operation))
          .filter((result) => !!result)
          .flatMap(() => forward(operation));
      }

      graphQLErrors.forEach(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: -> ${operation.operationName}
        Message: ${message}, Query: ${path}, Location: ${JSON.stringify(
            locations,
          )}`,
        ),
      );
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[networkError]: -> ${operation.operationName}
    Message: ${networkError.message}`);
    }
  },
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  from([wsLink]),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from([authLink, errorLink, httpUploadLink as any]),
);
```
