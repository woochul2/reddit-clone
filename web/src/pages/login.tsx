import { useApolloClient } from '@apollo/client';
import { Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { COOKIE_NAMES, PAGES } from '../constants';
import { useLoginMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import * as Styled from '../page-styles/login';
import { AuthFormikProps } from '../types';
import { changeErrorsToMap } from '../utils/changeErrorsToMap';
import { setCookie } from '../utils/setCookie';
import withApollo from '../utils/withApollo';

function Login() {
  const isLoggedOut = useIsLoggedOut();
  const [login] = useLoginMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  return (
    <Layout searchBox="off" title="reddit clone 로그인">
      {isLoggedOut && (
        <div>
          <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({ variables: { input: values } });
              const errors = response.data?.login.errors;
              if (errors) {
                const errorMap = changeErrorsToMap(errors);
                setErrors(errorMap);
                return;
              }

              const token = response.data?.login.token;
              if (token) {
                setCookie(COOKIE_NAMES.AUTH_TOKEN, token);
              }
              await apolloClient.resetStore();
              await router.push(PAGES.HOME);
            }}
          >
            {(formik) => (
              <AuthForm formik={formik as AuthFormikProps} title="로그인" buttonLabel="로그인">
                <NextLink href={PAGES.FORGOT_PASSWORD} passHref>
                  <Styled.Link>비밀번호를 잊으셨습니까?</Styled.Link>
                </NextLink>
              </AuthForm>
            )}
          </Formik>
        </div>
      )}
    </Layout>
  );
}

export default withApollo()(Login);
