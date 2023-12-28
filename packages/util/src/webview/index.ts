/**
 * 앱 <-> 웹뷰 연동 이벤트 타입
 */
export const APP_EVENT_TYPE = {
  // test
  TEST: 'test',
};
type TAppEventType = (typeof APP_EVENT_TYPE)[keyof typeof APP_EVENT_TYPE];

/**
 * 앱 -> 웹뷰 : 인터페이스
 * 앱쪽과 약속된 window.XXX 함수 추가
 */
const appEventDispatch = (type: TAppEventType) => {
  try {
    if (type && typeof (window as any)[type] !== 'function') {
      (window as any)[type] = (...detail: any) => {
        document.dispatchEvent(new CustomEvent(type, { detail }));
      };
    }
  } catch (error) {
    console.log(error);
  }
};
if (typeof window !== 'undefined') {
  // test
  appEventDispatch(APP_EVENT_TYPE.TEST);

  // ...
}

/**
 * 앱 -> 웹뷰 : 이벤트 on / 이벤트 off
 */
/*
import { APP_EVENT_TYPE, appEventOn, appEventOff } from '@ysm/util/webview';

// 이벤트 리스너
const listener = ({ detail }: any) => {
    console.log(detail); // detail: [ 1번째 함수 파라미터, 2번째 함수 파라미터, ... ]
};

// 이벤트 리스너 on
appEventOn(APP_EVENT_TYPE.TEST, listener);

// 이벤트 리스너 off
appEventOff(APP_EVENT_TYPE.TEST, listener);

// 테스트
setTimeout(() => {
    // 앱에서 웹뷰 기능을 실행(콜)했다는 가정
    window.test('TEST');
}, 3000);
*/
type eventOptions = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  mozSystemGroup?: boolean;
};
export const appEventOn = (
  type: TAppEventType,
  listener: EventListener,
  options?: eventOptions,
): void => {
  document.addEventListener(type, listener, options);
};
export const appEventOff = (
  type: TAppEventType,
  listener: EventListener,
  options?: eventOptions,
): void => {
  document.removeEventListener(type, listener, options);
};
