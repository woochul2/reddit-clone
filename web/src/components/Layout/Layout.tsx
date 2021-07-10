import Head from 'next/head';
import React from 'react';
import Header from '../Header';
import * as Styled from './styles/Layout';

interface Props {
  headerRef?: React.RefObject<HTMLElement>;
  variant?: 'default' | 'colored' | 'modal';
  showSearchBox?: Boolean;
  title?: string;
  onClickBackground?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: JSX.Element | JSX.Element[] | false | null;
}

export default function Layout({
  headerRef,
  variant = 'default',
  showSearchBox = true,
  title,
  onClickBackground,
  children,
}: Props) {
  const getLayoutStyles = (): React.CSSProperties => {
    if (variant === 'colored') {
      return { backgroundColor: 'var(--layout-background-color)' };
    }
    if (variant === 'modal') {
      return { backgroundColor: 'var(--modal-background-color)', paddingBottom: 0 };
    }
    return {};
  };

  return (
    <Styled.Container onClick={onClickBackground} style={getLayoutStyles()}>
      <Head>
        <title>{title ? title : 'reddit clone'}</title>
      </Head>
      <Header headerRef={headerRef} showSearchBox={showSearchBox} />
      {children}
    </Styled.Container>
  );
}
