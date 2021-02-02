import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.header<ContainerProps>`
  z-index: 1;
  position: sticky;
  top: 0;
  padding: 0.375rem 0;
  border-bottom: 0.07rem solid var(--header-border-color);
  background-color: var(--header-background-color);
  ${({ styles }) => styles}
`;

export const Inside = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const Logo = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  outline: 0;
  padding: 0.16rem 0;
  border-radius: 0.125em;
  color: var(--logo-color);

  span {
    font-size: 1.125rem;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--link-focused-border-color);
  }
`;

export const SearchBox = styled.div<{ value?: string }>`
  position: relative;
  flex-grow: 1;

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .search-icon {
    cursor: text;
    left: 0.75rem;
    color: var(--input-label-color);
  }

  .close-icon {
    display: ${({ value }) => (value ? 'block' : 'none')};
    right: 0.875rem;
  }
`;

export const searchInputStyles = `
  margin: 0;

  input {
    background-color: var(--search-box--background-color);
    padding: 0.375rem 2.5rem 0.375rem 3.125rem;
  }
`;

export const Username = styled.span``;

export const LogoutButton = styled.button`
  cursor: pointer;
  outline: 0;
  border: none;
  border-radius: 0.125em;
  background: none;
  color: var(--body-text-color);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--button-focused-border-color);
  }
`;

export const Link = styled.a`
  position: relative;
  text-decoration: none;
  outline: 0;
  border-radius: 0.125em;
  color: var(--body-text-color);

  svg {
    display: block;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem var(--link-focused-border-color);
  }
`;
