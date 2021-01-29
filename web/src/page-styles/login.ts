import styled from 'styled-components';

export const Container = styled.div``;

export const Link = styled.a`
  align-self: flex-end;
  text-decoration: none;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }
`;
