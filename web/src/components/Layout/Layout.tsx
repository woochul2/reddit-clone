import React from 'react';
import Header from '../Header';
import { Container } from './layout';

interface Props {
  children: React.ReactChild;
  styles?: string;
}

export default function Layout({ children, styles }: Props) {
  return (
    <Container styles={styles}>
      <Header />
      {children}
    </Container>
  );
}
