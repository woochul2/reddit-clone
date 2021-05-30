import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Comment } from './entities/Comment';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { Vote } from './entities/Vote';
import { CommentResolver } from './resolvers/comment';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { VoteResolver } from './resolvers/vote';
import { MyContext } from './types';
import { getUserId } from './utils/getUserId';
require('dotenv').config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Post, User, Vote, Comment],
    synchronize: true,
    logging: false,
    ssl: {
      rejectUnauthorized: false,
    },
  });

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
    // introspection: true,
    // playground: true,
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, VoteResolver, CommentResolver],
      validate: false,
    }),
    context: ({ req }: MyContext) => {
      return {
        redis,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log('서버가 시작됐습니다.');
  });
};

main().catch((err) => {
  console.log(err);
});
