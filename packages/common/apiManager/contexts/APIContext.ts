/**
 * React Context
 */
import { createContext } from 'react';

import { createApiManager } from '@makeapi/common/apiManager/index';

export default createContext<{ APIs?: ReturnType<typeof createApiManager> }>({});
