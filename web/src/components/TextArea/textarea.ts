import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.textarea<ContainerProps>`
  resize: vertical;
  padding: 0.5em;
  outline: 0;
  border: 0.07em solid var(--input-border-color);
  border-radius: 0.125em;
  color: var(--textarea-text-color);

  &:focus {
    box-shadow: 0 0 0 0.07em var(--textarea-border-color);
  }

  &::placeholder {
    color: var(--textarea-placeholder-color);
  }

  ${({ styles }) => styles}
`;
