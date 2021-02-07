import { withUrqlClient } from 'next-urql';
import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/PostThumbnail';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home = () => {
  const [{ data: postsData, fetching: fetchingPosts }] = usePostsQuery({
    variables: { variant: 'all' },
  });

  return (
    <Layout variant="colored">
      {!fetchingPosts &&
        postsData?.posts.map((post) => <Post key={post.id} post={post} />)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
