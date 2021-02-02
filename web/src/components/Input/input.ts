import styled from 'styled-components';

interface ContainerProps {
  variant: string;
  isFocused: boolean;
  value?: string;
  styles?: string;
}

const setInputProperties = (variant: string) => {
  if (variant === 'default') {
    return `padding: 0.75em 0.875em;`;
  }
  if (variant === 'labeled') {
    return `padding: 1.5em 0.625em 0.75em;`;
  }
};

const setLabelProperties = (
  variant: string,
  isFocused: boolean,
  value?: string
) => {
  if (variant === 'labeled') {
    if (isFocused || value) {
      return `
        top: 25%;
        left: 0.84em;
        font-size: 0.75em;
        font-weight: bold;
      `;
    } else {
      return `
        top: 50%;
        left: 0.625em;
        font-size: 1em;
        font-weight: 400;
      `;
    }
  }
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  margin: 0 0 0.5em;

  input {
    line-height: 1;
    width: 100%;
    outline: none;
    border: 0.065em solid var(--input-border-color);
    border-radius: 0.25em;
    background-color: var(--input-background-color);
    color: var(--body-text-color);
    ${({ variant }) => setInputProperties(variant)};

    &:focus {
      border-color: var(--input-focused-border-color);
      box-shadow: 0 0 0 0.065em var(--input-focused-border-color);
    }

    &::placeholder {
      color: var(--input-label-color);
    }
  }

  label {
    cursor: text;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 0.625em;
    transform: translateY(-50%);
    transition: all 0.1s ease;
    color: var(--input-label-color);
    ${({ variant, isFocused, value }) =>
      setLabelProperties(variant, isFocused, value)}
  }

  ${({ styles }) => styles}
`;
