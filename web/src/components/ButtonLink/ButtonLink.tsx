import NextLink from 'next/link';
import { Container } from './button-link';

interface Props {
  href: string;
  children: React.ReactChild;
  styles?: string;
}

export default function ButtonLink({ href, children, styles }: Props) {
  return (
    <NextLink href={href} passHref>
      <Container styles={styles}>{children}</Container>
    </NextLink>
  );
}
