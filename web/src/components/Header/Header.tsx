import NextLink from 'next/link';
import React, { useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
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
  IconLink,
  Inside,
  Link,
  Logo,
  LogoutButton,
  SearchBox,
  searchInputStyles,
  Username,
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
  const [searchValue, setSearchValue] = useState('');
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container styles={styles} onClick={onClick}>
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
              <IconLink>
                <PencilOutlined className="original" />
                <PencilFilled className="hovered" />
                <Tooltip className="tooltip">글 작성</Tooltip>
              </IconLink>
            </NextLink>
            <Username>{currentUserData.currentUser.username}</Username>
            <LogoutButton onClick={handleLogout} disabled={fetchingLogout}>
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
      </Inside>
    </Container>
  );
}
