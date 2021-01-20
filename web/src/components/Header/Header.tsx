import { Container, Username, LogoutButton, Link } from './header';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '../../generated/graphql';
import NextLink from 'next/link';
import { LOGIN, REGISTER } from '../../constants/paths';

interface Props {
  styles?: string;
}

const isServer = () => typeof window === 'undefined';

export default function Header({ styles }: Props) {
  const [{ data, fetching }] = useCurrentUserQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container styles={styles}>
      {!fetching && data?.currentUser && (
        <>
          <Username>{data.currentUser.username}</Username>
          <LogoutButton onClick={handleLogout} disabled={logoutFetching}>
            로그아웃
          </LogoutButton>
        </>
      )}
      {!fetching && !data?.currentUser && (
        <>
          <NextLink href={LOGIN}>
            <Link>로그인</Link>
          </NextLink>
          <NextLink href={REGISTER}>
            <Link>회원가입</Link>
          </NextLink>
        </>
      )}
    </Container>
  );
}
