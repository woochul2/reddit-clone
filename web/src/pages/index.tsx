import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useCurrentUserQuery, usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';

const Home = () => {
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery({
    variables: { variant: 'all' },
  });
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();

  return (
    <Layout variant="colored">
      {!fetchingPosts &&
        !fetchingCurrentUser &&
        !isServer() &&
        postsData &&
        postsData.posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUserData?.currentUser}
          />
        ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
