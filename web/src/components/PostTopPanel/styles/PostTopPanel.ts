import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  position: sticky;
  background-color: var(--post-top-panel-background-color);
  color: var(--post-top-panel-text-color);
`;

export const Inside = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 49.5rem;
  margin: 0 auto;
  padding: 0.875rem 0.625rem;
`;

export const VotePanel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const VoteCount = styled.p`
  font-size: 0.875rem;
`;

export const Title = styled.h2`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
`;

export const CloseIcon = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 0;
  border-radius: 0.125rem;
  background: 0;
  color: var(--post-top-panel-text-color);

  svg {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--post-top-panel-text-color);
  }

  .tooltip {
    visibility: hidden;
    transition: visibility 0s;
  }

  &:hover,
  &:focus-visible {
    .tooltip {
      visibility: visible;
      transition: visibility 0s linear 0.5s;
    }
  }
`;
