import styled from 'styled-components';
import { BREAKPOINTS } from '../../../constants';

export const Container = styled.form`
  @media (max-width: ${BREAKPOINTS.MD}) {
    padding: 0 0.5rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0 0.25rem;
  }
`;

export const Inside = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 36.75rem;
  margin: 1.375rem auto;
`;

export const Title = styled.h1`
  margin: 0 auto 1.25rem;
`;
