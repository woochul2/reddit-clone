import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

export const Container = styled.div`
  max-width: 75rem;
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

export const VoteCount = styled.p`
  font-size: 0.875rem;
`;

export const RightPanel = styled.div`
  flex-grow: 1;
  min-width: 0;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 1rem 1.25rem 0.875rem;
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const CommentCount = styled.p`
  font-size: 0.875rem;
`;

export const CommentError = styled.p`
  color: var(--error-color);
`;
