/**
 * GraqhQL 모듈 조립
 * https://the-guild.dev/graphql/modules
 */
import { createModule, createApplication, gql } from 'graphql-modules';

import module1 from './module1/index';
import module2 from './module2/index';

export const module = createModule({
  id: 'my-module',
  dirname: __dirname,
  typeDefs: [gql(module2)],
});

export const application = createApplication({
  modules: [module],
});

//export const typeDefs = [module1, module2];
export const typeDefs = application.typeDefs;
