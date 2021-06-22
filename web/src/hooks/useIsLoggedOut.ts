import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PAGES } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedOut() {
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!loadingCurrentUser && currentUser) {
        await router.push(PAGES.HOME);
      }
    })();
  }, [currentUserData]);

  const isLoggedOut = !loadingCurrentUser && !currentUser;

  return isLoggedOut;
}
