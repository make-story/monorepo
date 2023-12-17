/**
 * React Context Provider
 */
import React, { PropsWithChildren, useMemo } from 'react';
import { Store } from 'redux';

import { createApiManager } from '../index';
import APIContext from './APIContext';

type APIProviderProps = { store: Store };

/**
 * Provider 가 Context (데이터, 상태) 접근
 */
export default function APIProvider({
  store,
  children,
}: PropsWithChildren<APIProviderProps>) {
  const instance = useMemo(
    () => ({
      //APIs: createApiManager({ store, test: true }),
      APIs: createApiManager({ store }),
    }),
    [store],
  );

  return <APIContext.Provider value={instance}>{children}</APIContext.Provider>;
}
