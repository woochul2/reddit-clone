import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Container } from './tooltip';

interface Props {
  className?: string;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function Tooltip({ className, children, styles }: Props) {
  return (
    <Container className={className} styles={styles}>
      {children}
    </Container>
  );
}
