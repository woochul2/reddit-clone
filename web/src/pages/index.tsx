import { withUrqlClient } from 'next-urql';
import React from 'react';
import Header from '../components/Header';
import { usePostsQuery } from '../generated/graphql';
import { Container } from '../page-styles/index';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery();
  return (
    <Container>
      <Header />
      {!fetchingPosts &&
        postsData &&
        postsData.posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <div>{post.text}</div>
          </div>
        ))}
    </Container>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
