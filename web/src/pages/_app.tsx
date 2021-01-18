import 'normalize.css';
import '../css/reset.css';
import '../css/variables.css';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  RegisterMutation,
} from '../generated/graphql';

function MyUpdateQuery<Result, Query>(
  cache: Cache,
  _result: any,
  queryInput: QueryInput,
  func: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (query) => func(_result, query as any) as any
  );
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            MyUpdateQuery<LoginMutation, CurrentUserQuery>(
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
            MyUpdateQuery<RegisterMutation, CurrentUserQuery>(
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
        },
      },
    }),
    fetchExchange,
  ],
});

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
