import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  variant?: 'up' | 'down';
  hasClicked?: boolean;
  color?: string;
  backgroundColor?: string;
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
  color: ${({ color }) => color};
  color: ${({ hasClicked }) => hasClicked && 'var(--post-clicked-icon-color)'};
  ${({ variant }) =>
    variant === 'down' &&
    css`
      transform: rotate(180deg);
    `}

  svg {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
  }

  .original {
    visibility: visible;
  }

  .hovered {
    visibility: hidden;
  }

  ${({ hasClicked }) =>
    hasClicked &&
    css`
      .original {
        visibility: hidden;
      }

      .hovered {
        visibility: visible;
      }
    `}

  &:hover,
  &:focus-visible {
    .original {
      visibility: hidden;
    }

    .hovered {
      visibility: visible;
    }

    svg {
      background-color: var(--post-icon-hover-background-color);
      background-color: ${({ backgroundColor }) => backgroundColor};
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--link-focused-border-color);
  }

  ${({ styles }) => styles}
`;
