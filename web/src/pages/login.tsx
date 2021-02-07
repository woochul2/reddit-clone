import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { FORGOT_PASSWORD, HOME } from '../constants';
import { useLoginMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { Container, Link } from '../page-styles/login';
import { AuthFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { errorsToMap } from '../utils/errorsToMap';

const Login = () => {
  const isLoggedOut = useIsLoggedOut();
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Layout searchBox="off">
      {isLoggedOut && (
        <Container>
          <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({ input: values });
              if (response.data?.login.errors) {
                setErrors(errorsToMap(response.data.login.errors));
                return;
              }
              if (response.data?.login.user) {
                await router.push(HOME);
              }
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

export default withUrqlClient(createUrqlClient)(Login);
