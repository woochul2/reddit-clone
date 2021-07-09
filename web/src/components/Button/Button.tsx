import React from 'react';
import * as Styled from './styles/Button';

interface Props {
  variant?: 'default' | 'small';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactChild;
}

export default function Button({ variant = 'default', type = 'button', disabled, children }: Props) {
  const getStyles = (): React.CSSProperties => {
    if (variant !== 'small') return {};

    return {
      fontSize: '0.875rem',
      padding: '0.625rem 1.25rem',
    };
  };

  return (
    <Styled.Container type={type} disabled={disabled} style={getStyles()}>
      {children}
    </Styled.Container>
  );
}
