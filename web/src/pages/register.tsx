import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { HOME } from '../constants';
import { CurrentUserDocument, CurrentUserQuery, useRegisterMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { AuthFormikProps } from '../types';
import { errorsToMap } from '../utils/errorsToMap';

export default function Register() {
  const isLoggedOut = useIsLoggedOut();
  const [register] = useRegisterMutation();
  const router = useRouter();

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
                localStorage.setItem('auth-token', response.data.register.token);
              }
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
