import styled, { FlattenSimpleInterpolation } from 'styled-components';

type variantType = 'default' | 'colored' | 'modal';

interface ContainerProps {
  variant?: variantType;
  styles?: FlattenSimpleInterpolation;
}

function setBackground(variant?: variantType) {
  if (variant === 'default') {
    return 'var(--body-background-color)';
  }
  if (variant === 'colored') {
    return 'var(--layout-background-color)';
  }
  if (variant === 'modal') {
    return 'var(--modal-background-color)';
  }
}

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  padding-bottom: 1rem;
  padding-bottom: ${({ variant }) => variant === 'modal' && '0'};
  background-color: ${({ variant }) => setBackground(variant)};

  .layout__loading-icon {
    margin: 2rem auto;
  }

  ${({ styles }) => styles}
`;
