import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  justify-content: flex-end;
  padding: 1em;
  border-bottom: 0.07em solid var(--header-border-color);
  background-color: var(--header-background-color);
  color: var(--header-text-color);
  ${({ styles }) => styles}
`;

export const Username = styled.span``;

export const LogoutButton = styled.button`
  cursor: pointer;
  margin: 0 1em;
  outline: 0;
  border: none;
  background: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.1em var(--header-button-focus-border-color);
  }
`;

export const Link = styled.a`
  text-decoration: none;
  margin: 0 1em;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }
`;
