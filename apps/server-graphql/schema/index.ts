/**
 * GraqhQL 모듈 조립
 * https://the-guild.dev/graphql/modules
 */
import { createModule, createApplication, gql } from 'graphql-modules';

import books from './books/index';
import module1 from './module1/index';

export const module = createModule({
  id: 'my-module',
  dirname: __dirname,
  typeDefs: [gql(books)],
});

export const application = createApplication({
  modules: [module],
});

//export const typeDefs = [books, module1];
export const typeDefs = application.typeDefs;
