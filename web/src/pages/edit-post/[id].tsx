import { Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import PostForm from '../../components/PostForm';
import { POST_DETAIL } from '../../constants';
import { usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { useIsCreator } from '../../hooks/useIsCreator';
import { PostFormikProps } from '../../types';
import withApollo from '../../utils/withApollo';

const EditPost: NextPage<{ id: string }> = ({ id }) => {
  const isCreator = useIsCreator(id);
  const router = useRouter();
  const [updatePost] = useUpdatePostMutation();
  const { data: postData, loading: loadingPost } = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const post = postData?.post;

  return (
    <Layout variant="colored">
      {isCreator && !loadingPost && post && (
        <Formik
          initialValues={{ title: post.title, text: post.text }}
          onSubmit={async (values) => {
            const { errors } = await updatePost({
              variables: { id: parseInt(id), input: values },
              update: (cache) => {
                cache.evict({ fieldName: 'posts' });
              },
            });
            if (errors) {
              console.error(errors);
              return;
            }
            await router.push(`${POST_DETAIL}/${id}`);
          }}
        >
          {(formik) => (
            <PostForm formik={formik as PostFormikProps} title="글 수정" />
          )}
        </Formik>
      )}
    </Layout>
  );
};

EditPost.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withApollo({ ssr: false })(EditPost as any);
