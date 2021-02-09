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
