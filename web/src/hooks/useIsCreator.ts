import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HOME } from '../constants';
import { useCurrentUserQuery, usePostQuery } from '../generated/graphql';

export function useIsCreator(id: string): boolean {
  const [{ data: postData, fetching: fetchingPost }] = usePostQuery({
    variables: { id: parseInt(id) },
  });
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!fetchingPost && !fetchingCurrentUser) {
        if (
          currentUser?.id !== postData?.post?.creatorId ||
          !currentUser ||
          !postData?.post
        ) {
          await router.push(HOME);
        }
      }
    })();
  }, [postData, currentUserData]);

  const isCreator =
    !fetchingPost &&
    !fetchingCurrentUser &&
    currentUser?.id === postData?.post?.creatorId;

  return isCreator;
}
