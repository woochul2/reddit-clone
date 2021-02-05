import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from '../generated/graphql';

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
  const postsQueries = allFields.filter((field) => field.fieldName === 'posts');
  postsQueries.forEach((postsQuery) => {
    cache.invalidate('Query', 'posts', postsQuery.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any) => ({
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
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
