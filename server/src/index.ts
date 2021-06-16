import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import Database from './database';
import resolvers from './resolvers';
import { MyContext } from './types';
import { getUserId } from './utils/getUserId';
require('dotenv').config({ path: '.env.development' });

const main = async () => {
  const database = new Database();
  await database.getConnection();

  const app = express();
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', true);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    introspection: true,
    playground: true,
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: ({ req }: MyContext) => {
      return {
        redis,
        userId: req && req.headers.Authorization ? getUserId(req) : null,
      };
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('서버가 시작됐습니다.');
  });
};

main().catch((err) => {
  console.log(err);
});
