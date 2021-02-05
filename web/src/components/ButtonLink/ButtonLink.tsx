import NextLink from 'next/link';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { Container } from './button-link';

interface Props {
  href: string;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function ButtonLink({ href, children, styles }: Props) {
  return (
    <NextLink href={href} passHref>
      <Container styles={styles}>{children}</Container>
    </NextLink>
  );
}
