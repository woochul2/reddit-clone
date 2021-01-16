import { Container } from './ButtonStyles';

interface Props {
  children: React.ReactChild;
  styles?: string;
}

export default function Button({ children, styles }: Props) {
  return <Container styles={styles}>{children}</Container>;
}
