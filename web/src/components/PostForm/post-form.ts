import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface ContainerProps {
  styles?: FlattenSimpleInterpolation;
}

export const Container = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;
  max-width: 36.75rem;
  margin: 1.375rem auto;
  ${({ styles }) => styles}
`;

export const Title = styled.h1`
  margin: 0 auto 1.25rem;
`;

export const textAreaStyles = css`
  margin: 0 0 0.625rem;
`;
