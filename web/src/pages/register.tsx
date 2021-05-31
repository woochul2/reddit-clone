import { useApolloClient } from '@apollo/client';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { AUTH_TOKEN, HOME } from '../constants';
import { CurrentUserDocument, CurrentUserQuery, useRegisterMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { AuthFormikProps } from '../types';
import { errorsToMap } from '../utils/errorsToMap';

export default function Register() {
  const isLoggedOut = useIsLoggedOut();
  const [register] = useRegisterMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  return (
    <Layout searchBox="off">
      {isLoggedOut && (
        <div>
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { input: values },
                update: (cache, { data }) => {
                  cache.writeQuery<CurrentUserQuery>({
                    query: CurrentUserDocument,
                    data: {
                      __typename: 'Query',
                      currentUser: data?.register.user,
                    },
                  });
                  cache.evict({ fieldName: 'posts' });
                },
              });

              if (response.data?.register.errors) {
                setErrors(errorsToMap(response.data.register.errors));
                return;
              }

              if (response.data?.register.token) {
                document.cookie = `${AUTH_TOKEN}=${response.data.register.token}`;
              }
              await apolloClient.resetStore();
              await router.push(HOME);
            }}
          >
            {(formik) => <AuthForm formik={formik as AuthFormikProps} title="회원가입" buttonLabel="가입" />}
          </Formik>
        </div>
      )}
    </Layout>
  );
}
