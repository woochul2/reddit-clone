import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PAGES } from '../constants';
import { useCurrentUserQuery, usePostQuery } from '../generated/graphql';

export function useIsCreator(id: string): boolean {
  const { data: postData, loading: loadingPost } = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!loadingPost && !loadingCurrentUser) {
        if (currentUser?.id !== postData?.post?.creatorId || !currentUser || !postData?.post) {
          await router.push(PAGES.HOME);
        }
      }
    })();
  }, [postData, currentUserData]);

  const isCreator = !loadingPost && !loadingCurrentUser && currentUser?.id === postData?.post?.creatorId;

  return isCreator;
}
