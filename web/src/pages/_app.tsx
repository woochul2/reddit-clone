import Head from 'next/head';
import 'normalize.css';
import React from 'react';
import '../css/reset.css';
import '../css/variables.css';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>reddit clone</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
