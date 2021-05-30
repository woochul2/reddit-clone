import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import * as Styled from './styles/Button';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function Button({ type = 'button', disabled, children, styles }: Props) {
  return (
    <Styled.Container type={type} disabled={disabled} styles={styles}>
      {children}
    </Styled.Container>
  );
}
