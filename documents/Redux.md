# 1. Redux <!-- omit in toc -->

23.03.02

## 1. Table of Contents

- [1. Table of Contents](#1-table-of-contents)
- [2. Libraries](#2-libraries)
- [3. Issues](#3-issues)
  - [3.1. Router 통해 이동 시 Hydrate가 첫번째 렌더링 후에 실행되는 문제](#31-router-통해-이동-시-hydrate가-첫번째-렌더링-후에-실행되는-문제)

## 2. Libraries

| Library            | Link                                                       | Version |
| ------------------ | ---------------------------------------------------------- | ------- |
| Redux-Toolkit      | [🔗](https://redux-toolkit.js.org/)                        | ^1.8.3  |
| Next-Redux-Wrapper | [🔗](https://github.com/kirill-konshin/next-redux-wrapper) | ^7.0.5  |
| Redux-Saga         | [🔗](https://redux-saga.js.org/)                           | 1.1.3   |
| redux-form         | [🔗](https://redux-form.com/)                              | ^8.3.7  |
| react-redux        | [🔗](https://react-redux.js.org/)                          | 7.2.8   |

## 3. Issues

### 3.1. Router 통해 이동 시 Hydrate가 첫번째 렌더링 후에 실행되는 문제

next-redux-wrapper v6에는 [컴포넌트가 마운트 된 후 hydrate action이 발생하는 문제](https://github.com/kirill-konshin/next-redux-wrapper/issues/280)를 가지고 있다.

| Page Lifecycle       | v6      | v7 (fixed) |
| -------------------- | ------- | ---------- |
| constructor          |         | hydrate    |
| render               |         |            |
| componentDidMount    | hydrate |            |
| componentWillUnmount |         |            |

v6에서는 hydrate 액션이 실행되는 시점이 componentDidMount로, 이때문에 SSR의 State가 클라이언트의 첫 렌더링 시점에 화면에 반영되지 않는 문제가 발생한다. 이로인해 각종 오류처리에 문제가 생길 수 있다.

예를 들면, 라우터를 통해 상품상세 진입시 오류 등이 이에 해당한다. 또한 withLoggedIn등 클라이언트의 방어코드가 제대로 동작하지 않을 수 있다.

이는 [v7에서 fix](https://github.com/kirill-konshin/next-redux-wrapper/pull/295)되었고, 따라서 v7 이상으로 업데이트 하면 해결이 된다.

현재시점 최신 버전은 v8이지만, v8은 스토어 생성 방식이 크게 달라짐에 따라, 현재 직시 적용해볼 수 있는 v7을 우선 적용하기로 한다.
