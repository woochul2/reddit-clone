import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PAGES } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedIn(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: currentUserData, loading: loadingCurrentUser } = useCurrentUserQuery();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (loadingCurrentUser) return;

      if (!currentUserData?.currentUser) {
        setIsLoggedIn(false);
        await router.push(PAGES.HOME);
      } else {
        setIsLoggedIn(true);
      }
    })();
  }, [currentUserData]);

  return isLoggedIn;
}
