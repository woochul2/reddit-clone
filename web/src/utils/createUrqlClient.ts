import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange, ssrExchange } from 'urql';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from '../generated/graphql';
import { isServer } from './isServer';

function myUpdateQuery<Result, Query>(
  cache: Cache,
  _result: any,
  query: QueryInput,
  func: (result: Result, data: Query) => Query
) {
  return cache.updateQuery(query, (data) => func(_result, data as any) as any);
}

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields('Query');
  const postsQueries = allFields.filter(
    (field) => field.fieldName === 'posts' || field.fieldName === 'post'
  );
  postsQueries.forEach((postsQuery) => {
    cache.invalidate('Query', postsQuery.fieldName, postsQuery.arguments || {});
  });
}

const ssr = ssrExchange({
  isClient: !isServer(),
});

export const createUrqlClient = () => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        Vote: () => null,
      },
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            myUpdateQuery<LoginMutation, CurrentUserQuery>(
              cache,
              _result,
              { query: CurrentUserDocument },
              (result, data) => {
                if (result.login.errors) {
                  return data;
                }
                return {
                  currentUser: result.login.user,
                };
              }
            );
            invalidateAllPosts(cache);
          },
          register: (_result, _args, cache, _info) => {
            myUpdateQuery<RegisterMutation, CurrentUserQuery>(
              cache,
              _result,
              { query: CurrentUserDocument },
              (result, data) => {
                if (result.register.errors) {
                  return data;
                }
                return {
                  currentUser: result.register.user,
                };
              }
            );
          },
          logout: (_result, _args, cache, _info) => {
            myUpdateQuery<LogoutMutation, CurrentUserQuery>(
              cache,
              _result,
              { query: CurrentUserDocument },
              (result, data) => {
                if (!result.logout) {
                  return data;
                }
                return {
                  currentUser: null,
                };
              }
            );
            invalidateAllPosts(cache);
          },
          createPost: (_result, _args, cache, _info) => {
            invalidateAllPosts(cache);
          },
          updatePost: (_result, _args, cache, _info) => {
            invalidateAllPosts(cache);
          },
          deletePost: (_result, args, cache, _info) => {
            cache.invalidate({
              __typename: 'Post',
              id: (args as DeletePostMutationVariables).id,
            });
          },
          writeComment: (_result, _args, cache, _info) => {
            invalidateAllPosts(cache);
          },
          deleteComment: (_result, _args, cache, _info) => {
            invalidateAllPosts(cache);
          },
        },
      },
    }),
    ssr,
    fetchExchange,
  ],
});
