import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import Header from '../Header';
import * as Styled from './styles/Layout';

interface Props {
  variant?: 'default' | 'colored' | 'modal';
  searchBox?: 'on' | 'off';
  onClickBackground?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: JSX.Element | JSX.Element[] | false | null;
  styles?: FlattenSimpleInterpolation;
}

export default function Layout({ variant = 'default', searchBox = 'on', onClickBackground, children, styles }: Props) {
  return (
    <Styled.Container variant={variant} styles={styles} onClick={onClickBackground}>
      <Header searchBox={searchBox} onClick={(event) => event.stopPropagation()} />
      {children}
    </Styled.Container>
  );
}
