import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
  isFocused: boolean;
  value: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  margin: 0.5em 0;

  input {
    line-height: 1;
    width: 100%;
    padding: 1.5em 0.625em 0.75em;
    outline: none;
    border: 0.07em solid var(--input-border-color);
    border-radius: 0.25em;
    background-color: var(--input-background-color);
    color: var(--input-text-color);

    &:focus {
      box-shadow: 0 0 0 0.07em var(--input-border-color);
    }
  }

  label {
    cursor: text;
    user-select: none;
    position: absolute;
    top: ${({ isFocused, value }) => (isFocused || value ? '25%' : '50%')};
    left: ${({ isFocused, value }) =>
      isFocused || value ? '0.84em' : '0.625em'};
    transform: translateY(-50%);
    transition: all 0.1s ease;
    font-size: ${({ isFocused, value }) =>
      isFocused || value ? '0.75em' : '1em'};
    font-weight: ${({ isFocused, value }) =>
      isFocused || value ? 'bold' : '400'};
    color: var(--input-label-color);
  }

  ${({ styles }) => styles}
`;
