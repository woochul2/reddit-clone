import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import Textarea from '../components/TextArea';
import { HOME } from '../constants';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { Form, textAreaStyles, Title } from '../page-styles/create-post';
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
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Title>글 작성</Title>
              <Textarea
                name="title"
                minRows={1}
                value={values.title}
                onChange={handleChange}
                placeholder="제목"
                styles={textAreaStyles}
              />
              <Textarea
                name="text"
                minRows={10}
                value={values.text}
                onChange={handleChange}
                placeholder="내용"
                styles={textAreaStyles}
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
