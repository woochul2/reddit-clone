import React from 'react';
import Layout from '../components/Layout';
import Post from '../components/PostThumbnail';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

const Home = () => {
  const { data: postsData, loading: loadingPosts } = usePostsQuery();

  return (
    <Layout variant="colored">
      {!loadingPosts &&
        postsData?.posts.map((post) => <Post key={post.id} post={post} />)}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
