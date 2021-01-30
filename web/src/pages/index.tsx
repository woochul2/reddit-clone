import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import {
  Post,
  PostCreatedTime,
  PostCreator,
  PostInfo,
  PostSnippet,
  PostTitle,
} from '../page-styles/index';
import { createUrqlClient } from '../utils/createUrqlClient';

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

const getLocalDate = (date: string) => {
  const localDate = new Date(date).toString();
  const [_dayOfWeek, month, day, year, time] = localDate.split(' ');
  const [hour, minute, _second] = time.split(':');

  return [year, getMonth(month), cutZero(day), hour, minute];
};

const Home = () => {
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery();

  return (
    <Layout>
      <>
        {!fetchingPosts &&
          postsData &&
          postsData.posts.map((post) => {
            const [year, month, day, hour, minute] = getLocalDate(
              post.createdAt
            );
            return (
              <Post key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <PostSnippet>{post.textSnippet}</PostSnippet>
                <PostInfo>
                  <PostCreator>by {post.creator.username}</PostCreator>
                  <PostCreatedTime>
                    {year}년 {month}월 {day}일 {hour}시 {minute}분
                  </PostCreatedTime>
                </PostInfo>
              </Post>
            );
          })}
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
