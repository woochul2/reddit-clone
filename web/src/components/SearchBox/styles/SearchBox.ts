import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  value?: string;
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.div<ContainerProps>`
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
  ${({ styles }) => styles}
`;

export const searchInputStyles = css`
  margin: 0;

  input {
    background-color: var(--search-box-background-color);
    padding: 0.375rem 2.5rem 0.375rem 3.125rem;
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

  button {
    cursor: pointer;
    max-width: 100%;
    text-align: left;
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
  }
`;
