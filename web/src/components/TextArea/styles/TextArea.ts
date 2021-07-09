import TextAreaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

export const Container = styled(TextAreaAutosize)`
  resize: none;
  word-break: break-all;
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.6;
  padding: 0.75em 0.875em;
  outline: 0;
  border: 0.065em solid var(--input-border-color);
  border-radius: 0.125em;
  background-color: var(--input-background-color);
  color: var(--input-text-color);

  &:focus {
    box-shadow: 0 0 0 0.065em var(--input-border-color);
  }

  &::placeholder {
    color: var(--input-label-color);
  }
`;
