import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { POST_DETAIL } from '../../constants';
import { Post, User } from '../../generated/graphql';
import { getLocalDate } from '../../utils/getLocalDate';
import { isSameDate } from '../../utils/isSameDate';
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
  const [year, month, day, hour, minute] = getLocalDate(post.createdAt);
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
            <Creator>
              <span>by</span> {post.creator.username}
            </Creator>
            <Comment>댓글 0개</Comment>
            <CreatedTime>
              {year}년 {month}월 {day}일
              {isSameDate(post.createdAt) && (
                <>
                  {' '}
                  {hour}:{minute}
                </>
              )}
            </CreatedTime>
          </Info>
        </Content>
      </Container>
    </>
  );
}
