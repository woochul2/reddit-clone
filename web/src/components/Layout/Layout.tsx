import Head from 'next/head';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import Header from '../Header';
import * as Styled from './styles/Layout';

interface Props {
  headerRef?: React.RefObject<HTMLElement>;
  variant?: 'default' | 'colored' | 'modal';
  searchBox?: 'on' | 'off';
  title?: string;
  onClickBackground?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: JSX.Element | JSX.Element[] | false | null;
  styles?: FlattenSimpleInterpolation;
}

export default function Layout({
  headerRef,
  variant = 'default',
  searchBox = 'on',
  title,
  onClickBackground,
  children,
  styles,
}: Props) {
  return (
    <Styled.Container variant={variant} styles={styles} onClick={onClickBackground}>
      <Head>
        <title>{title ? title : 'reddit clone'}</title>
      </Head>
      <Header headerRef={headerRef} searchBox={searchBox} onClick={(event) => event.stopPropagation()} />
      {children}
    </Styled.Container>
  );
}
