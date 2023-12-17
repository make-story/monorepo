/**
 * React Context
 */
import { createContext } from 'react';

import { createApiManager } from '../index';

export default createContext<{ APIs?: ReturnType<typeof createApiManager> }>(
  {},
);
