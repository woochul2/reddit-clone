import { ApolloServer } from 'apollo-server-express';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import cors from 'cors';
import express from 'express';
import Redis from 'ioredis';
import 'reflect-metadata';
import serverless from 'serverless-http';
import { buildSchema } from 'type-graphql';
import Database from './database';
import resolvers from './resolvers';
import { getUserId } from './utils/getUserId';

export const graphqlHandler: APIGatewayProxyHandlerV2 = async (event, context) => {
  const database = new Database();
  await database.getConnection();

  const app = express();

  app.set('trust proxy', true);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  const apolloServer = new ApolloServer({
    introspection: true,
    playground: {
      endpoint: '/dev/graphql',
    },
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: () => {
      return {
        redis,
        userId: event.headers.Authorization ? getUserId(event) : null,
      };
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const response = await serverless(app)(event, context);
  return response;
};
