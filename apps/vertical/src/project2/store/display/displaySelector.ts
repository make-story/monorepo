import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '@/store';
import { DisplayState } from '@/project2/store/display/displaySlice';

export const displaySelector = ({ project2 }: AppState): DisplayState =>
  project2.display;

/**
 * createSelector 을 이용해 새로운 값을 반환하면
 * 해당 값은 다시 리렌더링 되더라도 연산을 새로 수행하는 대신 이전에 캐싱해두었던 값을 반환
 */
export const displayReselect = createSelector(
  displaySelector,
  (display): any => {
    return display.value;
  },
);
