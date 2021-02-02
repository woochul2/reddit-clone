import React from 'react';
import Header from '../Header';
import { Container } from './layout';

interface Props {
  variant?: 'default' | 'colored';
  searchBox?: 'on' | 'off';
  children?: JSX.Element | JSX.Element[] | false | null;
  styles?: string;
}

export default function Layout({
  variant = 'default',
  searchBox = 'on',
  children,
  styles,
}: Props) {
  return (
    <Container variant={variant} styles={styles}>
      <Header searchBox={searchBox} />
      {children}
    </Container>
  );
}
