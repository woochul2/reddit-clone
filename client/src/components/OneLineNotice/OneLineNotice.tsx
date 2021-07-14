import React from 'react';
import { PAGES } from '../../constants';
import ButtonLink from '../ButtonLink';
import * as Styled from './styles/OneLineNotice';

interface Props {
  text: string;
}

export default function OneLineNotice({ text }: Props) {
  return (
    <Styled.Container>
      <Styled.Text>{text}</Styled.Text>
      <ButtonLink href={PAGES.HOME}>홈 화면으로</ButtonLink>
    </Styled.Container>
  );
}
