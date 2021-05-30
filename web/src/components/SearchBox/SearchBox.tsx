import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { POST_DETAIL } from '../../constants';
import { Post, usePostsQuery } from '../../generated/graphql';
import Close from '../../icons/Close';
import SearchOutlined from '../../icons/SearchOutlined';
import Input from '../Input';
import * as Styled from './styles/SearchBox';

interface Props {
  styles?: FlattenSimpleInterpolation;
}

export default function SearchBox({ styles }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [searchedItems, setSearchedItems] = useState<Fuse.FuseResult<Post>[]>([]);
  const { data: postsData, loading: loadingPosts } = usePostsQuery();
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

  return (
    <Styled.Container value={searchValue} styles={styles}>
      {!loadingPosts && (
        <>
          <Input
            type="text"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="제목 검색"
            focus={isSearchIconClicked}
            onBlur={() => setIsSearchIconClicked(false)}
            autoComplete="off"
            styles={Styled.searchInputStyles}
          />
          <SearchOutlined className="search-icon" onClick={() => setIsSearchIconClicked(true)} />
          <Close className="close-icon" onClick={() => setSearchValue('')} />
          {searchedItems.length !== 0 && (
            <Styled.SearchResult>
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
            </Styled.SearchResult>
          )}
        </>
      )}
    </Styled.Container>
  );
}
