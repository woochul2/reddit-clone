import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';
import React from 'react';
import '../css/reset.css';
import '../css/variables.css';
import { useApollo } from '../lib/apolloClient';

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>reddit clone</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
