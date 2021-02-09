import Fuse from 'fuse.js';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import {
  CREATE_POST,
  HOME,
  LOGIN,
  POST_DETAIL,
  REGISTER,
} from '../../constants';
import {
  Post,
  useCurrentUserQuery,
  useLogoutMutation,
  usePostsQuery,
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
  SearchResult,
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
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery({
    variables: { variant: 'all' },
  });
  const [searchedItems, setSearchedItems] = useState<Fuse.FuseResult<Post>[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const options = {
      keys: ['title'],
    };
    const posts = postsData?.posts as Post[];
    if (!posts) {
      return;
    }
    const fuse = new Fuse(posts, options);
    const items = fuse.search(searchValue).slice(0, 5);
    setSearchedItems(items);
  }, [searchValue]);

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
        {searchBox === 'on' && !fetchingPosts ? (
          <SearchBox value={searchValue}>
            <Input
              type="text"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              label="제목 검색"
              focus={isSearchIconClicked}
              onBlur={() => setIsSearchIconClicked(false)}
              autoComplete="off"
              styles={searchInputStyles}
            />
            <SearchOutlined
              className="search-icon"
              onClick={() => setIsSearchIconClicked(true)}
            />
            <Close className="close-icon" onClick={() => setSearchValue('')} />
            {searchedItems.length !== 0 && (
              <SearchResult>
                {searchedItems.map(({ item }) => (
                  <button
                    key={item.id}
                    onClick={async () => {
                      await router.push(`${POST_DETAIL}/${item.id}`);
                      setSearchValue('');
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </SearchResult>
            )}
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
