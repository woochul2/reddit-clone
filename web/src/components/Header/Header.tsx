import NextLink from 'next/link';
import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { CREATE_POST, LOGIN, REGISTER } from '../../constants';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '../../generated/graphql';
import { Container, Link, LogoutButton, Username } from './header';

const isServer = () => typeof window === 'undefined';

interface Props {
  styles?: string;
}

export default function Header({ styles }: Props) {
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery({
    pause: isServer(),
  });
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container styles={styles}>
      {!fetchingCurrentUser && currentUserData?.currentUser && (
        <>
          <NextLink href={CREATE_POST} passHref>
            <Link>
              <IoCreateOutline />
            </Link>
          </NextLink>
          <Username>{currentUserData.currentUser.username}</Username>
          <LogoutButton onClick={handleLogout} disabled={fetchingLogout}>
            로그아웃
          </LogoutButton>
        </>
      )}
      {!fetchingCurrentUser && !currentUserData?.currentUser && !isServer() && (
        <>
          <NextLink href={LOGIN} passHref>
            <Link>로그인</Link>
          </NextLink>
          <NextLink href={REGISTER} passHref>
            <Link>회원가입</Link>
          </NextLink>
        </>
      )}
    </Container>
  );
}
