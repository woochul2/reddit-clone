import Fuse from 'fuse.js';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PAGES } from '../../constants';
import { Post, usePostsQuery } from '../../generated/graphql';
import Close from '../../icons/Close';
import SearchOutlined from '../../icons/SearchOutlined';
import Input from '../Input';
import * as Styled from './styles/SearchBox';

export default function SearchBox() {
  const router = useRouter();
  const { data: postsData, loading: loadingPosts } = usePostsQuery();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchedItems, setSearchedItems] = useState<Fuse.FuseResult<Post>[]>([]);

  useEffect(() => {
    const posts = postsData?.posts;
    if (!posts) return;

    const fuse = new Fuse(posts, {
      keys: ['title'],
    });
    const items = fuse.search(searchValue).slice(0, 5);
    setSearchedItems(items);
  }, [searchValue]);

  return (
    <Styled.Container>
      {!loadingPosts && (
        <>
          <Input
            variant="search"
            type="text"
            name="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onBlur={() => setIsSearchIconClicked(false)}
            label="제목 검색"
            focus={isSearchIconClicked}
            autoComplete="off"
          />
          <SearchOutlined className="search-icon" onClick={() => setIsSearchIconClicked(true)} />
          <Close
            className="close-icon"
            onClick={() => setSearchValue('')}
            style={searchValue ? { display: 'block' } : { display: 'none' }}
          />
          {searchedItems.length !== 0 && (
            <Styled.SearchResult>
              {searchedItems.map(({ item }) => (
                <NextLink key={item.id} href={`${PAGES.POST_DETAIL}/${item.id}`} passHref>
                  <Styled.Link onClick={() => setSearchValue('')}>{item.title}</Styled.Link>
                </NextLink>
              ))}
            </Styled.SearchResult>
          )}
        </>
      )}
    </Styled.Container>
  );
}
