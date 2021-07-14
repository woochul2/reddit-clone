import styled from 'styled-components';

export const Container = styled.div`
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const TopPanel = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.375rem;
  color: var(--post-second-text-color);
`;

export const Creator = styled.span`
  font-weight: bold;
  color: var(--body-text-color);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0.125rem;
    padding: 0;
    outline: 0;
    background: 0;
    color: var(--post-second-text-color);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        text-decoration: underline;
      }
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;

export const EditedCommentForm = styled.form`
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

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        text-decoration: underline;
      }
    }

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem var(--body-text-color);
    }
  }
`;

export const Text = styled.p`
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.6;
`;
