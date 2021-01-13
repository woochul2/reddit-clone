import { Post } from './entities/Post';

export const __prod__ = process.env.NODE_ENV === 'production';

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
};
