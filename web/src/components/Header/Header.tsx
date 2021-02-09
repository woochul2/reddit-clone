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
import PencilFilled from '../../icons/PencilFilled';
import PencilOutlined from '../../icons/PencilOutlined';
import { remToPx } from '../../utils/remToPx';
import SearchBox from '../SearchBox';
import Tooltip from '../Tooltip';
import {
  Bottom,
  Container,
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

export default function Header({ searchBox, onClick, styles }: Props) {
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();

  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuOffset, setMobileMenuOffset] = useState(0);
  const handleLogout = async () => {
    await logout();
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
              {!fetchingCurrentUser && currentUserData?.currentUser && (
                <>
                  <NextLink href={CREATE_POST} passHref>
                    <IconLink>
                      <PencilOutlined className="original" />
                      <PencilFilled className="hovered" />
                      <Tooltip className="tooltip">글 작성</Tooltip>
                    </IconLink>
                  </NextLink>
                  <span>{currentUserData.currentUser.username}</span>
                  <LogoutButton
                    onClick={handleLogout}
                    disabled={fetchingLogout}
                  >
                    로그아웃
                  </LogoutButton>
                </>
              )}
              {!fetchingCurrentUser && !currentUserData?.currentUser && (
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
            {!fetchingCurrentUser && currentUserData?.currentUser && (
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
            {!fetchingCurrentUser && currentUserData?.currentUser && (
              <>
                <p>{currentUserData.currentUser.username}</p>
                <button onClick={handleLogout} disabled={fetchingLogout}>
                  로그아웃
                </button>
              </>
            )}
            {!fetchingCurrentUser && !currentUserData?.currentUser && (
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
