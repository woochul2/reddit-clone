import styled from 'styled-components';
import { BREAKPOINTS } from '../../../constants';

export const Container = styled.form`
  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0 0.25rem;
  }
`;

export const Inside = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 27rem;
  margin: 1.375rem auto 0.25rem;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0 0 1rem;
`;

export const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 1em;
  padding: 0 1.5rem;
`;

export const Error = styled.p`
  color: var(--error-color);
  margin-bottom: 1em;
`;
