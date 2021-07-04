import React from 'react';
import ReactLoading from 'react-loading';
import Layout from '../components/Layout';
import Post from '../components/PostThumbnail';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

function Home() {
  const { data: postsData, loading: loadingPosts } = usePostsQuery();

  return (
    <Layout variant="colored">
      <>
        {loadingPosts && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <ReactLoading type="bubbles" width="1.5em" height="1.5em" color="var(--body-text-color)" />
          </div>
        )}
        {!loadingPosts && postsData?.posts.map((post) => <Post key={post.id} post={post} />)}
      </>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Home);
