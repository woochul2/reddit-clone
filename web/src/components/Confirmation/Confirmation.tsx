import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { HOME } from '../../constants';
import ButtonLink from '../ButtonLink';
import { Container } from './confirmation';

interface Props {
  text: string;
  styles?: FlattenSimpleInterpolation;
}

export default function Confirmation({ text, styles }: Props) {
  return (
    <Container styles={styles}>
      <p className="confirmation__text">{text}</p>
      <ButtonLink href={HOME}>홈 화면으로</ButtonLink>
    </Container>
  );
}
