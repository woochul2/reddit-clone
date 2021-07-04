import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import PostForm from '../../components/PostForm';
import { PAGES } from '../../constants';
import { usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { useIsCreator } from '../../hooks/useIsCreator';
import { PostFormikProps } from '../../types';
import withApollo from '../../utils/withApollo';

function EditPost() {
  const router = useRouter();
  const id = router.query.id as string;
  const isCreator = useIsCreator(id);
  const [updatePost] = useUpdatePostMutation();
  const { data: postData } = usePostQuery({ variables: { id: parseInt(id) } });
  const post = postData?.post;

  return (
    <Layout variant="colored" title={`글 수정${post ? `: ${post.title}` : ''}`}>
      {isCreator && post && (
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
            await router.push(`${PAGES.POST_DETAIL}/${id}`);
          }}
        >
          {(formik) => <PostForm formik={formik as PostFormikProps} title="글 수정" />}
        </Formik>
      )}
    </Layout>
  );
}

export default withApollo()(EditPost);
