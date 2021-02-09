import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';
import { POST_DETAIL } from '../../constants';
import { Post, User } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import VoteIcon from '../VoteIcon';
import {
  Comment,
  Container,
  Content,
  CreatedTime,
  Creator,
  Info,
  LeftPanel,
  Snippet,
  Title,
  VoteCounts,
} from './post-thumbnail';

interface Props {
  post: Post;
  currentUser?: User | null;
  styles?: FlattenSimpleInterpolation;
}

export default function PostThumbnail({ post, styles }: Props) {
  const router = useRouter();
  const postPath = `${POST_DETAIL}/${post.id}`;

  const handleClickContainer = async () => {
    await router.push(postPath);
  };

  return (
    <>
      <Container styles={styles} onClick={handleClickContainer}>
        <LeftPanel>
          <VoteIcon id={post.id} voteStatus={post.voteStatus} />
          <VoteCounts>{post.voteCounts}</VoteCounts>
          <VoteIcon variant="down" id={post.id} voteStatus={post.voteStatus} />
        </LeftPanel>
        <Content>
          <NextLink href={postPath} passHref>
            <Title>{post.title}</Title>
          </NextLink>
          <Snippet>{post.textSnippet}</Snippet>
          <Info>
            <div className="info__left">
              <div className="info__vote">
                <VoteIcon
                  id={post.id}
                  voteStatus={post.voteStatus}
                  styles={css`
                    margin: 0;
                  `}
                />
                <VoteCounts>{post.voteCounts}</VoteCounts>
                <VoteIcon
                  variant="down"
                  id={post.id}
                  voteStatus={post.voteStatus}
                  styles={css`
                    margin: 0;
                  `}
                />
              </div>
              <Creator>
                <span>by</span> {post.creator.username}
              </Creator>
            </div>
            <div className="info__right">
              <Comment>댓글 {post.comments.length}개</Comment>
              <CreatedTime>
                <span className="desktop">{getLocalDate(post.createdAt)}</span>
                <span className="mobile">
                  {getLocalDate(post.createdAt, 'dot')}
                </span>
              </CreatedTime>
            </div>
          </Info>
        </Content>
      </Container>
    </>
  );
}
