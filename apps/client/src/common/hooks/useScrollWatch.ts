import _ from 'lodash';
import { useEffect } from 'react';

export interface IProps {
  target: (Window & typeof globalThis) | HTMLElement | undefined;
  predicate: (scrollY: number) => void;
}

/**
 *
 * @param target scrollY 이벤트를 listen 할 객체
 * @param scrollY scrollY 혹은 scrollTop의 값을 받아 처리하는 함수
 */
const useScrollWatch = ({ target, predicate }: IProps, effectTarget: any[]) => {
  useEffect(() => {
    if (target) {
      const scrollEventHandler = _.debounce(() => {
        const scrollY = target instanceof Window ? target.scrollY : target.scrollTop;

        predicate(scrollY);
      }, 100);

      target.addEventListener('scroll', scrollEventHandler);

      return () => {
        target.removeEventListener('scroll', scrollEventHandler);
      };
    }
  }, effectTarget);
};

export default useScrollWatch;
