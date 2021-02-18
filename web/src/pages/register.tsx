import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { HOME } from '../constants';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useRegisterMutation,
} from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { Container } from '../page-styles/register';
import { AuthFormikProps } from '../types';
import { errorsToMap } from '../utils/errorsToMap';
import withApollo from '../utils/withApollo';

const Register = () => {
  const isLoggedOut = useIsLoggedOut();
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Layout searchBox="off">
      {isLoggedOut && (
        <Container>
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

              if (!response.data?.register) {
                return;
              }

              if (response.data?.register.errors) {
                setErrors(errorsToMap(response.data.register.errors));
                return;
              }

              localStorage.setItem('auth-token', response.data?.register.token);
              await router.push(HOME);
            }}
          >
            {(formik) => (
              <AuthForm
                formik={formik as AuthFormikProps}
                title="회원가입"
                buttonLabel="가입"
              />
            )}
          </Formik>
        </Container>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
