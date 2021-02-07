import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.button<ContainerProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  margin: 0 0 1rem;
  outline: 0;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--button-background-color);
  color: var(--button-text-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--button-focused-border-color);
  }

  &:active {
    background-color: var(--button-active-background-color);
  }

  &:disabled {
    cursor: default;
    background-color: var(--button-disabled-background-color);
  }

  ${({ styles }) => styles}
`;
