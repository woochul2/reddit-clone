import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { buildSchema } from 'type-graphql';
import { COOKIE_NAME, WEB_URL } from './constants';
import { MyContext } from './interfaces';
import { __prod__ } from './mikro-orm.config';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
require('dotenv').config();

const main = async () => {
  const orm = await MikroORM.init();
  await orm.getMigrator().up();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: WEB_URL,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        ttl: 60 * 60 * 24 * 7 * 4, // 2주일
      }),
      secret: 'sfaoiupbsbzxcbklmqer;ioguqwoi;gjsv',
      resave: false,
      cookie: {
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
    context: ({ req, res }): MyContext =>
      <MyContext>{ em: orm.em, req, res, redis },
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
