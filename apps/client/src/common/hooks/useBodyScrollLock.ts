import { RefObject, useEffect } from 'react';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

/** useBodyScrollLock 옵션 */
type TBodyScrolllockOptions = {
  /**
   * body scroll 잠금 여부
   *
   * @default true
   */
  lock?: boolean;
};

/**
 * 화면 스크롤 고정
 *
 * @param scrollableElement 고정화면 내에서 스크롤을 허용 할 영역
 * @param options 옵션
 */
export default function useBodyScrollLock(
  scrollableElement: RefObject<HTMLElement>,
  { lock = true }: TBodyScrolllockOptions = {},
) {
  useEffect(() => {
    const element = scrollableElement.current;
    if (lock && element) disableBodyScroll(element);
    return () => {
      if (element) enableBodyScroll(element);
    };
  }, [lock]);
}
