import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createApolloClient(_ctx?: NextPageContext) {
  return new ApolloClient({
    credentials: 'include',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default withApollo(createApolloClient);
