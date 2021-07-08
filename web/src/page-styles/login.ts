import styled from 'styled-components';

export const Link = styled.a`
  align-self: flex-end;
  text-decoration: none;
  outline: 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--body-text-color);
  }
`;
