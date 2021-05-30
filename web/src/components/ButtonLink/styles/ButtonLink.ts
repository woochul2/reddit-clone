import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.a<ContainerProps>`
  text-decoration: none;
  padding: 0.75em 1.5em;
  margin: 0.5em 0;
  outline: 0;
  border-radius: 0.25em;
  background-color: var(--button-background-color);
  color: var(--button-text-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }

  &:active {
    background-color: var(--button-active-background-color);
  }

  ${({ styles }) => styles}
`;