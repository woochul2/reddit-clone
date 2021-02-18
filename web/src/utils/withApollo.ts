import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
import { isServer } from './isServer';

function createApolloClient(ctx?: NextPageContext) {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
    credentials: 'include',
    headers: {
      cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) || '',
    },
    cache: new InMemoryCache(),
  });
}

export default withApollo(createApolloClient);
