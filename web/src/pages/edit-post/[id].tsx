import { Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import PostForm from '../../components/PostForm';
import { HOME } from '../../constants';
import { usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { useIsCreator } from '../../hooks/useIsCreator';
import { PostFormikProps } from '../../types';
import { createUrqlClient } from '../../utils/createUrqlClient';

const EditPost: NextPage<{ id: string }> = ({ id }) => {
  const isCreator = useIsCreator(id);
  const router = useRouter();
  const [, updatePost] = useUpdatePostMutation();
  const [{ data: postData, fetching: fetchingPost }] = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const post = postData?.post;

  return (
    <Layout variant="colored">
      {isCreator && !fetchingPost && post && (
        <Formik
          initialValues={{ title: post.title, text: post.text }}
          onSubmit={async (values) => {
            const { error } = await updatePost({
              id: parseInt(id),
              input: values,
            });
            if (error) {
              console.error(error);
              return;
            }
            await router.push(HOME);
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

export default withUrqlClient(createUrqlClient)(EditPost as any);
