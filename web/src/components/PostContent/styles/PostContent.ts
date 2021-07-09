import styled from 'styled-components';

export const Container = styled.div`
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
  gap: 1rem;
  font-size: 0.875rem;
`;

export const CreationDate = styled.div`
  color: var(--post-second-text-color);
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

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

export const ContentText = styled.p`
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.6;
`;
