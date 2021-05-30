import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import * as Styled from './styles/Tooltip';

interface Props {
  className?: string;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function Tooltip({ className, children, styles }: Props) {
  return (
    <Styled.Container className={className} styles={styles}>
      {children}
    </Styled.Container>
  );
}
