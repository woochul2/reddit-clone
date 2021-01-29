import styled from 'styled-components';

interface ContainerProps {
  variant?: string;
  isFocused: boolean;
  value?: string;
  styles?: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  margin: 0.5em 0;

  input {
    line-height: 1;
    width: 100%;
    outline: none;
    border: 0.07em solid var(--input-border-color);
    border-radius: 0.25em;
    background-color: var(--input-background-color);
    color: var(--input-text-color);
    ${({ variant }) =>
      variant === 'default' &&
      `
        padding: 0.75em 0.525em;
      `};
    ${({ variant }) =>
      variant === 'labeled' &&
      `
        padding: 1.5em 0.625em 0.75em;
      `};

    &:focus {
      box-shadow: 0 0 0 0.07em var(--input-border-color);
    }
  }

  label {
    cursor: text;
    user-select: none;
    position: absolute;
    transform: translateY(-50%);
    transition: all 0.1s ease;
    color: var(--input-label-color);
    ${({ variant, value }) =>
      variant === 'default' &&
      value &&
      `
        display: none;
      `};
    ${({ variant, isFocused, value }) =>
      variant === 'labeled' && (isFocused || value)
        ? `
            top: 25%;
            left: 0.84em;
            font-size: 0.75em;
            font-weight: bold;
          `
        : `
            top: 50%;
            left: 0.625em;
            font-size: 1em;
            font-weight: 400;
          `};
  }

  ${({ styles }) => styles}
`;
