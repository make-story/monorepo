/**
 * apiManager 리액트 컴포넌트 내부에서 사용하는 방법
 */
import React, { useMemo, useContext, useEffect } from 'react';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import APIContext from '@ysm/common/apiManager/contexts/APIContext';
import { TRootStateCommon } from '@ysm/common/reducer';

export default function useApiManager() {
  const { APIs } = useContext(APIContext);
  //const store = useStore();
  //const { store } = useContext(ReactReduxContext); // HACK: https://react-redux.js.org/using-react-redux/accessing-store#using-reactreduxcontext-directly
  //const dispatch = useDispatch();
  //const state = useSelector((state: TRootStateCommon) => state);

  // Context 방식이 아닌, 아래 방식으로 할 경우, React 재렌더링 될 때 마다, 인스턴스 재생성됨 (비효율)
  /*const instance = useMemo(() => {
    logger.debug('useApiManager', store);
    return {
      ...createApiManager({ store }),
    };
  }, [store]);*/

  // return undefined 방지 (타입체킹)
  if (!APIs) throw Error('API Provider 가 필요합니다.');

  return APIs;
}
