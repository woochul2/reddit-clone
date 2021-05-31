import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { AUTH_TOKEN, BREAKPOINT_SM, CREATE_POST, HOME, LOGIN, REGISTER } from '../../constants';
import { useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import Close from '../../icons/Close';
import Menu from '../../icons/Menu';
import MoonFilled from '../../icons/MoonFilled';
import MoonOutlined from '../../icons/MoonOutlined';
import PencilFilled from '../../icons/PencilFilled';
import PencilOutlined from '../../icons/PencilOutlined';
import SunFilled from '../../icons/SunFilled';
import SunOutlined from '../../icons/SunOutlined';
import { remToPx } from '../../utils/remToPx';
import SearchBox from '../SearchBox';
import Tooltip from '../Tooltip';
import * as Styled from './styles/Header';

interface Props {
  searchBox?: 'on' | 'off';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  styles?: FlattenSimpleInterpolation;
}

function isDarkMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (document.documentElement.getAttribute('data-color-mode') === 'light') {
    return false;
  }

  return true;
}

export default function Header({ searchBox, onClick, styles }: Props) {
  const { data: currentUserData, loading: loadingCurrentuser } = useCurrentUserQuery();
  const [logout, { loading: loadingLogout }] = useLogoutMutation();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuOffset, setMobileMenuOffset] = useState(0);
  const [mobileMenuHeight, setMobileMenuHeight] = useState(0);
  const [, setColorMode] = useState('light');
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    document.cookie = `${AUTH_TOKEN}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;

    closeMobileMenu();
    await apolloClient.resetStore();
    await logout();
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    if (isMobileMenuOpen) {
      body.style.overflowY = 'hidden';
      setMobileMenuOffset(window.scrollY);
      setMobileMenuHeight(window.innerHeight);
    }

    if (!isMobileMenuOpen) {
      body.style.overflowY = 'visible';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogin = async () => {
    await router.push(LOGIN);
    closeMobileMenu();
  };

  const handleRegister = async () => {
    await router.push(REGISTER);
    closeMobileMenu();
  };

  const resizeEvent = () => {
    const smallBreakPoint = remToPx(BREAKPOINT_SM);
    if (!smallBreakPoint) {
      return null;
    }

    if (window.innerWidth >= smallBreakPoint) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  useEffect(() => {
    const currentColorMode = localStorage.getItem('color-mode');
    if (!currentColorMode) {
      localStorage.setItem('color-mode', 'light');
      return;
    }
    setColorMode(currentColorMode);

    if (currentColorMode === 'dark') {
      document.documentElement.setAttribute('data-color-mode', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const currentMode = localStorage.getItem('color-mode');

    if (currentMode === 'dark') {
      document.documentElement.setAttribute('data-color-mode', 'light');
      localStorage.setItem('color-mode', 'light');
      setColorMode('light');
      return;
    }

    if (currentMode === 'light') {
      document.documentElement.setAttribute('data-color-mode', 'dark');
      localStorage.setItem('color-mode', 'dark');
      setColorMode('dark');
      return;
    }
  };

  return (
    <>
      <Styled.Container styles={styles} onClick={onClick}>
        <Styled.Inside>
          <div className="inside__desktop">
            <NextLink href={HOME} passHref>
              <Styled.Logo>
                reddit<span>.clone</span>
              </Styled.Logo>
            </NextLink>
            {searchBox === 'on' ? <SearchBox /> : <div style={{ flexGrow: 1 }}></div>}
            <Styled.RightPanel>
              <Styled.IconButton onClick={toggleDarkMode}>
                {!isDarkMode() && (
                  <>
                    <MoonOutlined className="original" />
                    <MoonFilled className="hovered" />
                    <Tooltip className="tooltip">다크 모드</Tooltip>
                  </>
                )}
                {isDarkMode() && (
                  <>
                    <SunOutlined className="original" />
                    <SunFilled className="hovered" />
                    <Tooltip className="tooltip">라이트 모드</Tooltip>
                  </>
                )}
              </Styled.IconButton>
              {!loadingCurrentuser && currentUserData?.currentUser && (
                <>
                  <NextLink href={CREATE_POST} passHref>
                    <Styled.IconLink>
                      <PencilOutlined className="original" />
                      <PencilFilled className="hovered" />
                      <Tooltip className="tooltip">글 작성</Tooltip>
                    </Styled.IconLink>
                  </NextLink>
                  <span>{currentUserData.currentUser.username}</span>
                  <Styled.LogoutButton onClick={handleLogout} disabled={loadingLogout}>
                    로그아웃
                  </Styled.LogoutButton>
                </>
              )}
              {!loadingCurrentuser && !currentUserData?.currentUser && (
                <>
                  <NextLink href={LOGIN} passHref>
                    <Styled.Link>로그인</Styled.Link>
                  </NextLink>
                  <NextLink href={REGISTER} passHref>
                    <Styled.Link>회원가입</Styled.Link>
                  </NextLink>
                </>
              )}
            </Styled.RightPanel>
          </div>
          <div className="inside__mobile">
            <Styled.MenuButton onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <Close className="close-icon" /> : <Menu />}
            </Styled.MenuButton>
            <NextLink href={HOME} passHref>
              <Styled.Logo onClick={closeMobileMenu}>
                reddit<span>.clone</span>
              </Styled.Logo>
            </NextLink>
            {!loadingCurrentuser && currentUserData?.currentUser && (
              <NextLink href={CREATE_POST} passHref>
                <Styled.IconLink onClick={closeMobileMenu}>
                  <PencilOutlined className="original" />
                  <PencilFilled className="hovered" />
                </Styled.IconLink>
              </NextLink>
            )}
          </div>
        </Styled.Inside>
      </Styled.Container>
      {isMobileMenuOpen && (
        <Styled.MobileMenu
          offset={`${mobileMenuOffset}px`}
          height={`${mobileMenuHeight}px`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu__inside">
            <div>
              <SearchBox />
            </div>
            <Styled.MobileMenuBottom>
              <Styled.IconButton onClick={toggleDarkMode}>
                {!isDarkMode() && (
                  <>
                    <MoonOutlined className="original" />
                    <MoonFilled className="hovered" />
                  </>
                )}
                {isDarkMode() && (
                  <>
                    <SunOutlined className="original" />
                    <SunFilled className="hovered" />
                  </>
                )}
              </Styled.IconButton>
              {!loadingCurrentuser && currentUserData?.currentUser && (
                <>
                  <p>{currentUserData.currentUser.username}</p>
                  <button onClick={handleLogout} disabled={loadingLogout}>
                    로그아웃
                  </button>
                </>
              )}
              {!loadingCurrentuser && !currentUserData?.currentUser && (
                <>
                  <button onClick={handleLogin}>로그인</button>
                  <button onClick={handleRegister}>회원가입</button>
                </>
              )}
            </Styled.MobileMenuBottom>
          </div>
        </Styled.MobileMenu>
      )}
    </>
  );
}
