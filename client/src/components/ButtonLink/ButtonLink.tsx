import NextLink from 'next/link';
import React from 'react';
import * as Styled from './styles/ButtonLink';

interface Props {
  href: string;
  children: React.ReactChild;
}

export default function ButtonLink({ href, children }: Props) {
  return (
    <NextLink href={href} passHref>
      <Styled.Container>{children}</Styled.Container>
    </NextLink>
  );
}
