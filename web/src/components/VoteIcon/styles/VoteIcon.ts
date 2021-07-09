import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  variant?: 'up' | 'down';
  hasClicked?: boolean;
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.button<ContainerProps>`
  cursor: pointer;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.25rem;
  outline: 0;
  border: 0;
  border-radius: 0.125em;
  background: 0;
  color: var(--body-text-color);

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    transform: translateY(-50%);

    ${({ variant }) =>
      variant === 'down' &&
      css`
        transform: translateY(-50%) rotate(180deg);
      `}
  }

  .original {
    visibility: visible;
  }

  .clicked {
    visibility: hidden;
  }

  &:hover {
    background-color: var(--vote-icon-hover-background-color);
  }

  ${({ hasClicked }) =>
    hasClicked &&
    css`
      .original {
        visibility: hidden;
      }

      .clicked {
        visibility: visible;
      }
    `}

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }

  ${({ styles }) => styles}
`;
