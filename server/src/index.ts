import 'reflect-metadata';
import { __prod__ } from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { MyContext } from './interfaces';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init();
  await orm.getMigrator().up();

  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient }),
      secret: 'sfaoiupbsbzxcbklmqer;ioguqwoi;gjsv',
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1년
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => <MyContext>{ em: orm.em, req, res },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('서버가 시작됐습니다.');
    console.log('이제 브라우저에서 Apollo Server를 볼 수 있습니다.');
    console.log('로컬 주소: http://localhost:4000' + apolloServer.graphqlPath);
  });
};

main().catch((err) => {
  console.log(err);
});
