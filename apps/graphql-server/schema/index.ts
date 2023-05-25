/**
 * GraqhQL 모듈 조립
 * https://the-guild.dev/graphql/modules
 */
import Module1QueryType from './module1/module.graphql';
import { createModule, createApplication, gql } from 'graphql-modules';

export const modules = createModule({
  id: 'my-module',
  dirname: __dirname,
  typeDefs: [Module1QueryType],
});
