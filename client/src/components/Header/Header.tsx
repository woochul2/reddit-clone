import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BREAKPOINTS, COOKIE_NAMES, PAGES } from '../../constants';
import { useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import Close from '../../icons/Close';
import Menu from '../../icons/Menu';
import MoonFilled from '../../icons/MoonFilled';
import MoonOutlined from '../../icons/MoonOutlined';
import PencilFilled from '../../icons/PencilFilled';
import PencilOutlined from '../../icons/PencilOutlined';
import SunFilled from '../../icons/SunFilled';
import SunOutlined from '../../icons/SunOutlined';
import { changeRemToPx } from '../../utils/changeRemToPx';
import { deleteCookie } from '../../utils/deleteCookie';
import SearchBox from '../SearchBox';
import Tooltip from '../Tooltip';
import * as Styled from './styles/Header';

interface Props {
  headerRef?: React.RefObject<HTMLElement>;
  showSearchBox?: Boolean;
}

export default function Header({ headerRef, showSearchBox }: Props) {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: currentUserData, loading: loadingCurrentuser } = useCurrentUserQuery();
  const [logout, { loading: loadingLogout }] = useLogoutMutation();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentColorMode = localStorage.getItem('color-mode');
    if (!currentColorMode) {
      localStorage.setItem('color-mode', 'light');
      return;
    }

    if (currentColorMode === 'dark') {
      document.documentElement.setAttribute('data-color-mode', 'dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const currentMode = localStorage.getItem('color-mode');

    if (currentMode === 'dark') {
      document.documentElement.setAttribute('data-color-mode', 'light');
      localStorage.setItem('color-mode', 'light');
      setIsDarkMode(false);
    } else if (currentMode === 'light') {
      document.documentElement.setAttribute('data-color-mode', 'dark');
      localStorage.setItem('color-mode', 'dark');
      setIsDarkMode(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
    closeMobileMenu();
    await apolloClient.resetStore();
    await logout();
  };

  const handleLogin = async () => {
    await router.push(PAGES.LOGIN);
    closeMobileMenu();
  };

  const handleRegister = async () => {
    await router.push(PAGES.REGISTER);
    closeMobileMenu();
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    if (isMobileMenuOpen) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'visible';
    }
  }, [isMobileMenuOpen]);

  const resizeEvent = () => {
    if (window.innerWidth >= changeRemToPx(BREAKPOINTS.SM)) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <>
      <Styled.Container ref={headerRef} onClick={(event) => event.stopPropagation()}>
        <Styled.DesktopInside>
          <NextLink href={PAGES.HOME} passHref>
            <Styled.Logo>
              reddit<span>.clone</span>
            </Styled.Logo>
          </NextLink>
          {showSearchBox ? <SearchBox /> : <div style={{ flexGrow: 1 }}></div>}
          <Styled.RightPanel>
            <Styled.IconButton onClick={toggleDarkMode}>
              {isDarkMode ? (
                <>
                  <SunOutlined className="original" />
                  <SunFilled className="hovered" />
                  <Tooltip className="tooltip">라이트 모드</Tooltip>
                </>
              ) : (
                <>
                  <MoonOutlined className="original" />
                  <MoonFilled className="hovered" />
                  <Tooltip className="tooltip">다크 모드</Tooltip>
                </>
              )}
            </Styled.IconButton>
            {!loadingCurrentuser && (
              <>
                {currentUserData?.currentUser ? (
                  <>
                    <NextLink href={PAGES.CREATE_POST} passHref>
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
                ) : (
                  <>
                    <NextLink href={PAGES.LOGIN} passHref>
                      <Styled.AuthLink>로그인</Styled.AuthLink>
                    </NextLink>
                    <NextLink href={PAGES.REGISTER} passHref>
                      <Styled.AuthLink>회원가입</Styled.AuthLink>
                    </NextLink>
                  </>
                )}
              </>
            )}
          </Styled.RightPanel>
        </Styled.DesktopInside>
        <Styled.MobileInside>
          <Styled.MenuButton onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            {isMobileMenuOpen ? <Close className="close-icon" /> : <Menu />}
          </Styled.MenuButton>
          <NextLink href={PAGES.HOME} passHref>
            <Styled.Logo onClick={closeMobileMenu}>
              reddit<span>.clone</span>
            </Styled.Logo>
          </NextLink>
          {!loadingCurrentuser && currentUserData?.currentUser && (
            <NextLink href={PAGES.CREATE_POST} passHref>
              <Styled.IconLink onClick={closeMobileMenu}>
                <PencilOutlined className="original" />
                <PencilFilled className="hovered" />
              </Styled.IconLink>
            </NextLink>
          )}
        </Styled.MobileInside>
      </Styled.Container>
      {isMobileMenuOpen && (
        <Styled.MobileMenu onClick={(event) => event.stopPropagation()} style={{ top: `${window.scrollY}px` }}>
          <Styled.MobileMenuInside height={`${window.innerHeight}px`}>
            <div>
              <SearchBox />
            </div>
            <Styled.MobileMenuBottons>
              <Styled.IconButton onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <>
                    <SunOutlined className="original" />
                    <SunFilled className="hovered" />
                  </>
                ) : (
                  <>
                    <MoonOutlined className="original" />
                    <MoonFilled className="hovered" />
                  </>
                )}
              </Styled.IconButton>
              {!loadingCurrentuser && (
                <>
                  {currentUserData?.currentUser ? (
                    <>
                      <p>{currentUserData.currentUser.username}</p>
                      <button onClick={handleLogout} disabled={loadingLogout}>
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleLogin}>로그인</button>
                      <button onClick={handleRegister}>회원가입</button>
                    </>
                  )}
                </>
              )}
            </Styled.MobileMenuBottons>
          </Styled.MobileMenuInside>
        </Styled.MobileMenu>
      )}
    </>
  );
}
