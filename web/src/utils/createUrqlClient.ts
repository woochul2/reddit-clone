import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
  CreatePostMutation,
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  PostsDocument,
  PostsQuery,
  RegisterMutation,
} from '../generated/graphql';
import { myUpdateQuery } from './myUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            myUpdateQuery<LoginMutation, CurrentUserQuery>(
              cache,
              _result,
              { query: CurrentUserDocument },
              (result, query) => {
                if (result.login.errors) {
                  return query;
                }
                return {
                  currentUser: result.login.user,
                };
              }
            );
          },
          register: (_result, _args, cache, _info) => {
            myUpdateQuery<RegisterMutation, CurrentUserQuery>(
              cache,
              _result,
              { query: CurrentUserDocument },
              (result, query) => {
                if (result.register.errors) {
                  return query;
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
              (result, query) => {
                if (!result.logout) {
                  return query;
                }
                return {
                  currentUser: null,
                };
              }
            );
          },
          createPost: (_result, _args, cache, _info) => {
            myUpdateQuery<CreatePostMutation, PostsQuery>(
              cache,
              _result,
              { query: PostsDocument },
              (result, query) => {
                if (!result.createPost) {
                  return query;
                }
                return {
                  posts: [result.createPost, ...query.posts],
                };
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
