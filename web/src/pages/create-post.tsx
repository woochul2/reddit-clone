import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Textarea from '../components/TextArea';
import { HOME } from '../constants';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';
import { Form } from '../page-styles/create-post';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost = () => {
  const isLoggedIn = useIsLoggedIn();
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <Layout>
      <>
        {isLoggedIn && (
          <Formik
            initialValues={{ title: '', text: '' }}
            onSubmit={async (values) => {
              const { error } = await createPost({ input: values });
              if (!error) {
                router.push(HOME);
              }
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Input
                  variant="default"
                  type="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  label="제목"
                />
                <Textarea
                  name="text"
                  rows={10}
                  value={values.text}
                  onChange={handleChange}
                  placeholder="내용"
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
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
