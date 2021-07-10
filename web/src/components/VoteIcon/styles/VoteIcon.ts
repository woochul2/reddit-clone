import styled, { css } from 'styled-components';

export const Container = styled.button<{ variant: 'default' | 'topPanel' }>`
  cursor: pointer;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  outline: 0;
  border: 0;
  border-radius: 0.125em;
  background: 0;
  color: var(--body-text-color);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
  }

  &:hover,
  &:focus-visible {
    background-color: var(--vote-icon-hover-background-color);
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }

  ${({ variant }) =>
    variant === 'topPanel' &&
    css` 
      margin: 0;
      color: var(--top-panel-text-color);

      &:hover,
      &:focus-visible {
        background-color: var(--post-top-panel-icon-hover-background-color);
      }

      &:focus-visible {
        box-shadow: 0 0 0 0.125rem var(--post-top-panel-text-color);
      }}
  `}
`;
