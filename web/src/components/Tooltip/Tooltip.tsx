import React from 'react';
import * as Styled from './styles/Tooltip';

interface Props {
  className?: string;
  children: React.ReactChild;
}

export default function Tooltip({ className, children }: Props) {
  return (
    <Styled.Container className={className} onClick={(event) => event.stopPropagation()}>
      {children}
    </Styled.Container>
  );
}
