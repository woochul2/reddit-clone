import type { AppProps } from 'next/app';
import 'normalize.css';
import React from 'react';
import '../css/reset.css';
import '../css/variables.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
