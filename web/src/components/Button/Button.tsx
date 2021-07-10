import React from 'react';
import * as Styled from './styles/Button';

interface Props {
  variant?: 'default' | 'small';
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactChild;
}

export default function Button({ variant = 'default', type = 'button', disabled, children }: Props) {
  return (
    <Styled.Container
      type={type}
      disabled={disabled}
      style={variant === 'small' ? { fontSize: '0.875rem', padding: '0.625rem 1.25rem' } : {}}
    >
      {children}
    </Styled.Container>
  );
}
