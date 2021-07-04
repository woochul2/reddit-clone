import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PAGES } from '../constants';
import { useCurrentUserQuery, usePostQuery } from '../generated/graphql';

export function useIsCreator(id: string): boolean {
  const [isCreator, setIsCreator] = useState(false);
  const { data: postData, loading: loadingPost } = usePostQuery({ variables: { id: parseInt(id) } });
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (loadingPost || loadingCurrentUser) return;

      if (currentUserData?.currentUser?.id == postData?.post?.creatorId) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
        await router.push(PAGES.HOME);
      }
    })();
  }, [postData, currentUserData]);

  return isCreator;
}
