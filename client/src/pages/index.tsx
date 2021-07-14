import React from 'react';
import ReactLoading from 'react-loading';
import Layout from '../components/Layout';
import PostThumbnail from '../components/PostThumbnail';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

function Home() {
  const { data: postsData, loading: loadingPosts } = usePostsQuery();

  return (
    <Layout variant="colored">
      {loadingPosts ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <ReactLoading type="bubbles" width="1.5em" height="1.5em" color="var(--body-text-color)" />
        </div>
      ) : (
        postsData?.posts.map((post) => <PostThumbnail key={post.id} post={post} />)
      )}
    </Layout>
  );
}

export default withApollo({ ssr: true })(Home);
