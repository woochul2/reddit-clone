import React from 'react';
import { Container } from './tooltip';

interface Props {
  show: boolean;
  children: React.ReactChild;
  styles?: string;
}

export default function Tooltip({ show, children, styles }: Props) {
  return (
    <Container show={show} styles={styles}>
      {children}
    </Container>
  );
}
