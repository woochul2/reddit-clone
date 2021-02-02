import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Textarea from '../components/TextArea';
import { HOME } from '../constants';
import { useCreatePostMutation, usePostsQuery } from '../generated/graphql';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { Form, inputStyles, Title } from '../page-styles/create-post';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost = () => {
  const isLoggedIn = useIsLoggedIn();
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  const [] = usePostsQuery();

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
            router.push(HOME);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Title>글 작성</Title>
              <Input
                variant="default"
                type="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                label="제목"
                styles={inputStyles}
                autoComplete="off"
              />
              <Textarea
                name="text"
                rows={10}
                value={values.text}
                onChange={handleChange}
                placeholder="내용"
                styles={inputStyles}
              />
              <Button
                type="submit"
                disabled={values.title === '' || values.text === ''}
              >
                제출
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
