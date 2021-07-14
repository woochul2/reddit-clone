import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PostForm from '../../components/PostForm';
import { PAGES } from '../../constants';
import { useCurrentUserQuery, usePostQuery, useUpdatePostMutation } from '../../generated/graphql';
import { PostFormikProps } from '../../types';
import withApollo from '../../utils/withApollo';

function EditPost() {
  const router = useRouter();
  const id = parseInt(router.query.id as string) || -1;
  const [updatePost] = useUpdatePostMutation();
  const { data: postData, loading: loadingPost } = usePostQuery({ variables: { id } });
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const [isCreator, setIsCreator] = useState(false);
  const post = postData?.post;

  useEffect(() => {
    (async function () {
      if (id === -1) return;
      if (loadingPost || loadingCurrentUser) return;

      if (currentUserData?.currentUser?.id == postData?.post?.creatorId) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
        await router.push(PAGES.HOME);
      }
    })();
  }, [postData, currentUserData]);

  return (
    <Layout variant="colored" title={`글 수정${post ? `: ${post.title}` : ''}`}>
      {isCreator && post && (
        <Formik
          initialValues={{ title: post.title, text: post.text }}
          onSubmit={async (values) => {
            const { errors } = await updatePost({
              variables: { id, input: values },
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
