import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../constants';

export const Container = styled.div<{ minHeight: string }>`
  max-width: 75rem;
  min-height: ${({ minHeight }) => minHeight};
  margin: 0 auto;
  padding-bottom: 1.875rem;
  background-color: var(--post-background-color);

  .desktop {
    @media (max-width: ${BREAKPOINTS.SM}) {
      display: none;
    }
  }

  .mobile {
    display: none;

    @media (max-width: ${BREAKPOINTS.SM}) {
      display: inline;
    }
  }
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

  .top-panel-inside__vote {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
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

export const MainPanel = styled.div`
  display: flex;
  max-width: 49.5rem;
  margin: 1.875rem auto 0;
  border-radius: 0.25rem;
  background-color: var(--post-content-background-color);
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    display: none;
  }
`;

export const VoteCounts = styled.p`
  font-size: 0.875rem;
`;

export const RightPanel = styled.div`
  flex-grow: 1;
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

export const ContentText = styled.p`
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.6;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const CreationInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;

  .creation-info__left {
    display: flex;
    gap: 1rem;
  }

  .creation-info__date {
    color: var(--post-second-text-color);
  }

  .creation-info__button-container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  button {
    cursor: pointer;
    padding: 0;
    outline: 0;
    border: 0;
    background: 0;
    color: var(--post-second-text-color);

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const CommentCount = styled.p`
  font-size: 0.875rem;
`;

export const commentTextAreaStyles = css`
  margin: 0.625rem 0 0.375rem;
`;

export const CommentError = styled.p`
  color: var(--error-color);
`;

export const buttonStyles = css`
  align-self: flex-end;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
`;

export const Comments = styled.div`
  font-size: 0.875rem;

  .comment {
    margin-bottom: 1rem;
  }

  .comment__top {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.375rem;
  }

  .comment__top-left {
    font-weight: bold;
  }

  .comment__text {
    font-family: 'Nanum Gothic', sans-serif;
    line-height: 1.6;
  }

  .comment__middot {
    color: var(--post-second-text-color);
  }

  .comment__created-date {
    font-weight: normal;
    color: var(--post-second-text-color);
  }

  .comment__top-right {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .comment__button {
    cursor: pointer;
    border: 0;
    border-radius: 0.125rem;
    padding: 0;
    outline: 0;
    background: 0;
    color: var(--post-second-text-color);

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;

export const UpdatedCommentForm = styled.form`
  display: flex;
  flex-direction: column;

  button {
    cursor: pointer;
    align-self: flex-start;
    padding: 0;
    margin: 0.25rem 0.5rem 0;
    font-size: 0.875rem;
    border: 0;
    border-radius: 0.125rem;
    outline: 0;
    background: 0;
    color: var(--body-text-color);

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;
