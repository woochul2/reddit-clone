import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.div<ContainerProps>`
  cursor: pointer;
  display: flex;
  max-width: 36.75rem;
  margin: 1rem auto 0;
  border: 0.125rem solid var(--post-border-color);
  border-radius: 0.25rem;

  &:hover {
    border: 0.125rem solid var(--post-focused-border-color);
  }

  ${({ styles }) => styles}
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;
  background-color: var(--post-left-panel-background-color);
`;

export const Icon = styled.button<{ hasClicked?: boolean }>`
  cursor: pointer;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.25rem;
  outline: 0;
  border: 0;
  border-radius: 0.125em;
  background: 0;
  color: ${({ hasClicked }) =>
    hasClicked ? 'var(--post-clicked-icon-color)' : 'var(--body-text-color)'};

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
  }

  &.flip {
    transform: rotate(180deg);
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--link-focused-border-color);
  }
`;

export const VoteCounts = styled.p<{ voteStatus?: number | null }>`
  font-size: 0.875rem;
`;

export const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
  word-break: break-all;
  padding: 1rem 1.25rem 0.875rem;
  background-color: var(--post-background-color);
`;

export const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Snippet = styled.h3`
  font-weight: normal;
  font-size: 1.125rem;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  margin: 0 0.125rem;
`;

export const Creator = styled.p`
  span {
    color: var(--post-second-text-color);
  }
`;

export const Comment = styled.p`
  flex-grow: 1;
`;

export const CreatedTime = styled.p``;
