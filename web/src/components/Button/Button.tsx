import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Container } from './button';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function Button({
  type = 'button',
  disabled,
  children,
  styles,
}: Props) {
  return (
    <Container type={type} disabled={disabled} styles={styles}>
      {children}
    </Container>
  );
}
