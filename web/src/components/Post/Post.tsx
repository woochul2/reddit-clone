import { useRouter } from 'next/router';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { LOGIN } from '../../constants';
import {
  Post as PostGraphql,
  User,
  useVoteMutation,
} from '../../generated/graphql';
import ArrowUpFilled from '../../icons/ArrowUpFilled';
import ArrowUpOutlined from '../../icons/ArrowUpOutlined';
import {
  Comment,
  Container,
  Content,
  CreatedTime,
  Creator,
  Icon,
  Info,
  LeftPanel,
  Snippet,
  Title,
  VoteCounts,
} from './post';

const cutZero = (str: string) => {
  if (str[0] === '0') {
    return str[1];
  } else {
    return str;
  }
};

const getMonth = (month: string) => {
  if (month === 'Jan') {
    return 1;
  } else if (month === 'Feb') {
    return 2;
  } else if (month === 'Mar') {
    return 3;
  } else if (month === 'Apr') {
    return 4;
  } else if (month === 'May') {
    return 5;
  } else if (month === 'Jun') {
    return 6;
  } else if (month === 'Jul') {
    return 7;
  } else if (month === 'Aug') {
    return 8;
  } else if (month === 'Sep') {
    return 9;
  } else if (month === 'Oct') {
    return 10;
  } else if (month === 'Nov') {
    return 11;
  } else if (month === 'Dec') {
    return 12;
  }

  return month;
};

const getLocalDate = (date: number) => {
  const localDate = new Date(date).toString();
  const [, month, day, year, time] = localDate.split(' ');
  const [hour, minute] = time.split(':');

  return [year, getMonth(month), cutZero(day), hour, minute];
};

const isSameDate = (date: number) => {
  const localDate = new Date(date).toString();
  const now = new Date().toString();
  return now.slice(0, 15) === localDate.slice(0, 15);
};

interface Props {
  post: PostGraphql;
  currentUser?: User | null;
  styles?: FlattenSimpleInterpolation;
}

export default function Post({ post, currentUser, styles }: Props) {
  const postCreatedAtNum = parseInt(post.createdAt);
  const [year, month, day, hour, minute] = getLocalDate(postCreatedAtNum);
  const [, vote] = useVoteMutation();
  const router = useRouter();

  const handleVote = async (value: number) => {
    if (!currentUser) {
      router.push(LOGIN);
      return;
    }
    await vote({ postId: post.id, value });
  };

  return (
    <Container styles={styles}>
      <LeftPanel>
        <Icon onClick={() => handleVote(1)} hasClicked={post.voteStatus === 1}>
          <ArrowUpOutlined className="original" />
          <ArrowUpFilled className="hovered" />
        </Icon>
        <VoteCounts voteStatus={post.voteStatus}>{post.voteCounts}</VoteCounts>
        <Icon
          className="flip"
          onClick={() => handleVote(-1)}
          hasClicked={post.voteStatus === -1}
        >
          <ArrowUpOutlined className="original" />
          <ArrowUpFilled className="hovered" />
        </Icon>
      </LeftPanel>
      <Content>
        <Title>{post.title}</Title>
        <Snippet>{post.textSnippet}</Snippet>
        <Info>
          <Creator>
            <span>by</span> {post.creator.username}
          </Creator>
          <Comment>댓글 0개</Comment>
          <CreatedTime>
            {year}년 {month}월 {day}일
            {isSameDate(postCreatedAtNum) && (
              <>
                {' '}
                {hour}:{minute}
              </>
            )}
          </CreatedTime>
        </Info>
      </Content>
    </Container>
  );
}
