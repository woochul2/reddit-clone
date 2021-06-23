import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { BREAKPOINTS } from '../../../constants';

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

  @media (max-width: ${BREAKPOINTS.SM}) {
    display: none;
  }
`;

export const VoteCounts = styled.p`
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
  background-color: var(--post-thumbnail-background-color);

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0.75rem;
  }
`;

export const Title = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  outline: 0;
  border-radius: 0.25rem;
  color: var(--body-text-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;

export const Snippet = styled.h3`
  font-weight: normal;
  font-size: 1.125rem;
`;

export const Info = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  margin: 0 0.125rem;

  .info__vote {
    display: none;
    align-items: center;
    gap: 0.375rem;

    @media (max-width: ${BREAKPOINTS.SM}) {
      display: flex;
    }
  }

  .info__left {
    display: flex;
    gap: 0.75rem;
  }

  .info__right {
    display: flex;
    flex-grow: 1;
    gap: 0.75rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    flex-direction: column;
  }
`;

export const Creator = styled.p`
  span {
    color: var(--post-second-text-color);
  }
`;

export const Comment = styled.p`
  flex-grow: 1;
`;

export const CreatedTime = styled.p`
  color: var(--post-second-text-color);

  .desktop {
    @media (max-width: ${BREAKPOINTS.SM}) {
      display: none;
    }
  }

  .mobile {
    display: none;

    @media (max-width: ${BREAKPOINTS.SM}) {
      display: block;
    }
  }
`;
