import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Post } from './entities/Post';
import { User } from './entities/User';

export const __prod__ = process.env.NODE_ENV === 'production';

export default {
  migrations: {
    path: __dirname + '/migrations',
    pattern: /^[\w-]+\d+\.js$/,
  },
  entities: [Post, User],
  dbName: 'reddit_clone',
  type: 'postgresql',
  user: 'postgres',
  password: 'a',
  debug: !__prod__,
  highlighter: new SqlHighlighter(),
};
