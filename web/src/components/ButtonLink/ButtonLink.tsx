import NextLink from 'next/link';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import * as Styled from './styles/ButtonLink';

interface Props {
  href: string;
  children: React.ReactChild;
  styles?: FlattenSimpleInterpolation;
}

export default function ButtonLink({ href, children, styles }: Props) {
  return (
    <NextLink href={href} passHref>
      <Styled.Container styles={styles}>{children}</Styled.Container>
    </NextLink>
  );
}
