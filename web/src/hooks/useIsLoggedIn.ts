import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HOME } from '../constants';
import { useCurrentUserQuery } from '../generated/graphql';

export function useIsLoggedIn() {
  const [
    { data: currentUserData, fetching: fetchingCurrentUser },
  ] = useCurrentUserQuery();
  const currentUser = currentUserData?.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!fetchingCurrentUser && !currentUser) {
      router.push(HOME);
    }
  }, [currentUserData]);

  return { currentUser, fetchingCurrentUser };
}
