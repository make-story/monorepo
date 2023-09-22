/**
 * 옵져버 화면 중앙 위치 확인
 * https://stackoverflow.com/questions/54807535/intersection-observer-api-observe-the-center-of-the-viewport
 */
import React, { useEffect, useRef } from 'react';

const Observer = () => {
  const $elementWrap = useRef(null);
  useEffect(() => {
    if (!$elementWrap.current) {
      return;
    }

    const elementHasIntersected: any = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      if (entries.length && entries?.[0].isIntersecting) {
        console.log('entries', entries);
      }
    };
    const ioConfiguration = {
      /**
       * This rootMargin creates a horizontal line vertically centered
       * that will help trigger an intersection at that the very point.
       */
      rootMargin: '-50% 0% -50% 0%',

      /**
       * This is the default so you could remove it.
       * I just wanted to leave it here to make it more explicit
       * as this threshold is the only one that works with the above
       * rootMargin
       */
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      elementHasIntersected,
      ioConfiguration,
    );
    observer.observe($elementWrap.current);
  }, [$elementWrap]);

  return (
    <>
      <div style={{ width: '300px', height: '1000px', border: '1px solid' }}>
        TEST1
      </div>
      <div
        style={{ width: '300px', height: '1000px', border: '1px solid' }}
        ref={$elementWrap}
      >
        TEST2
      </div>
    </>
  );
};

export default Observer;
