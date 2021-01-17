import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.button<ContainerProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75em 1.5em;
  margin: 0.5em 0;
  border: none;
  border-radius: 0.25em;
  background-color: var(--button-background-color);
  color: var(--button-text-color);

  &:focus:not(:focus-visible) {
    outline: 0;
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
