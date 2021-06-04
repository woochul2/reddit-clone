import { NonEmptyArray } from 'type-graphql';
import { CommentResolver } from './comment';
import { PostResolver } from './post';
import { UserResolver } from './user';
import { VoteResolver } from './vote';

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  PostResolver,
  UserResolver,
  VoteResolver,
  CommentResolver,
];

export default resolvers;
