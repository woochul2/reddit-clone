import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .confirmation__text {
    font-size: 1.5em;
    margin: 2em 0 0.75em;
  }

  ${({ styles }) => styles}
`;
