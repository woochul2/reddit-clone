import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import { HOME } from '../constants';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { PostFormikProps } from '../types';

export default function CreatePost() {
  const isLoggedIn = useIsLoggedIn();
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <Layout variant="colored">
      {isLoggedIn && (
        <Formik
          initialValues={{ title: '', text: '' }}
          onSubmit={async (values) => {
            const { errors } = await createPost({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: 'posts' });
              },
            });
            if (errors) {
              console.error(errors);
              return;
            }
            await router.push(HOME);
          }}
        >
          {(formik) => <PostForm formik={formik as PostFormikProps} title="글 작성" />}
        </Formik>
      )}
    </Layout>
  );
}
