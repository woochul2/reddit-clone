import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { PAGES } from '../../constants';
import { Post } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import VoteIcon from '../VoteIcon';
import * as Styled from './styles/PostThumbnail';

interface Props {
  post: Post;
}

export default function PostThumbnail({ post }: Props) {
  const router = useRouter();
  const postPath = `${PAGES.POST_DETAIL}/${post.id}`;

  const handleClickPostThumbnail = async () => {
    await router.push(postPath);
  };

  return (
    <Styled.Container onClick={handleClickPostThumbnail}>
      <Styled.LeftPanel>
        <VoteIcon id={post.id} voteStatus={post.voteStatus} />
        <Styled.VoteCount>{post.voteCount}</Styled.VoteCount>
        <VoteIcon direction="down" id={post.id} voteStatus={post.voteStatus} />
      </Styled.LeftPanel>
      <Styled.Content>
        <NextLink href={postPath} passHref>
          <Styled.Title>{post.title}</Styled.Title>
        </NextLink>
        <Styled.Snippet>{post.textSnippet}</Styled.Snippet>
        <Styled.Info>
          <Styled.InfoLeft>
            <Styled.Vote>
              <VoteIcon id={post.id} voteStatus={post.voteStatus} />
              <Styled.VoteCount>{post.voteCount}</Styled.VoteCount>
              <VoteIcon direction="down" id={post.id} voteStatus={post.voteStatus} />
            </Styled.Vote>
            <Styled.Creator>
              <span>by</span> {post.creator.username}
            </Styled.Creator>
          </Styled.InfoLeft>
          <Styled.InfoRight>
            <Styled.Comment>댓글 {post.comments.length}개</Styled.Comment>
            <Styled.CreatedTime>
              <span className="desktop">{getLocalDate(post.createdAt)}</span>
              <span className="mobile">{getLocalDate(post.createdAt, 'dot')}</span>
            </Styled.CreatedTime>
          </Styled.InfoRight>
        </Styled.Info>
      </Styled.Content>
    </Styled.Container>
  );
}
