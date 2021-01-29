import { Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import AuthForm from '../components/AuthForm';
import { HOME } from '../constants';
import { useRegisterMutation } from '../generated/graphql';
import { useIsLoggedOut } from '../hooks/useIsLoggedOut';
import { Container } from '../page-styles/register';
import { AuthFormikProps } from '../types';
import { createUrqlClient } from '../utils/createUrqlClient';
import { errorsToMap } from '../utils/errorsToMap';

const Register = () => {
  const isLoggedOut = useIsLoggedOut();
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <>
      {isLoggedOut && (
        <Container>
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ input: values });
              if (response.data?.register.errors) {
                setErrors(errorsToMap(response.data.register.errors));
                return;
              }
              if (response.data?.register.user) {
                router.push(HOME);
              }
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
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
