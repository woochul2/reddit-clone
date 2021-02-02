import styled from 'styled-components';

interface ContainerProps {
  variant?: 'default' | 'colored';
  styles?: string;
}

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  padding-bottom: 1rem;
  background-color: ${({ variant }) =>
    variant === 'default'
      ? 'var(--body-background-color)'
      : 'var(--layout-background-color)'};
  ${({ styles }) => styles}
`;
