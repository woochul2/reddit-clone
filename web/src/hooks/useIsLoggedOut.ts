import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HOME } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedOut() {
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (!fetchingCurrentUser && currentUser) {
        await router.push(HOME);
      }
    })();
  }, [currentUserData]);

  const isLoggedOut = !fetchingCurrentUser && !currentUser;

  return isLoggedOut;
}
