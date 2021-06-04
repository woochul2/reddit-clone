import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withApollo } from 'next-apollo';
import { AUTH_TOKEN } from '../constants';

const httpLink = (token?: string) => {
  return createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
    credentials: 'include',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

const authLink = setContext((_, { headers }) => {
  const token = getCookieValue(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createApolloClient(ctx?: any) {
  let token;
  if (typeof window === 'undefined') token = ctx?.req.cookies['auth-token'];

  return new ApolloClient({
    credentials: 'include',
    link: typeof window === 'undefined' ? httpLink(token) : authLink.concat(httpLink()),
    cache: new InMemoryCache(),
  });
}

export default withApollo(createApolloClient);
