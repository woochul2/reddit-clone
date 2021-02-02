import styled from 'styled-components';

interface ContainerProps {
  styles?: string;
}

export const Container = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;
  max-width: 27rem;
  margin: 1.375rem auto 0.25rem;
  ${({ styles }) => styles}
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0 0 1rem;
`;

export const SubTitle = styled.p`
  margin-bottom: 1em;
`;

export const Error = styled.p`
  color: var(--error-color);
  margin-bottom: 1em;
`;
