/**
 * https://www.apollographql.com/docs/apollo-server/getting-started
 * https://code-masterjung.tistory.com/23
 */

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { createApplication } from 'graphql-modules';
import { modules } from './schema/index';

const application = createApplication({
  modules: [modules],
});
const server = new ApolloServer({
  typeDefs: application.typeDefs,
  resolvers: [],
});

(async server => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})(server);
