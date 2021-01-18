import React from 'react';
import { Container } from '../pages-styles/register';
import { useLoginMutation } from '../generated/graphql';
import { convertErrorsToMap } from '../utils/convertErrorsToMap';
import { useRouter } from 'next/router';
import { HOME } from '../constants/paths';
import { Formik } from 'formik';
import Form from '../components/Form';

export default function Register() {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(convertErrorsToMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push(HOME);
          }
        }}
      >
        {(formik) => (
          <Form formik={formik} title="로그인" buttonLabel="로그인" />
        )}
      </Formik>
    </Container>
  );
}
