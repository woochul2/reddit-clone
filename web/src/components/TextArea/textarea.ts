import TextareaAutosize from 'react-textarea-autosize';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled(TextareaAutosize)<ContainerProps>`
  resize: none;
  word-break: break-all;
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.6;
  padding: 0.75em 0.875em;
  outline: 0;
  border: 0.065em solid var(--input-border-color);
  border-radius: 0.125em;
  color: var(--input-text-color);

  &:focus {
    border-color: var(--input-focused-border-color);
    box-shadow: 0 0 0 0.065em var(--input-focused-border-color);
  }

  &::placeholder {
    color: var(--input-label-color);
  }

  ${({ styles }) => styles}
`;
