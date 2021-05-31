import React from 'react';
import ReactLoading from 'react-loading';
import Layout from '../components/Layout';
import Post from '../components/PostThumbnail';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

export default function Home() {
  const { data: postsData, loading: loadingPosts } = usePostsQuery();

  return (
    <Layout variant="colored">
      <>
        {loadingPosts && (
          <ReactLoading
            className="layout__loading-icon"
            type="bubbles"
            width="1.5em"
            height="1.5em"
            color="var(--body-text-color)"
          />
        )}
        {!loadingPosts && postsData?.posts.map((post) => <Post key={post.id} post={post} />)}
      </>
    </Layout>
  );
}

export async function getServerSideProps(ctx: any) {
  const token = ctx.req.cookies['auth-token'];

  const apolloClient = initializeApollo(null, token);

  await apolloClient.query({
    query: PostsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
