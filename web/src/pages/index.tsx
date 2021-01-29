import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { Post, PostSnippet, PostTitle } from '../page-styles/index';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery();
  return (
    <Layout>
      <>
        {!fetchingPosts &&
          postsData &&
          postsData.posts.map((post) => (
            <Post key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostSnippet>{post.textSnippet}</PostSnippet>
            </Post>
          ))}
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
