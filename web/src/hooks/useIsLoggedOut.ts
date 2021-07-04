import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PAGES } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedOut(): boolean {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (loadingCurrentUser) return;

      if (currentUserData?.currentUser) {
        setIsLoggedOut(false);
        await router.push(PAGES.HOME);
      } else {
        setIsLoggedOut(true);
      }
    })();
  }, [currentUserData]);

  return isLoggedOut;
}
