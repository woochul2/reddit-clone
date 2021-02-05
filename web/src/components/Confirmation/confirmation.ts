import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .confirmation__text {
    font-size: 1.5em;
    margin: 1.5rem 0 1rem;
  }

  ${({ styles }) => styles}
`;
