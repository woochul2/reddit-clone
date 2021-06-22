import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { PAGES } from '../../constants';
import ButtonLink from '../ButtonLink';
import * as Styled from './styles/Confirmation';

interface Props {
  text: string;
  styles?: FlattenSimpleInterpolation;
}

export default function Confirmation({ text, styles }: Props) {
  return (
    <Styled.Container styles={styles}>
      <p className="confirmation__text">{text}</p>
      <ButtonLink href={PAGES.HOME}>홈 화면으로</ButtonLink>
    </Styled.Container>
  );
}
