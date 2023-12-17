import { css } from '@emotion/react';

export const globalStyle = css`
  html {
    overflow: hidden;
    user-select: none;
  }

  html,
  body,
  body > #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 100%;
    width: 100%;
    max-width: 100%;
    height: calc(100%);
    min-height: 100%;
    white-space: break-spaces;
    word-break: keep-all;
    word-wrap: normal;

    * {
      /**
       * 경고 무시
       */
      -webkit-tap-highlight-color: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

  // NOTE: 아이콘 버튼 터치 영역 정의되면 삭제 예정
  button {
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  #message {
    z-index: 1000;
  }
`;

export const scrollPreventionStyle = css`
  html,
  body,
  body > #root {
    overflow: hidden;
  }
`;
