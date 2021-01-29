import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.header<ContainerProps>`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  color: var(--header-text-color);

  svg {
    height: 1.25em;
    width: 1.25em;
  }

  &:hover {
    text-decoration: underline;

    svg {
      color: var(--header-svg-hover-color);
    }
  }
`;
