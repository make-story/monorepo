/**
 * https://www.apollographql.com/docs/apollo-server/getting-started
 * https://code-masterjung.tistory.com/23
 */

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { createApplication } = require('graphql-modules');
const { modules } = require('./schema/index');

const application = createApplication({
  modules: [modules],
});
const server = new ApolloServer({
  typeDefs: application.typeDefs,
  resolvers,
});

(async server => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})(server);
