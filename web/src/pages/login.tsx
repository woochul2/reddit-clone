import { Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { FORGOT_PASSWORD, HOME } from '../constants';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { Container, Link } from '../page-styles/login';
import { AuthFormikProps } from '../types';
import { errorsToMap } from '../utils/errorsToMap';
import withApollo from '../utils/withApollo';

const Login = () => {
  const isLoggedOut = useIsLoggedOut();
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Layout searchBox="off">
      {isLoggedOut && (
        <Container>
          <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: { input: values },
                update: (cache, { data }) => {
                  cache.writeQuery<CurrentUserQuery>({
                    query: CurrentUserDocument,
                    data: {
                      __typename: 'Query',
                      currentUser: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: 'posts' });
                },
              });

              if (response.data?.login.errors) {
                setErrors(errorsToMap(response.data.login.errors));
                return;
              }

              if (response.data?.login.token) {
                localStorage.setItem('auth-token', response.data.login.token);
              }
              await router.push(HOME);
            }}
          >
            {(formik) => (
              <AuthForm
                formik={formik as AuthFormikProps}
                title="로그인"
                buttonLabel="로그인"
              >
                <NextLink href={FORGOT_PASSWORD} passHref>
                  <Link>비밀번호를 잊으셨습니까?</Link>
                </NextLink>
              </AuthForm>
            )}
          </Formik>
        </Container>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
