import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.textarea<ContainerProps>`
  resize: vertical;
  word-break: break-all;
  line-height: 1.4;
  padding: 0.75em 0.875em;
  outline: 0;
  border: 0.065em solid var(--input-border-color);
  border-radius: 0.125em;
  color: var(--input-text-color);

  &:focus {
    border-color: var(--input-focused-border-color);
    line-height: 1.4;
    box-shadow: 0 0 0 0.065em var(--input-focused-border-color);
  }

  &::placeholder {
    color: var(--input-label-color);
  }

  ${({ styles }) => styles}
`;
