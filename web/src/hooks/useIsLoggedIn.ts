import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HOME } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedIn() {
  const {
    data: currentUserData,
    loading: loadingCurrentUser,
  } = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!loadingCurrentUser && !currentUser) {
        await router.push(HOME);
      }
    })();
  }, [currentUserData]);

  const isLoggedIn = !loadingCurrentUser && currentUser;

  return isLoggedIn;
}
