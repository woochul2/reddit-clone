import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  padding-bottom: 1.875rem;
  background-color: var(--layout-background-color);
`;

export const TopPanel = styled.div<{ offset: string }>`
  z-index: 1;
  position: sticky;
  top: ${({ offset }) => offset};
  background-color: var(--post-top-panel-background-color);
  color: var(--post-top-panel-text-color);
`;

export const TopPanelInside = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 49.5rem;
  margin: 0 auto;
  padding: 0.875rem 0.625rem;
`;

export const SmallTitle = styled.h2`
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
  border-radius: 0.125em;
  background: 0;
  color: var(--post-top-panel-text-color);

  svg {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--post-border-color);
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

export const MainPanel = styled.div`
  display: flex;
  max-width: 49.5rem;
  margin: 1.875rem auto 0;
  border-radius: 0.25rem;
  background-color: var(--post-background-color);
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;
`;

export const VoteCounts = styled.p`
  font-size: 0.875rem;
`;

export const RightPanel = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-width: 0;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 1rem 1.25rem 0.875rem;
`;

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const CreationInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.875rem;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 0;
  outline: 0;
  border: 0;
  background: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--button-focused-border-color);
  }
`;

export const CommentPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const textAreaStyles = css`
  margin: 1rem 0 0.375rem;
`;

export const buttonStyles = css`
  align-self: flex-end;
`;
