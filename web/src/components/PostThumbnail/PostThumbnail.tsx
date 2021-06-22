import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';
import { PAGES } from '../../constants';
import { Post, User } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import VoteIcon from '../VoteIcon';
import * as Styled from './styles/PostThumbnail';

interface Props {
  post: Post;
  currentUser?: User | null;
  styles?: FlattenSimpleInterpolation;
}

export default function PostThumbnail({ post, styles }: Props) {
  const router = useRouter();
  const postPath = `${PAGES.POST_DETAIL}/${post.id}`;

  const handleClickContainer = async () => {
    await router.push(postPath);
  };

  return (
    <>
      <Styled.Container styles={styles} onClick={handleClickContainer}>
        <Styled.LeftPanel>
          <VoteIcon id={post.id} voteStatus={post.voteStatus} />
          <Styled.VoteCounts>{post.voteCounts}</Styled.VoteCounts>
          <VoteIcon variant="down" id={post.id} voteStatus={post.voteStatus} />
        </Styled.LeftPanel>
        <Styled.Content>
          <NextLink href={postPath} passHref>
            <Styled.Title>{post.title}</Styled.Title>
          </NextLink>
          <Styled.Snippet>{post.textSnippet}</Styled.Snippet>
          <Styled.Info>
            <div className="info__left">
              <div className="info__vote">
                <VoteIcon
                  id={post.id}
                  voteStatus={post.voteStatus}
                  styles={css`
                    margin: 0;
                  `}
                />
                <Styled.VoteCounts>{post.voteCounts}</Styled.VoteCounts>
                <VoteIcon
                  variant="down"
                  id={post.id}
                  voteStatus={post.voteStatus}
                  styles={css`
                    margin: 0;
                  `}
                />
              </div>
              <Styled.Creator>
                <span>by</span> {post.creator.username}
              </Styled.Creator>
            </div>
            <div className="info__right">
              <Styled.Comment>댓글 {post.comments.length}개</Styled.Comment>
              <Styled.CreatedTime>
                <span className="desktop">{getLocalDate(post.createdAt)}</span>
                <span className="mobile">{getLocalDate(post.createdAt, 'dot')}</span>
              </Styled.CreatedTime>
            </div>
          </Styled.Info>
        </Styled.Content>
      </Styled.Container>
    </>
  );
}
