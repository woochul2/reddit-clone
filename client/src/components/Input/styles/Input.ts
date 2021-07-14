import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 0 0 0.5em;

  input {
    line-height: 1;
    width: 100%;
    padding: 0.75em 0.875em;
    outline: none;
    border: 0.065em solid var(--input-border-color);
    border-radius: 0.25em;
    background-color: var(--input-background-color);
    color: var(--body-text-color);

    &:focus {
      box-shadow: 0 0 0 0.065em var(--input-border-color);
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
  }
`;
