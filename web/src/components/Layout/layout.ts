import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  background-color: var(--layout-background-color);
  ${({ styles }) => styles}
`;
