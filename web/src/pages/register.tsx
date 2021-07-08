import { useApolloClient } from '@apollo/client';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { COOKIE_NAMES, PAGES } from '../constants';
import { useRegisterMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { AuthFormikProps } from '../types';
import { changeErrorsToMap } from '../utils/changeErrorsToMap';
import { setCookie } from '../utils/setCookie';
import withApollo from '../utils/withApollo';

function Register() {
  const isLoggedOut = useIsLoggedOut();
  const [register] = useRegisterMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  return (
    <Layout searchBox="off" title="reddit clone 회원가입">
      {isLoggedOut && (
        <div>
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ variables: { input: values } });
              const errors = response.data?.register.errors;
              if (errors) {
                const errorMap = changeErrorsToMap(errors);
                setErrors(errorMap);
                return;
              }

              const token = response.data?.register.token;
              if (token) {
                setCookie(COOKIE_NAMES.AUTH_TOKEN, token);
              }
              await apolloClient.resetStore();
              await router.push(PAGES.HOME);
            }}
          >
            {(formik) => <AuthForm formik={formik as AuthFormikProps} title="회원가입" buttonLabel="가입" />}
          </Formik>
        </div>
      )}
    </Layout>
  );
}

export default withApollo()(Register);
