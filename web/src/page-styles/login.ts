import styled from 'styled-components';
import { BREAKPOINT_SM } from '../constants';

export const Container = styled.div``;

export const Link = styled.a`
  align-self: flex-end;
  text-decoration: none;
  outline: 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  @media (max-width: ${BREAKPOINT_SM}) {
    padding-right: 0.25rem;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;
