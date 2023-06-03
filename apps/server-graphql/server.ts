/**
 * https://www.apollographql.com/docs/apollo-server/getting-started
 * https://code-masterjung.tistory.com/23
 */
import { createServer } from 'http';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginDrainHttpServerOptions,
} from '@apollo/server/plugin/drainHttpServer';
import { createModule, createApplication, gql } from 'graphql-modules';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema/index';
import { resolvers, context } from './resolver/index';

/**
 * express + ApolloServer
 * https://www.apollographql.com/docs/apollo-server/api/express-middleware/
 */
(async () => {
  const app = express();
  const httpServer = createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    logger: console,
    csrfPrevention: false,
    introspection: true,
    persistedQueries: false,
  });
  await apolloServer.start();

  const isProd: boolean = process.env.NODE_ENV === 'production';
  const port = isProd && process.env.PORT ? process.env.PORT : 8000;

  const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions)); // cors
  app.use('/api', bodyParser.json(), (request: Request, response: Response, next: NextFunction): any => {
    //return expressMiddleware(apolloServer)(request, response, next);
    request.setTimeout(10 * 1000);
    return expressMiddleware(apolloServer, {
      context,
    })(request, response, next);
  });
  httpServer.listen({ port }, (): void => console.log(`GraphQL is now running on http://localhost:${port}`));
})();
