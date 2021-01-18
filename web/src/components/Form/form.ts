import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 0 auto;
  ${({ styles }) => styles}
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Error = styled.p`
  color: var(--error-color);
`;
