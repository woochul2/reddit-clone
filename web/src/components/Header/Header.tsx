import NextLink from 'next/link';
import React, { useState } from 'react';
import { CREATE_POST, HOME, LOGIN, REGISTER } from '../../constants';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '../../generated/graphql';
import Close from '../../icons/Close';
import PencilFilled from '../../icons/PencilFilled';
import PencilOutlined from '../../icons/PencilOutlined';
import SearchOutlined from '../../icons/SearchOutlined';
import Input from '../Input';
import Tooltip from '../Tooltip';
import {
  Container,
  Inside,
  Link,
  Logo,
  LogoutButton,
  SearchBox,
  searchInputStyles,
  Username,
} from './header';

const isServer = () => typeof window === 'undefined';

interface Props {
  searchBox?: 'on' | 'off';
  styles?: string;
}

export default function Header({ searchBox, styles }: Props) {
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery({
    pause: isServer(),
  });
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [isMouseOnPencil, setIsMouseOnPencil] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container styles={styles}>
      <Inside>
        <NextLink href={HOME} passHref>
          <Logo>
            reddit<span>.clone</span>
          </Logo>
        </NextLink>
        {searchBox === 'on' ? (
          <SearchBox value={searchValue}>
            <Input
              type="text"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              label="검색"
              focus={isSearchIconClicked}
              onBlur={() => setIsSearchIconClicked(false)}
              styles={searchInputStyles}
              autoComplete="off"
            />
            <SearchOutlined
              className="search-icon"
              onClick={() => setIsSearchIconClicked(true)}
            />
            <Close className="close-icon" onClick={() => setSearchValue('')} />
          </SearchBox>
        ) : (
          <SearchBox></SearchBox>
        )}
        {!fetchingCurrentUser && currentUserData?.currentUser && (
          <>
            <NextLink href={CREATE_POST} passHref>
              <Link
                onFocus={() => setIsMouseOnPencil(true)}
                onBlur={() => setIsMouseOnPencil(false)}
                onMouseOver={() => setIsMouseOnPencil(true)}
                onMouseLeave={() => setIsMouseOnPencil(false)}
              >
                {isMouseOnPencil ? <PencilFilled /> : <PencilOutlined />}
                <Tooltip show={isMouseOnPencil}>글 작성</Tooltip>
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
      </Inside>
    </Container>
  );
}
