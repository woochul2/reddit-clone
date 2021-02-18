import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import {
  BREAKPOINT_SM,
  CREATE_POST,
  HOME,
  LOGIN,
  REGISTER,
} from '../../constants';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '../../generated/graphql';
import Close from '../../icons/Close';
import Menu from '../../icons/Menu';
import MoonFilled from '../../icons/MoonFilled';
import MoonOutlined from '../../icons/MoonOutlined';
import PencilFilled from '../../icons/PencilFilled';
import PencilOutlined from '../../icons/PencilOutlined';
import SunFilled from '../../icons/SunFilled';
import SunOutlined from '../../icons/SunOutlined';
import { isServer } from '../../utils/isServer';
import { remToPx } from '../../utils/remToPx';
import SearchBox from '../SearchBox';
import Tooltip from '../Tooltip';
import {
  Bottom,
  Container,
  IconButton,
  IconLink,
  Inside,
  Link,
  Logo,
  LogoutButton,
  MenuButton,
  MobileMenu,
  RightPanel,
} from './header';

interface Props {
  searchBox?: 'on' | 'off';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  styles?: FlattenSimpleInterpolation;
}

function isDarkMode(): boolean {
  if (isServer()) {
    return false;
  }

  if (document.documentElement.getAttribute('data-color-mode') === 'light') {
    return false;
  }

  return true;
}

export default function Header({ searchBox, onClick, styles }: Props) {
  const {
    data: currentUserData,
    loading: loadingCurrentuser,
  } = useCurrentUserQuery();
  const [logout, { loading: loadingLogout }] = useLogoutMutation();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuOffset, setMobileMenuOffset] = useState(0);
  const [, setColorMode] = useState('light');
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
    closeMobileMenu();
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    if (isMobileMenuOpen) {
      body.style.overflowY = 'hidden';
      setMobileMenuOffset(window.scrollY);
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
      <Container styles={styles} onClick={onClick}>
        <Inside>
          <div className="inside__desktop">
            <NextLink href={HOME} passHref>
              <Logo>
                reddit<span>.clone</span>
              </Logo>
            </NextLink>
            {searchBox === 'on' ? (
              <SearchBox />
            ) : (
              <div style={{ flexGrow: 1 }}></div>
            )}
            <RightPanel>
              <IconButton onClick={toggleDarkMode}>
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
              </IconButton>
              {!loadingCurrentuser && currentUserData?.currentUser && (
                <>
                  <NextLink href={CREATE_POST} passHref>
                    <IconLink>
                      <PencilOutlined className="original" />
                      <PencilFilled className="hovered" />
                      <Tooltip className="tooltip">글 작성</Tooltip>
                    </IconLink>
                  </NextLink>
                  <span>{currentUserData.currentUser.username}</span>
                  <LogoutButton onClick={handleLogout} disabled={loadingLogout}>
                    로그아웃
                  </LogoutButton>
                </>
              )}
              {!loadingCurrentuser && !currentUserData?.currentUser && (
                <>
                  <NextLink href={LOGIN} passHref>
                    <Link>로그인</Link>
                  </NextLink>
                  <NextLink href={REGISTER} passHref>
                    <Link>회원가입</Link>
                  </NextLink>
                </>
              )}
            </RightPanel>
          </div>
          <div className="inside__mobile">
            <MenuButton onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <Close className="close-icon" /> : <Menu />}
            </MenuButton>
            <NextLink href={HOME} passHref>
              <Logo onClick={closeMobileMenu}>
                reddit<span>.clone</span>
              </Logo>
            </NextLink>
            {!loadingCurrentuser && currentUserData?.currentUser && (
              <NextLink href={CREATE_POST} passHref>
                <IconLink onClick={closeMobileMenu}>
                  <PencilOutlined className="original" />
                  <PencilFilled className="hovered" />
                </IconLink>
              </NextLink>
            )}
          </div>
        </Inside>
      </Container>
      {isMobileMenuOpen && (
        <MobileMenu offset={`${mobileMenuOffset}px`}>
          <div>
            <SearchBox />
          </div>
          <Bottom>
            <IconButton onClick={toggleDarkMode}>
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
            </IconButton>
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
          </Bottom>
        </MobileMenu>
      )}
    </>
  );
}
