import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import { HOME } from '../constants';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { PostFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost = () => {
  const isLoggedIn = useIsLoggedIn();
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <Layout variant="colored">
      {isLoggedIn && (
        <Formik
          initialValues={{ title: '', text: '' }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (error) {
              console.error(error);
              return;
            }
            await router.push(HOME);
          }}
        >
          {(formik) => (
            <PostForm formik={formik as PostFormikProps} title="글 작성" />
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
