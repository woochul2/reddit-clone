import styled from 'styled-components';

export const Container = styled.div`
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
    right: 0.875rem;
  }
`;

export const SearchResult = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  border: 0.065rem solid var(--input-border-color);
`;

export const Link = styled.a`
  cursor: pointer;
  max-width: 100%;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem 1.5rem;
  outline: 0;
  border: 0;
  background-color: var(--search-box-background-color);
  color: var(--body-text-color);

  &:hover {
    background-color: var(--search-box-hover-background-color);
  }

  &:focus-visible {
    background-color: var(--search-box-hover-background-color);
  }
`;
