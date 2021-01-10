import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';

export default {
  migrations: {
    path: __dirname + '/migrations',
    pattern: /^[\w-]+\d+\.js$/,
  },
  entities: [Post],
  dbName: 'reddit_clone',
  type: 'postgresql',
  user: 'postgres',
  password: 'a',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
